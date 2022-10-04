import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomainTasks, GetTasksResponse, Task, UpdateTaskModel} from "../models/tasks.models";
import {BehaviorSubject, catchError, EMPTY, map} from "rxjs";
import {BaseResponse} from "../../../core/models/core.models";
import {NotificationService} from "../../../core/services/notification.service";
import {ResultCode} from "../../../core/enum/resultCode.enum";

@Injectable()
export class TasksService {
  private tasks$ = new BehaviorSubject<DomainTasks>({});
  tasks = this.tasks$.asObservable();

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  };

  getTasks(todoId: string) {
    this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): DomainTasks => {
          if (!response.error) {
            const tasks = this.tasks$.getValue();
            tasks[todoId] = response.items;
            return tasks;
          } else {
            this.notificationService.handleError(response.error);
            return this.tasks$.getValue();
          }
        }),
      )
      .subscribe((tasks: DomainTasks) => this.tasks$.next(tasks));
  };

  addTask(todoId: string, taskTitle: string) {
    this.http
      .post<BaseResponse<{ item: Task }>>(`${environment.baseURL}/todo-lists/${todoId}/tasks`, {title: taskTitle})
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): DomainTasks => {
          if (response.resultCode === ResultCode.success) {
            const tasks = this.tasks$.getValue();
            const newTask = response.data.item;
            tasks[todoId] = [newTask, ...tasks[todoId]];
            return tasks;
          } else {
            this.notificationService.handleError(response.messages[0]);
            return this.tasks$.getValue();
          }
        }),
      )
      .subscribe((tasks: DomainTasks) => this.tasks$.next(tasks));
  };

  deleteTask(todoId: string, taskId: string) {
    this.http
      .delete<BaseResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks/${taskId}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): DomainTasks => {
          if (response.resultCode === ResultCode.success) {
            const tasks = this.tasks$.getValue();
            tasks[todoId] = tasks[todoId].filter(t => t.id !== taskId);
            return tasks;
          } else {
            this.notificationService.handleError(response.messages[0]);
            return this.tasks$.getValue();
          }
        }),
      )
      .subscribe((tasks: DomainTasks) => this.tasks$.next(tasks));
  };

  updateTask(todoId: string, taskId: string, model: UpdateTaskModel) {
    this.http
      .put<BaseResponse<{ item: Task }>>(`${environment.baseURL}/todo-lists/${todoId}/tasks/${taskId}`, model)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): DomainTasks => {
          if (response.resultCode === ResultCode.success) {
            const tasks = this.tasks$.getValue();
            const updatedTask = response.data.item;
            tasks[todoId] = tasks[todoId].map(t => t.id === taskId ? updatedTask : t);
            return tasks;
          } else {
            this.notificationService.handleError(response.messages[0]);
            return this.tasks$.getValue();
          }
        }),
      )
      .subscribe((tasks: DomainTasks) => this.tasks$.next(tasks));
  };

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message);
    return EMPTY;
  };
}

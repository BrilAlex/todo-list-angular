import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomainTasks, GetTasksResponse, Task, UpdateTaskModel} from "../models/tasks.models";
import {BehaviorSubject, map, Observable} from "rxjs";
import {BaseResponse} from "../../../core/models/core.models";

@Injectable()
export class TasksService {
  private tasks$ = new BehaviorSubject<DomainTasks>({});
  tasks = this.tasks$.asObservable();

  constructor(private http: HttpClient) {
  };

  getTasks(todoId: string) {
    this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(map(response => response.items))
      .subscribe((items: Task[]) => {
        const tasks = this.tasks$.getValue();
        tasks[todoId] = items;
        this.tasks$.next(tasks);
      });
  };

  addTask(todoId: string, taskTitle: string) {
    this.http
      .post<BaseResponse<{ item: Task }>>(`${environment.baseURL}/todo-lists/${todoId}/tasks`, {title: taskTitle})
      .pipe(map(response => response.data.item))
      .subscribe(newTask => {
        const tasks = this.tasks$.getValue();
        tasks[todoId] = [newTask, ...tasks[todoId]];
        this.tasks$.next(tasks);
      });
  };

  deleteTask(todoId: string, taskId: string) {
    this.http
      .delete<BaseResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks/${taskId}`)
      .pipe(
        map(() => {
          const tasks = this.tasks$.getValue();
          tasks[todoId] = tasks[todoId].filter(t => t.id !== taskId);
          return tasks;
        })
      )
      .subscribe((tasks) => this.tasks$.next(tasks));
  };

  updateTask(todoId: string, taskId: string, model: UpdateTaskModel) {
    this.http
      .put<BaseResponse<{ item: Task }>>(`${environment.baseURL}/todo-lists/${todoId}/tasks/${taskId}`, model)
      .pipe(
        map(response => {
          const tasks = this.tasks$.getValue();
          const updatedTask = response.data.item;
          tasks[todoId] = tasks[todoId].map(t => t.id === taskId ? updatedTask : t);
          return tasks;
        })
      )
      .subscribe((tasks) => this.tasks$.next(tasks));
  };
}

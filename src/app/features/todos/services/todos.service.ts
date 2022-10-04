import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomainTodo, FilterValue, Todo} from "../models/todos.models";
import {BehaviorSubject, catchError, EMPTY, map} from "rxjs";
import {BaseResponse} from "../../../core/models/core.models";
import {NotificationService} from "../../../core/services/notification.service";
import {ResultCode} from "../../../core/enum/resultCode.enum";

@Injectable()
export class TodosService {
  private todos$ = new BehaviorSubject<DomainTodo[]>([]);
  todos = this.todos$.asObservable();

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  };

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseURL}/todo-lists`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): DomainTodo[] => {
          return response.map(tdl => ({...tdl, filter: "all"}));
        }),
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  addTodo(title: string) {
    this.http
      .post<BaseResponse<{ item: Todo }>>(`${environment.baseURL}/todo-lists`, {title})
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response) => {
          if (response.resultCode === ResultCode.success) {
            const newTodo: DomainTodo = {...response.data.item, filter: "all"};
            return [newTodo, ...this.todos$.getValue()];
          } else {
            this.notificationService.handleError(response.messages[0]);
            return this.todos$.getValue();
          }
        }),
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  deleteTodo(id: string) {
    this.http
      .delete<BaseResponse>(`${environment.baseURL}/todo-lists/${id}`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): DomainTodo[] => {
          if (response.resultCode === ResultCode.success) {
            return this.todos$.getValue().filter(tdl => tdl.id !== id);
          } else {
            this.notificationService.handleError(response.messages[0]);
            return this.todos$.getValue();
          }
        }),
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  changeTodoTitle(id: string, title: string) {
    this.http
      .put<BaseResponse>(`${environment.baseURL}/todo-lists/${id}`, {title})
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): DomainTodo[] => {
          if (response.resultCode === ResultCode.success) {
            return this.todos$.getValue().map(tdl => tdl.id === id ? {...tdl, title} : tdl);
          } else {
            this.notificationService.handleError(response.messages[0]);
            return this.todos$.getValue();
          }
        }),
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  changeTodoFilter(id: string, filter: FilterValue) {
    this.todos$.next(this.todos$.getValue().map(tdl => tdl.id === id ? {...tdl, filter} : tdl));
  };

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message);
    return EMPTY;
  };
}

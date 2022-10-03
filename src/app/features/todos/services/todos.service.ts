import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomainTodo, FilterValue, Todo} from "../models/todos.models";
import {BehaviorSubject, map} from "rxjs";
import {BaseResponse} from "../../../core/models/core.models";

@Injectable()
export class TodosService {
  private todos$ = new BehaviorSubject<DomainTodo[]>([]);
  todos = this.todos$.asObservable();

  constructor(private http: HttpClient) {
  };

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseURL}/todo-lists`)
      .pipe(
        map((response): DomainTodo[] => {
          return response.map(tdl => ({...tdl, filter: "all"}));
        })
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  addTodo(title: string) {
    this.http
      .post<BaseResponse<{ item: Todo }>>(`${environment.baseURL}/todo-lists`, {title})
      .pipe(
        map((response): DomainTodo[] => {
          const newTodo: DomainTodo = {...response.data.item, filter: "all"};
          return [newTodo, ...this.todos$.getValue()];
        })
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  deleteTodo(id: string) {
    this.http
      .delete<BaseResponse>(`${environment.baseURL}/todo-lists/${id}`)
      .pipe(
        map((): DomainTodo[] => this.todos$.getValue().filter(tdl => tdl.id !== id))
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  changeTodoTitle(id: string, title: string) {
    this.http
      .put<BaseResponse>(`${environment.baseURL}/todo-lists/${id}`, {title})
      .pipe(
        map((): DomainTodo[] => this.todos$.getValue().map((tdl => tdl.id === id ? {...tdl, title} : tdl)))
      )
      .subscribe((todos: DomainTodo[]) => this.todos$.next(todos));
  };

  changeTodoFilter(id: string, filter: FilterValue) {
    this.todos$.next(this.todos$.getValue().map(tdl => tdl.id === id ? {...tdl, filter} : tdl));
  }
}

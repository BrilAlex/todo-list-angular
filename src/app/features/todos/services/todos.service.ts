import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomainTodo, Todo} from "../models/todos.models";
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
        map(response => {
          return response.map(tdl => ({...tdl, filter: ("all" as const)}));
        })
      )
      .subscribe(todos => this.todos$.next(todos));
  };

  addTodo(title: string) {
    this.http
      .post<BaseResponse<{ item: Todo }>>(`${environment.baseURL}/todo-lists`, {title})
      .pipe(
        map(response => {
          const newTodo: DomainTodo = {...response.data.item, filter: "all"};
          return [newTodo, ...this.todos$.getValue()];
        })
      )
      .subscribe(todos => this.todos$.next(todos));
  }
}

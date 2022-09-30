import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DomainTodo, Todo} from "../models/todos.models";
import {BehaviorSubject, map} from "rxjs";

@Injectable()
export class TodosService {
  private todos = new BehaviorSubject<DomainTodo[]>([]);
  todos$ = this.todos.asObservable();

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
      .subscribe(todos => this.todos.next(todos));
  };
}

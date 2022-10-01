import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {GetTasksResponse, Task} from "../models/tasks.models";
import {map, Observable} from "rxjs";

@Injectable()
export class TasksService {

  constructor(private http: HttpClient) {
  };

  getTasks(todoId: string): Observable<Task[]> {
    return this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(map(response => response.items));
  };
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TodosComponent } from './components/todos/todos.component';
import {TodosRoutingModule} from "./todos-routing.module";
import {TodosService} from "./services/todos.service";
import { TodoComponent } from './components/todos/todo/todo.component';
import {FormsModule} from "@angular/forms";
import {TasksComponent} from "./components/todos/todo/tasks/tasks.component";
import {TasksService} from "./services/tasks.service";
import {TaskComponent} from "./components/todos/todo/tasks/task/task.component";

@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
    TasksComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    FormsModule,
  ],
  providers: [
    TodosService,
    TasksService,
  ],
})
export class TodosModule {
}

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
import {
  TodoFiltersComponent
} from "./components/todos/todo/tasks/todo-filters/todo-filters.component";
import {TodoFooterComponent} from "./components/todos/todo/tasks/todo-footer/todo-footer.component";

@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
    TasksComponent,
    TaskComponent,
    TodoFiltersComponent,
    TodoFooterComponent,
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

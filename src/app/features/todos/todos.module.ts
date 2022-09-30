import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TodosComponent } from './components/todos/todos.component';
import {TodosRoutingModule} from "./todos-routing.module";
import {TodosService} from "./services/todos.service";
import { TodoComponent } from './components/todos/todo/todo.component';

@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
  ],
  providers: [
    TodosService,
  ],
})
export class TodosModule {
}

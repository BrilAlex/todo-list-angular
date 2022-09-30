import {Component, OnInit} from '@angular/core';
import {TodosService} from "../../services/todos.service";
import {DomainTodo} from "../../models/todos.models";
import {Observable} from "rxjs";

@Component({
  selector: 'tdl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {

  todos!: Observable<DomainTodo[]>;
  newTodoTitle = "";

  constructor(private todosService: TodosService) {
  };

  ngOnInit(): void {
    this.todosService.getTodos();
    this.todos = this.todosService.todos;
  };

  addTodo() {
    this.todosService.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
  };

}

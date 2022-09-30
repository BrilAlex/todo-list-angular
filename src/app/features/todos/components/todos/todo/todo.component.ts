import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomainTodo} from "../../../models/todos.models";

@Component({
  selector: 'tdl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo;
  @Output() deleteTodoEvent = new EventEmitter<string>();

  deleteTodoHandler(id: string) {
    this.deleteTodoEvent.emit(id);
  };
}

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
  @Output() updateTodoEvent = new EventEmitter<{id: string, title: string}>();

  newTittle = "";
  editMode = false;

  enableEditMode() {
    this.newTittle = this.todo.title;
    this.editMode = true;
  };

  deleteTodoHandler(id: string) {
    this.deleteTodoEvent.emit(id);
  };

  updateTodoHandler() {
    this.updateTodoEvent.emit({id: this.todo.id, title: this.newTittle});
    this.editMode = false;
  };
}

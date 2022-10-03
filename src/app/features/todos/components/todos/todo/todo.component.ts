import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomainTodo, FilterValue} from "../../../models/todos.models";
import {TodosService} from "../../../services/todos.service";

@Component({
  selector: 'tdl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo;
  @Output() deleteTodoEvent = new EventEmitter<string>();
  @Output() changeTodoTitleEvent = new EventEmitter<{ id: string, title: string }>();
  @Output() changeTodoFilterEvent = new EventEmitter<{ id: string, filter: FilterValue }>();

  newTittle = "";
  editMode = false;

  constructor(private todosService: TodosService) {
  };

  enableEditMode() {
    this.newTittle = this.todo.title;
    this.editMode = true;
  };

  deleteTodoHandler(id: string) {
    this.deleteTodoEvent.emit(id);
  };

  changeTitleHandler() {
    this.changeTodoTitleEvent.emit({id: this.todo.id, title: this.newTittle});
    this.editMode = false;
  };

  changeFilterHandler(filter: FilterValue) {
    this.todosService.changeTodoFilter(this.todo.id, filter);
  };
}

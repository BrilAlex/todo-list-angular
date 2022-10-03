import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FilterValue} from "../../../../../models/todos.models";

@Component({
  selector: "tdl-todo-filters",
  templateUrl: "./todo-filters.component.html",
  styleUrls: ["./todo-filters.component.css"],
})
export class TodoFiltersComponent {
  @Input() selectedFilter!: FilterValue;
  @Output() changeFilterEvent = new EventEmitter<FilterValue>();

  changeFilter(value: FilterValue) {
    this.changeFilterEvent.emit(value);
  };
}

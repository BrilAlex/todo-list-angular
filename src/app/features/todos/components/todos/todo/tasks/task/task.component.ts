import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Task} from "../../../../../models/tasks.models";

@Component({
  selector: "tdl-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskEvent = new EventEmitter<string>();

  removeTask() {
    this.removeTaskEvent.emit(this.task.id);
  };
}

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Task, UpdateTaskModel} from "../../../../../models/tasks.models";
import {TaskStatus} from "../../../../../../../core/enum/taskStatus.enum";

@Component({
  selector: "tdl-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() removeTaskEvent = new EventEmitter<string>();
  @Output() updateTaskEvent = new EventEmitter<{ taskId: string, model: UpdateTaskModel }>();

  taskStatus = TaskStatus;
  newTitle = "";
  editMode = false;

  enableEditMode() {
    this.newTitle = this.task.title;
    this.editMode = true;
  }

  removeTask() {
    this.removeTaskEvent.emit(this.task.id);
  };

  updateTask(patch: Partial<UpdateTaskModel>) {
    const taskModel: UpdateTaskModel = {
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      priority: this.task.priority,
      startDate: this.task.startDate,
      deadline: this.task.deadline,
      ...patch,
    };
    this.updateTaskEvent.emit({taskId: this.task.id, model: taskModel});
  };

  changeStatus(event: Event) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked;
    this.updateTask({status: newStatus ? TaskStatus.completed : TaskStatus.active});
  };

  changeTitle() {
    this.editMode = false;
    this.updateTask({title: this.newTitle});
  };
}

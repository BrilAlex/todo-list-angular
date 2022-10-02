import {Component, Input, OnInit} from "@angular/core";
import {TasksService} from "../../../../services/tasks.service";
import {map, Observable} from "rxjs";
import {Task, UpdateTaskModel} from "../../../../models/tasks.models";

@Component({
  selector: "tdl-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string;
  tasks!: Observable<Task[]>;
  newTaskTitle = "";

  constructor(private tasksService: TasksService) {
  };

  ngOnInit(): void {
    this.tasksService.getTasks(this.todoId);
    this.tasks = this.tasksService.tasks.pipe(map((tasks) => tasks[this.todoId]));
  };

  addTask() {
    this.tasksService.addTask(this.todoId, this.newTaskTitle);
    this.newTaskTitle = "";
  };

  removeTask(taskId: string) {
    this.tasksService.deleteTask(this.todoId, taskId);
  };

  updateTask(data: {taskId: string, model: UpdateTaskModel}) {
    this.tasksService.updateTask(this.todoId, data.taskId, data.model);
  };
}

import {Component, Input, OnInit} from "@angular/core";
import {TasksService} from "../../../../services/tasks.service";
import {combineLatest, map, Observable} from "rxjs";
import {DomainTasks, Task, UpdateTaskModel} from "../../../../models/tasks.models";
import {TodosService} from "../../../../services/todos.service";
import {DomainTodo} from "../../../../models/todos.models";
import {TaskStatus} from "../../../../../../core/enum/taskStatus.enum";

@Component({
  selector: "tdl-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string;
  tasks!: Observable<Task[]>;
  newTaskTitle = "";

  constructor(private todosService: TodosService, private tasksService: TasksService) {
  };

  ngOnInit(): void {
    this.tasksService.getTasks(this.todoId);
    this.tasks = combineLatest([this.todosService.todos, this.tasksService.tasks]).pipe(
      map(([todos, tasks]) => {
        const currentTodo = todos.find(tdl => tdl.id === this.todoId);
        let filteredTasks = tasks[this.todoId];

        if (currentTodo?.filter === "active") {
          filteredTasks = filteredTasks.filter(t => t.status === TaskStatus.active);
        }
        if (currentTodo?.filter === "completed") {
          filteredTasks = filteredTasks.filter(t => t.status === TaskStatus.completed);
        }

        return filteredTasks;
      })
    );
  };

  addTask() {
    this.tasksService.addTask(this.todoId, this.newTaskTitle);
    this.newTaskTitle = "";
  };

  removeTask(taskId: string) {
    this.tasksService.deleteTask(this.todoId, taskId);
  };

  updateTask(data: { taskId: string, model: UpdateTaskModel }) {
    this.tasksService.updateTask(this.todoId, data.taskId, data.model);
  };
}

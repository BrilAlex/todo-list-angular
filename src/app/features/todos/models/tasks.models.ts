import {TaskStatus} from "../../../core/enum/taskStatus.enum";

export interface Task {
  id: string
  todoListId: string
  title: string
  description: string
  status: TaskStatus
  priority: number
  startDate: string
  deadline: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = Omit<Task, "id" | "todoListId" | "order" | "addedDate">;

export interface DomainTasks {
  [todoId: string]: Task[]
}

export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string | null
}

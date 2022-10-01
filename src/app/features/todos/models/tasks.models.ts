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

export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string | null
}

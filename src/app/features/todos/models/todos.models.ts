export interface Todo {
  id: string
  title: string
  addedDate: string
  order: number
}

export interface DomainTodo extends Todo {
  filter: FilterValue
}

export type FilterValue = "all" | "completed" | "active";

export interface Todo {
  items: ToDoItem[];
  count: number;
}

export interface ToDoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  date: Date;
}

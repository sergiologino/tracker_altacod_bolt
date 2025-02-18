export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  assigneeId?: string;
  projectId?: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
}
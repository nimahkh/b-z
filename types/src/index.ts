export interface Task {
    id: string;
    title: string;
    deadline: string;
    completed: boolean;
    status: 'todo' | 'inProgress' | 'done';
}

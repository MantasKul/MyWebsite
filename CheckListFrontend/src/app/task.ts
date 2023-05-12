export class Task {
    id: number | undefined;
    task!: string;
    status: boolean | undefined;
    priority: string | undefined;
    position!: number;
}

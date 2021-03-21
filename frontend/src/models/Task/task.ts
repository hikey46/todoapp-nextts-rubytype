import { Task } from './types';

const isTask = (arg: unknown): arg is Task => {
  const t = arg as Task;

  return (
    typeof t?.id === 'number' &&
    typeof t?.title === 'string' &&
    typeof t?.created_at === 'string' &&
    typeof t?.updated_at === 'string'
  );
};

const isTasks = (args: unknown[]): args is Task[] =>
  !args.some((arg) => !isTask(arg));

const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`http://localhost:3000/tasks`);
  const tasks = (await response.json()) as unknown[];

  if (!isTasks(tasks)) {
    throw Error('API type error');
  }

  return tasks;
};

export { isTask, isTasks, getTasks };

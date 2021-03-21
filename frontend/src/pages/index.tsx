import React from 'react';
import { GetServerSideProps } from 'next';
import TaskList from '../components/organisms/TaskList/index';
import { getTasks, Task } from '../models/Task';

export const getServerSideProps: GetServerSideProps = async (_) => {
  const tasks = await getTasks();

  return {
    props: {
      tasks,
    },
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home({ tasks }: { tasks: Task[] }) {
  return (
    <>
      <TaskList tasks={tasks} />
    </>
  );
}

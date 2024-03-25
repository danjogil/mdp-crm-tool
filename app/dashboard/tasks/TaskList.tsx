"use client";

import { Task, TaskStatus } from "@prisma/client";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;

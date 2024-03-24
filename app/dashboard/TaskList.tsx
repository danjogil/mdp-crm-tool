"use client";

import { Task } from "@prisma/client";
import TaskItem from "./TaskItem";

import { Reorder } from "framer-motion";
import { useState } from "react";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [items, setItems] = useState(tasks);

  return (
    <Reorder.Group
      axis="y"
      onReorder={setItems}
      values={items}
      className="space-y-3"
    >
      {items.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Reorder.Group>
  );
};

export default TaskList;

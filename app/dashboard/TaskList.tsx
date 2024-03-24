"use client";

import TaskItem from "./TaskItem";

import { Reorder } from "framer-motion";
import { useState } from "react";

const taskArray = [
  { task: "Book viewing for Monday" },
  { task: "Post 3 new properties" },
  { task: "Send client selection of apartments" },
];

const tasks = taskArray.map((item) => item.task);

const TaskList = () => {
  const [items, setItems] = useState(tasks);

  return (
    <Reorder.Group
      axis="y"
      onReorder={setItems}
      values={items}
      className="space-y-3"
    >
      {items.map((item) => (
        <TaskItem key={item} task={item} />
      ))}
    </Reorder.Group>
  );
};

export default TaskList;

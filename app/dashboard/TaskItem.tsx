"use client";

import { Reorder, useMotionValue, useDragControls } from "framer-motion";
import { useRaisedShadow } from "../hooks/useRaisedShadow";
import { ReorderIcon } from "./ReorderIcon";

interface Props {
  task: string;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  console.log(task);

  return (
    <Reorder.Item
      value={task}
      className="border border-zinc-800 rounded-md p-4 bg-zinc-900 flex justify-between gap-3"
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <span className="text-sm sm:text-base">{task}</span>
      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  );
};

export default TaskItem;

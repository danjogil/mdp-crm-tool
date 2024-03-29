import Stats from "./Stats";
import prisma from "@/app/libs/prismadb";

import { DataTable as TaskTable } from "./tasks/table/data-table";
import { DataTable as ViewingTable } from "./viewings/table/data-table";
import { columns as taskColumns } from "./tasks/table/columns";
import { columns as viewingColumns } from "./viewings/table/columns";

const DashboardPage = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const viewings = await prisma.viewing.findMany();

  return (
    <div className="p-4 dark:bg-zinc-900 dark:text-white h-full space-y-5 flex-col flex items-center">
      <Stats />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-5">
          <div className="z-20 w-full rounded-md">
            <ViewingTable columns={viewingColumns} data={viewings} />
          </div>
          <div className="z-20 sm:max-w-md w-full rounded-md">
            <TaskTable columns={taskColumns} data={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

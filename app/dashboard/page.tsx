import { BackgroundBeams } from "../components/ui/Beams";
import Stats from "./Stats";
import prisma from "@/app/libs/prismadb";

import { DataTable } from "./tasks/table/data-table";
import { columns } from "./tasks/table/columns";

const DashboardPage = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 dark:bg-zinc-900 dark:text-white h-full space-y-5 flex-col flex items-center">
      <Stats />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-5">
          <div className="grow shadow border dark:border-zinc-800 px-6 py-4 rounded-md dark:bg-zinc-900 z-20 min-w-md w-full">
            Viewings
          </div>
          <div className="z-20 shadow sm:max-w-md w-full rounded-md">
            <DataTable columns={columns} data={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

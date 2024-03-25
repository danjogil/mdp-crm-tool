import { BackgroundBeams } from "../components/ui/Beams";
import Stats from "./Stats";
import TaskList from "./tasks/TaskList";
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
    <div className="p-4 bg-zinc-900 text-white h-screen space-y-5">
      <Stats />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-5">
          <div className="grow border border-zinc-800 px-6 py-4 rounded-md bg-zinc-900 z-20 min-w-md w-full">
            Viewings
          </div>
          <DataTable columns={columns} data={tasks} />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default DashboardPage;

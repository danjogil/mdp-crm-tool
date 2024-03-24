import { BackgroundBeams } from "../components/ui/Beams";
import Stats from "./Stats";
import TaskList from "./TaskList";
import prisma from "@/app/libs/prismadb";

import TaskModal from "./TaskModal";

const DashboardPage = async () => {
  const tasks = await prisma.task.findMany();

  return (
    <div className="p-4 bg-zinc-900 text-white h-screen space-y-5">
      <Stats />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row gap-5">
          <div className="grow border border-zinc-800 px-6 py-4 rounded-md bg-zinc-900 z-20">
            hello
          </div>
          <div className="grow border border-zinc-800 px-6 py-4 rounded-md bg-zinc-900 z-20 space-y-3">
            <div className="flex justify-between items-centers">
              <h1 className="font-semibold text-2xl">Tasks</h1>
              <TaskModal />
            </div>
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default DashboardPage;

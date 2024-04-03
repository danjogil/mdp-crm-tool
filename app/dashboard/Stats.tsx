import prisma from "@/app/libs/prismadb";

const Stats = async () => {
  const numAvailableProperties = await prisma.property.count({
    where: {
      status: "AVAILABLE",
    },
  });

  const totalProperties = await prisma.property.count();

  const numActiveLeads = await prisma.lead.count({
    where: {
      status: "ACTIVE",
    },
  });

  const totalLeads = await prisma.lead.count();

  const numClosedLeads = await prisma.lead.count({
    where: {
      status: "CLOSED",
    },
  });

  const numViewings = await prisma.viewing.count();

  return (
    <div className="w-full flex justify-center">
      <div className="mt-16 stats stats-vertical lg:stats-horizontal shadow w-full z-20 dark:bg-zinc-900 dark:text-zinc-50 max-w-6xl flex border dark:border-zinc-800 rounded-md">
        <div className="flex w-full flex-col sm:flex-row">
          <div className="stat dark:bg-zinc-900 z-20">
            <div className="stat-title dark:text-zinc-400 text-small sm:text-medium">
              Available Properties
            </div>
            <div className="stat-value">{numAvailableProperties}</div>
          </div>

          <div className="stat dark:bg-zinc-900 z-20">
            <div className="stat-title dark:text-zinc-400 text-small sm:text-medium">
              Active Leads
            </div>
            <div className="stat-value">{numActiveLeads}</div>
          </div>

          <div className="stat dark:bg-zinc-900 z-20">
            <div className="stat-title dark:text-zinc-400 text-small sm:text-medium">
              Viewings
            </div>
            <div className="stat-value">{numViewings}</div>
          </div>
        </div>

        <div className="flex w-full flex-col sm:flex-row border-none">
          <div className="stat dark:bg-zinc-900 z-20">
            <div className="stat-title dark:text-zinc-400 text-small sm:text-medium">
              Closed Leads
            </div>
            <div className="stat-value">{numClosedLeads}</div>
          </div>

          <div className="stat dark:bg-zinc-900 z-20">
            <div className="stat-title dark:text-zinc-400 text-small sm:text-medium">
              Total Properties
            </div>
            <div className="stat-value">{totalProperties}</div>
          </div>

          <div className="stat dark:bg-zinc-900 z-20">
            <div className="stat-title dark:text-zinc-400 text-small sm:text-medium">
              Total Leads
            </div>
            <div className="stat-value">{totalLeads}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

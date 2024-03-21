import { format } from "date-fns";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/app/libs/prismadb";

const LeadsPage = async () => {
  const data = await prisma.lead.findMany();

  const formattedData = data.map((item) => ({
    ...item,
    date: format(item.date, "dd.MM.yyyy"),
  }));

  return (
    <div className="px-4 pb-4 pt-20 text-white bg-zinc-900 h-screen">
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default LeadsPage;

import prisma from "@/app/libs/prismadb";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const PropertiesPage = async () => {
  const properties = await prisma.property.findMany();

  return (
    <div className="px-4 pb-4 pt-20 dark:text-white dark:bg-zinc-900 h-screen">
      <DataTable columns={columns} data={properties} />
    </div>
  );
};

export default PropertiesPage;

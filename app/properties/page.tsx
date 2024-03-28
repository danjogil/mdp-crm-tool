import prisma from "@/app/libs/prismadb";
import { BackgroundBeams } from "../components/ui/Beams";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const PropertiesPage = async () => {
  const properties = await prisma.property.findMany();

  return (
    <div className="px-4 pb-4 pt-20 text-white bg-zinc-900 h-screen">
      <DataTable columns={columns} data={properties} />
      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default PropertiesPage;

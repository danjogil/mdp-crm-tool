import React from "react";
import prisma from "@/app/libs/prismadb";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
  params: { id: string };
}

const SuggestedPropertiesPage: React.FC<Props> = async ({ params }) => {
  const lead = await prisma.lead.findUnique({
    where: {
      id: params?.id,
    },
  });

  const x = lead?.propertyType.replaceAll(",", "");
  const propertyTypeArray = x?.split(" ");

  const properties = await prisma.property.findMany({
    where: {
      price: {
        gte: lead?.budgetFrom,
        lte: lead?.budgetTo,
      },
      beds: {
        gte: lead?.beds,
      },
      status: "AVAILABLE",
      propertyType: {
        in: propertyTypeArray,
        mode: "insensitive",
      },
    },
  });

  return (
    <div className="pt-20 px-4 pb-4 dark:text-zinc-50 dark:bg-zinc-900">
      <DataTable columns={columns} data={properties} />
    </div>
  );
};

export default SuggestedPropertiesPage;

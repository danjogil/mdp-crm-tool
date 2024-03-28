import prisma from "@/app/libs/prismadb";
import EditLeadForm from "./EditLeadForm";

interface Props {
  params: { id: string };
}

const EditLeadPage: React.FC<Props> = async ({ params }) => {
  const lead = await prisma.lead.findUnique({
    where: {
      id: params?.id,
    },
  });

  return (
    <div className="mt-16 px-3 dark:text-white dark:bg-zinc-900">
      <EditLeadForm lead={lead} id={params?.id} />
    </div>
  );
};

export default EditLeadPage;

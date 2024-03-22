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
    <div className="mt-16 px-3 text-white">
      <EditLeadForm lead={lead} id={params?.id} />
    </div>
  );
};

export default EditLeadPage;

import prisma from "@/app/libs/prismadb";
import EditLeadForm from "./EditLeadForm-v1";

interface Props {
  params: { id: string };
}

const LeadPage: React.FC<Props> = async ({ params }) => {
  const lead = await prisma.lead.findUnique({
    where: {
      id: params?.id,
    },
  });

  return (
    <div className="mt-20 text-white px-4 pb-4">
      {/* <EditLeadForm lead={lead} id={params?.id} /> */}
    </div>
  );
};

export default LeadPage;

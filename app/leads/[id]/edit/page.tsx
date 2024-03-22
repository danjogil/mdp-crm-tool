import prisma from "@/app/libs/prismadb";

interface Props {
  params: { id: string };
}

const EditLeadPage: React.FC<Props> = async ({ params }) => {
  const lead = await prisma.lead.findUnique({
    where: {
      id: params?.id,
    },
  });

  return <div className="pt-20 px-4 pb-4 text-white">EditLeadPage</div>;
};

export default EditLeadPage;

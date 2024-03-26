import prisma from "@/app/libs/prismadb";
import EditLeadForm from "./EditPropertyForm";

interface Props {
  params: { id: string };
}

const EditLeadPage: React.FC<Props> = async ({ params }) => {
  const property = await prisma.property.findUnique({
    where: {
      id: params?.id,
    },
  });

  return (
    <div className="mt-16 px-3 text-white">
      <EditLeadForm property={property} id={params?.id} />
    </div>
  );
};

export default EditLeadPage;

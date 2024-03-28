import prisma from "@/app/libs/prismadb";
import EditPropertyForm from "./EditPropertyForm";

interface Props {
  params: { id: string };
}

const EditPropertyPage: React.FC<Props> = async ({ params }) => {
  const property = await prisma.property.findUnique({
    where: {
      id: params?.id,
    },
  });

  return (
    <div className="pt-16 px-3 dark:text-white dark:bg-zinc-900">
      <EditPropertyForm property={property} id={params?.id} />
    </div>
  );
};

export default EditPropertyPage;

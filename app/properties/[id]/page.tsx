import { BackgroundBeams } from "@/app/components/ui/Beams";
import prisma from "@/app/libs/prismadb";
import PropertyDetails from "./PropertyDetails";

interface Props {
  params: { id: string };
}

const PropertyPage: React.FC<Props> = async ({ params }) => {
  const property = await prisma.property.findUnique({
    where: {
      id: params?.id,
    },
  });

  return (
    <>
      <PropertyDetails property={property} />
      <BackgroundBeams />
    </>
  );
};

export default PropertyPage;

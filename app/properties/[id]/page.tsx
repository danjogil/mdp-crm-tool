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
    <div className="dark:bg-zinc-900">
      <PropertyDetails property={property} />
      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default PropertyPage;

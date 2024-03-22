import prisma from "@/app/libs/prismadb";
import LeadDetails from "./LeadDetails";
import { BackgroundBeams } from "@/app/components/ui/Beams";

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
    <>
      <LeadDetails lead={lead} />
      <BackgroundBeams />
    </>
  );
};

export default LeadPage;

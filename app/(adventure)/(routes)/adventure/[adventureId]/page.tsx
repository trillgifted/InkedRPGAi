import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AdventureClient } from "./components/client";

interface AdventureIdPageProps {
  params: {
    adventureId: string;
  };
}

const AdventureIdPage = async ({ params }: AdventureIdPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const scenario = await prismadb.scenario.findUnique({
    where: {
      id: params.adventureId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!scenario) {
    return redirect("/");
  }

  return <AdventureClient scenario={scenario} />;
};

export default AdventureIdPage;

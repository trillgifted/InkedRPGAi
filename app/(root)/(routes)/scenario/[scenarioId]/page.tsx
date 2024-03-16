import prismadb from "@/lib/prismadb";
import { ScenarioForm } from "./components/scenario-form";
interface ScenarioIdPageProps {
  params: {
    scenarioId: string;
  };
}
const ScenarioIdPage = async ({ params }: ScenarioIdPageProps) => {
  //TODO: Check subscription

  const scenario = await prismadb.scenario.findUnique({
    where: {
      id: params.scenarioId,
    },
  });
  const categories = await prismadb.category.findMany();

  return <ScenarioForm initialData={scenario} categories={categories} />;
};

export default ScenarioIdPage;

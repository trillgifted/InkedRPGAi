import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/categories";
import { RenderSearchBox } from "@/components/ui/renderSearchBox";
import { Scenarios } from "@/components/scenarios/scenarios";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.scenario.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
  console.log(searchParams.name);
  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <RenderSearchBox />
      <Categories data={categories} />
      <Scenarios data={data} />
    </div>
  );
};

export default RootPage;

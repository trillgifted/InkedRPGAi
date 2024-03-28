import { SearchInput } from "@/components/search-input";
import React from "react";
import { RenderSearchBox } from "@/components/ui/renderSearchBox";
import { Categories } from "@/components/categories";
import prismadb from "@/lib/prismadb";
import { Scenarios } from "@/components/scenarios/scenarios";
interface ProfilePageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
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
  const categories = await prismadb.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <RenderSearchBox />
    </div>
  );
};

export default ProfilePage;

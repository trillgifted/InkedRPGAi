import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
//import { checkSubscription } from "@/lib/subscription";

export async function PATCH(
    req: Request,
    { params }:{ params:{ scenarioId: string}}
    ) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, categoryId, privateAdventure } = body;

    if(!params.scenarioId){
        return new NextResponse("Scenario Id is required!", {status: 400})
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !description || !instructions || !categoryId|| !privateAdventure) {
      return new NextResponse("Missing required fields", { status: 400 });
    };

    //const isPro = await checkSubscription();
    /*
    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }
    */
    const scenario = await prismadb.scenario.update({
      where:{
        id: params.scenarioId,
      },
      
        data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        privateAdventure,
      }
    });

    return NextResponse.json(scenario);
  } catch (error) {
    console.log("[SCENARIO_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function DELETE(
  request: Request,
  { params }: { params: {scenarioId: string}} 
){
 try {
  const { userId } = auth();
  if(!userId){
    return new NextResponse("Unauthorized", {status: 401});
  }

  const scenario = await prismadb.scenario.delete({
    where:{
      userId,
      id: params.scenarioId

    }
  });
  return NextResponse.json(scenario);
 } catch (error) {
  console.log("[SCENARIO_DELETE]", error);
  return new NextResponse("Internal Error bruh", { status: 500})
 } 
}
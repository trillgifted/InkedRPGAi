import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
//import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !description || !instructions || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    };

    //const isPro = await checkSubscription();
    /*
    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }
    */
    const scenario = await prismadb.scenario.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions
      }
    });

    return NextResponse.json(scenario);
  } catch (error) {
    console.log("[SCENARIO_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
// pages/api/userProfileUrl.ts
import { currentUser } from "@clerk/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await currentUser();
  if (!user) {
    res.status(401).json({ error: "No user found" });
  } else {
    res.status(200).json({ profileUrl: `/profile/${user.id}` });
  }
}
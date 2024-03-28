"use client";

import { AdventureHeader } from "@/components/adventure-header";
import { Scenario, Message } from "@prisma/client";

interface AdventureClientProps {
  scenario: Scenario & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}
export const AdventureClient = ({ scenario }: AdventureClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <AdventureHeader scenario={scenario} />
    </div>
  );
};

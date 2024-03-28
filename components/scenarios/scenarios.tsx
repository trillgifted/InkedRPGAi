import { Scenario } from "@prisma/client";
import Image from "next/image";
import { number } from "zod";
import { Card, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface ScenarioProps {
  data: (Scenario & {
    _count: {
      messages: number;
    };
  })[];
}

export const Scenarios = ({ data }: ScenarioProps) => {
  if (data.length === 0) {
    return (
      <div
        className="pt-10 
            flex flex-col 
            items-center 
            justify-center
            space-y-3"
      >
        <div className="relative w-10 h-10">
          <Image fill className="grayscale" alt="Empty" src="/empty.png" />
        </div>
        <div>
          <p>Sorry, we couldn’t find any adventure with that keyword</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item) => (
        <div key={item.id} className="w-full p-2 h-35">
          <Card className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0">
            <Link href={`/adventure/${item.id}`}>
              <CardHeader className="flex items-start justify-center text-left text-muted-foreground w-full flex-grow">
                {/* 
                 <div className="relative w-22 h-22">
                  <Image
                    src={item.src}
                    fill
                    className="rounded-xl object-cover"
                    alt="Scenario"
                  />
                </div>
                 */}
                <p className="font-bold text-xl">{item.name}</p>
                <p className="text-xs">{item.description}</p>
              </CardHeader>
              <CardFooter className="flex justify-between text-xs text-muted-foreground">
                <p className="lowercase">@{item.userName}</p>
                <div className="flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {item._count.messages}
                </div>
              </CardFooter>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
};

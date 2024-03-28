"use client";

import { Scenario, Message } from "@prisma/client";
import { Button } from "./ui/button";
import { ChevronLeft, Edit, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface AdventureHeaderProps {
  scenario: Scenario & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const AdventureHeader = ({ scenario }: AdventureHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const onDelete = async () => {
    try {
      await axios.delete(`/api/scenario/${scenario.id}`);
      toast({
        description: "Success.",
      });

      router.refresh();
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <p className="font-bold">{scenario.name}</p>
      </div>

      {user?.id === scenario.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="bg-transparent">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-primary">
            <DropdownMenuItem
              onClick={() => router.push(`/scenario/${scenario.id}`)}
              className="text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-white">
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

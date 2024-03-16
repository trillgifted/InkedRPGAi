import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Sidebar } from "@/components/sidebar";
export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-8">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-primary pt-10 w-32">
        <SheetClose>
          <Sidebar />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

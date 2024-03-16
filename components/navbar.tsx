"use client";
import { UserButton } from "@clerk/nextjs";

import { Play } from "lucide-react";
import { X } from "lucide-react";
import { Search } from "lucide-react";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { useSearchContext } from "@/components/ui/searchContext";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { isSearchVisible, toggleSearch } = useSearchContext();

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-4 px-4 border-b border-primary/10 bg-black h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            id="logo"
            className="md:block text-2xl md:text-3xl font-bold text-primary text-white -ml-4 md:ml-0"
          ></h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        <div>
          {isSearchVisible ? (
            <X onClick={toggleSearch} />
          ) : (
            <Search onClick={toggleSearch} />
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Play color="black" className="h-4 w-4 fill-white text-white ml-2" />
          Play
        </Button>
        <UserButton />
      </div>
    </div>
  );
};

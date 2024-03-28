"use client";
import { Home, Plus, Settings, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      icon: Plus,
      href: "/scenario/new",
      label: "Create",
      pro: true,
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      pro: false,
    },
    {
      icon: Bookmark,
      href: user ? `/profile/${user.id}` : "/",
      label: "Saved",
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: boolean) => {
    //TODO: check if PRO
    router.push(url);
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-primary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => {
                onNavigate(route.href, route.pro);
              }}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start text-white font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1 text-white">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

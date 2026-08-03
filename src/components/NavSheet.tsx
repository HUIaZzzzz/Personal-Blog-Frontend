import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";
import { Menu } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "首页" },
  { to: "/blogs", label: "博客" },
  { to: "/projects", label: "项目" },
  { to: "/about", label: "关于" },
];

export function NavSheet({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger
        className={className}
        render={
          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>导航</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          <ThemeToggle />
          {NAV_ITEMS.map((item) => (
            <SheetClose key={item.to} asChild>
              <Link
                to={item.to}
                className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

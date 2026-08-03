import SearchDialog from "@/components/DialogSearchInput.tsx";
import { NavigationMenuDemo } from "@/components/NavigationMenu.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {NavSheet} from "@/components/NavSheet.tsx";

function Header() {
  return (
    <>
      <div className="flex items-center w-full justify-between">
        <div className="shrink-0">辉的个人博客</div>
        <div className="flex-1 justify-end pr-4 hidden sm:flex">
          <SearchDialog />
        </div>
        <div className="shrink-0 pr-4">
          <NavigationMenuDemo className="hidden md:flex"/>
          <NavSheet className="md:hidden"/>
        </div>
      </div>
        <Separator className="mt-3"/>
    </>
  );
}

export default Header;

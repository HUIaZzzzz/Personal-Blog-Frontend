import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {ThemeToggle} from "@/components/ThemeToggle.tsx";


export function NavigationMenuDemo({className}: {className?: string}) {
  return (
      <NavigationMenu className={className}>
        <NavigationMenuList>
          <ThemeToggle />
          <NavigationMenuItem>
            <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
              <Link to="/">首页</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
              <Link to="/blogs">博客</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
              <Link to="/projects">项目</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
              <Link to="/about">关于</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
  );
}

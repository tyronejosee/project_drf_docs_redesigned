"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Circle } from "lucide-react";
import { PROJECT_NAME_SHORT, MENU_ITEMS, NAV_ITEMS } from "@/config/constants";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Navbar
      isBordered
      isBlurred
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      className="fixed z-50 transition-colors duration-300"
    >
      <NavbarContent>
        <Link color="foreground" href="/">
          <NavbarBrand>
            <Circle />
            <span className="font-bold ml-2">
              {PROJECT_NAME_SHORT.toUpperCase()}
            </span>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavbarItem key={item.id}>
              <Link
                href={item.href}
                className={
                  isActive ? "font-bold text-primary" : "hover:font-bold"
                }
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <NavbarMenuItem key={item.id}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={
                  isActive ? "font-bold text-primary" : "hover:font-bold"
                }
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}

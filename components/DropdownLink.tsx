import React from "react";
import Link from "next/link";
import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/react";

type DropdownLinkProps = {
  children: React.ReactNode;
  href: string;
};

type DropdownButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const DropdownLink: React.FC<DropdownLinkProps> = ({
  children,
  href,
}) => (
  <MenuItem>
    <Link
      href={href}
      className="group flex w-full items-center rounded-lg py-1.5 px-3 text-sm/6 text-gray-700 data-[focus]:bg-gray-100"
    >
      {children}
    </Link>
  </MenuItem>
);

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  onClick,
}) => (
  <MenuItem>
    <button
      onClick={onClick}
      className="group flex w-full items-center rounded-lg py-1.5 px-3 text-sm/6 text-gray-700 data-[focus]:bg-gray-100"
    >
      {children}
    </button>
  </MenuItem>
);

export const Dropdown: React.FC<{
  children: React.ReactNode;
  buttonText: string;
}> = ({ children, buttonText }) => (
  <Menu>
    <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
      {buttonText}
    </MenuButton>
    <MenuItems className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
      {children}
    </MenuItems>
  </Menu>
);

export default Dropdown;

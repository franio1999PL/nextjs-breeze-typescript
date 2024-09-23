import React from "react";
import { Menu, Transition, MenuButton, MenuItems } from "@headlessui/react";

type AlignmentType = "left" | "top" | "right";
type WidthType = 48 | "48" | "w-48";

interface DropdownProps {
  align?: AlignmentType;
  width?: WidthType;
  contentClasses?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  align = "right",
  width = 48,
  contentClasses = "py-1 bg-white",
  trigger,
  children,
}) => {
  const widthClass: string =
    typeof width === "number" || width === "48" ? "w-48" : width;

  const alignmentClasses: string = (() => {
    switch (align) {
      case "left":
        return "origin-top-left left-0";
      case "top":
        return "origin-top";
      case "right":
      default:
        return "origin-top-right right-0";
    }
  })();

  return (
    <Menu as="div" className="relative">
      <MenuButton as={React.Fragment}>{trigger}</MenuButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={`absolute z-50 mt-2 ${widthClass} rounded-md shadow-lg ${alignmentClasses} focus:outline-none ring-1 ring-black ring-opacity-5 ${contentClasses}`}
        >
          {children}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Dropdown;

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import noStoryLogo from "../assets/noStoryLogo.svg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const navLinks = [
  {
    id: "",
    title: "HOME",
  },
  {
    id: "recipes",
    title: "ALL RECIPES",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("ALL RECIPES");
  const [toggle, setToggle] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOutsideClick = (event: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target !== buttonRef.current
    ) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="w-12/12 sticky top-0 bg-heavy-grey z-50">
      <div className="w-9/12 m-auto flex py-[18px] justify-between items-center navbar sticky top-0 bg-heavy-grey">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold text-white ml-2">
            No <span className="text-tang">Story</span> Recipes
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="list-none sm:flex hidden justify-start items-center flex-1 pl-6 mt-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? "text-white" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <Link href={`/${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div onClick={() => setToggle(!toggle)}>
            {toggle ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </div>

          {/* Sidebar */}
          <div
            ref={menuRef}
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar bg-black`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <Link href={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

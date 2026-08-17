import React from "react";
import { FaCode } from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Header() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Tools", path: "/tools" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="h-16 sticky top-0 z-50 flex justify-center items-center bg-background">
      <div className="container h-full mx-auto flex items-center justify-between w-full border-b rounded-2xl px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ">
          <FaCode className="size-8" />
          <span className="text-xl font-bold">Dj-Trading-Bull</span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-gray-500 hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign In */}
        <div>
          <Button variant="default">Sign In</Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full py-4"
    >
      <ol className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-2 text-sm backdrop-blur-sm">
        {/* Home */}
        <li className="flex items-center">
          <Link
            to="/"
            className="group flex items-center gap-1.5 rounded-full px-2 py-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5 transition-transform group-hover:scale-105" />

            <span className="hidden sm:inline">
              Home
            </span>
          </Link>
        </li>

        {/* Path */}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames
            .slice(0, index + 1)
            .join("/")}`;

          const isLast = index === pathnames.length - 1;

          const formattedName = name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <React.Fragment key={routeTo}>
              <li
                aria-hidden="true"
                className="text-muted-foreground/50"
              >
                <ChevronRight className="h-4 w-4" />
              </li>

              <li>
                {isLast ? (
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                    {formattedName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="rounded-full px-2 py-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                  >
                    {formattedName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
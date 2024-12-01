import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-between items-center w-full">
        <div className="flex gap-3 justify-center items-center">
          <Link to="/" className="p-0">
            <img src="./logo.svg" className="h-8 w-8" />
          </Link>
          <Link to="/about" className="[&.active]:font-bold text-sm">
            About
          </Link>
          <Link to="/dashboard" className="[&.active]:font-bold text-sm">
            Dashboard
          </Link>
        </div>
        <div className="flex gap-2 justify-center items-center text-sm">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="[&.active]:font-bold text-sm">
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  beforeLoad: ({ location }) => {
    const title = location.pathname === '/' ? 'Home' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);
    document.title = `${title} | React Local`;
  },
});

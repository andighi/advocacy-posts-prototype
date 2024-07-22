import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { redirect, useLocation } from "react-router-dom";

function Root() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && (
        <div className="cat-text-center cat-text-xl cat-mt-xl">
          <div className="cat-mb-l"> WELCOME!</div>
          <Link to={"/posts"}>See all posts</Link>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Root;

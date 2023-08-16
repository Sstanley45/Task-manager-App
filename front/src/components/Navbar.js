import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";

const Navbar = () => {
  const { logout, user } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <nav className="navbar">
        <p>{`| ${formattedDate} |`}</p> 
        <button className="logout-btn" onClick={logout}>
          log out
        </button>
      </nav>
    </>
  );
};

export default Navbar;

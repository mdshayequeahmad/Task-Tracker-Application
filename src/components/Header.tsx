import React from "react";
import { FaCircleUser } from "react-icons/fa6";

const Header: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center my-3 mx-3">
        <h1 className="text-4xl font-bold">Task Tracker Application</h1>
        <h1 className=" text-4xl">
          <FaCircleUser />
        </h1>
      </div>
      <hr />
    </>
  );
};

export default Header;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Checklist: React.FC = () => {
  return (
    <div className="checklist-container container mx-auto perfect-center flex-col">
      <div className="checklist-content mt-5 pb-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Checklist;

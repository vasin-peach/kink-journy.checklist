import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ChecklistHeader from "../components/checklist/ChecklistHeader";

const Checklist: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="checklist-container mx-auto flex-col">
      <ChecklistHeader />
      <div className="checklist-content-container pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Checklist;

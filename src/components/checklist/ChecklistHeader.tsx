import {
  Box,
  Container,
  Stack,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
  withStyles,
} from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../store/hook";

const ChecklistHeader = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const [steps, setSteps] = useState([
    { title: "Sexual life style", text: "What is your sexual life style" },
    { title: "Play scene", text: "BDSM play and scene" },
    { title: "Summary", text: "ผลสรุป" },
  ]);
  const activeStep = useAppSelector((state) => state.page.page);

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="checklist-header-container">
      <Container>
        <div className="mx-auto w-full md:w-2/4">
          <div>
            <Typography sx={{ textAlign: "center" }} variant="h4">
              {steps[activeStep].title}
            </Typography>
            <Typography sx={{ textAlign: "center" }} variant="subtitle1">
              {steps[activeStep].text}
            </Typography>
          </div>
          <div style={{ marginTop: "10px" }} className="hidden sm:block">
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              sx={{ color: "primaryLight" }}
            >
              {steps.map((item, index) => (
                <Step key={index}>
                  <StepLabel>{item.title}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChecklistHeader;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Checklist from "./pages/Checklist";
import Info from "./pages/Info";
import Landing from "./pages/Landing";
import Summary from "./pages/Summary";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Body>
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="info" element={<Info />} />
            <Route path="checklist" element={<Checklist />}>
              <Route path="1" element={<Step1 />} />
              <Route path="2" element={<Step2 />} />
              <Route path="3" element={<Step3 />} />
            </Route>
            <Route path="summary" element={<Summary />} />
          </Routes>
        </BrowserRouter>
      </Body>
    </>
  );
};

export default App;

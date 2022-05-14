import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="h-full">
      <div className="p-5 container mx-auto landing-container text-center perfect-center">
        <div className="wrapper">
          <div className="brand">
            <div className="text-9xl ">BDSM</div>
            <div className="text-4xl underline underline-offset-4">
              Online Checklist
            </div>
          </div>

          <div className="text text-2xl mt-10">
            <span>
              ยินดีต้อนรับสู่แบบประเมินรสนิยมทางเพศแนว BDSM
              ซึ่งจะช่วยให้คุณเข้าใจตัวคุณเองมากขึ้น
            </span>
          </div>

          <div className="submit mt-16">
            <Link role="button" to="/info" className="button-pill-light">
              ต่อไป
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

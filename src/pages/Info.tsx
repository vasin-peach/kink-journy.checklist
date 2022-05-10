import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import checked from "../assets/images/checked.svg";

const Info: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["NAME"]);
  const [name, setName] = useState<string>(document.cookie);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCookie("NAME", name);
    navigate("/checklist/1");
  };

  useEffect(() => {
    if (cookies.NAME) setName(cookies.NAME);
  }, []);

  return (
    <div className="h-full">
      <div className="info-container container mx-auto text-center px-5 perfect-center">
        <div className="wrapper">
          <div className="text-2xl sm:text-4xl">
            <span className="text-primary font-bold">BDSM</span>{" "}
            คือรสนิยมทางเพศประเภทหนึ่ง ซึ่งสิ่งสำคัญอันดับแรกคือการให้ความยินยอม
            (consent) ใม่ใช่บังคับขืนใจ
          </div>

          <div className="font-bold mt-10 text-1xl sm:text-3xl">
            แบบประเมินนี้ประกอบด้วย 2 ส่วน คือ
          </div>
          <div className="mt-5 text-1xl sm:text-2xl">
            <div>1. การประเมินรสนิยมทางเพศของตัวเอง</div>
            <div>2. รูปแบบการเพลย์ที่ชอบ หรือสนใจอยากลอง</div>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <span>ชื่อเรียกผู้ทำแบบประเมิน</span>
              <div className="mt-2">
                <div className="relative inline">
                  <input
                    type="text"
                    className="text-pill"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <button type="submit" className="text-pill-icon">
                    <img src={checked} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;

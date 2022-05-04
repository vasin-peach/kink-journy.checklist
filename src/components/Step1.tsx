import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import bdsmCheckData from "../assets/data/bdsm-check.data.json";
import { Helmet } from "react-helmet";

interface IBdsmCheck {
  id: string | number;
  text: string;
  type: string;
  check?: boolean | undefined;
}

const Step1 = () => {
  const navigate = useNavigate();
  const perPage = 7;
  const [cookies, setCookie] = useCookies(["BDSM_ROLE", "BDSM_CHECKED"]);
  const [data, setData] = useState<IBdsmCheck[]>(bdsmCheckData);
  const [page, setPage] = useState<number>(1);
  const [selectData, setSelectData] = useState<IBdsmCheck[]>([]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (page * perPage >= data.length) {
      const dom = data.filter((i) => i.type === "dom" && i.check).length;
      const sub = data.filter((i) => i.type === "sub" && i.check).length;
      const both = data.filter((i) => i.type === "switch" && i.check).length;
      const checked = await Promise.all(data.map((i) => i.check));
      const result = dom === sub ? "switch" : dom > sub ? "dom" : "sub";
      await setCookie("BDSM_ROLE", `${result}`);
      await setCookie("BDSM_CHECKED", JSON.stringify(checked));
      navigate("/checklist/2");
      return;
    }

    setPage(page + 1);
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    select: IBdsmCheck
  ) => {
    const index = data.findIndex((i) => i.id === select.id);
    const mock = [...data];
    mock[index].check = e.target.value === "yes" ? true : false;
    setData(mock);
  };

  useEffect(() => {
    const t = data.slice((page - 1) * perPage, page * perPage);
    setSelectData(t);
  }, [page]);

  return (
    <div className="step1-container">
      <Helmet>
        <title>Kinky Journey: 1.แบบประเมินรสนิยมทางเพศของตัวเอง</title>
      </Helmet>
      <div className="checklist-header mb-5">
        <div className="font-bold text-xl text-center">
          1. แบบประเมินรสนิยมทางเพศของตัวเอง
        </div>
      </div>
      <form onSubmit={handleSave}>
        <table className="table-auto w-full border border-collapse border-slate-500">
          <thead>
            <tr>
              <th style={{ width: "50px" }}></th>
              <th></th>
              <th style={{ width: "100px" }}>ใช่</th>
              <th style={{ width: "100px" }}>ไม่ใช่</th>
            </tr>
          </thead>
          <tbody>
            {selectData.map((select, index) => (
              <tr key={`step1-${index}`} className="text-xl">
                <td>{select.id}.</td>
                <td>{select.text}</td>
                <td className="radio-pill w-10">
                  <input
                    type="radio"
                    name={`radio-step1-${select.id}`}
                    value="yes"
                    checked={select.check === true}
                    onChange={(e) => handleRadioChange(e, select)}
                    required
                  />
                  <span className="checkmark"></span>
                </td>
                <td className="radio-pill w-10">
                  <input
                    type="radio"
                    name={`radio-step1-${select.id}`}
                    value="no"
                    checked={select.check === false}
                    onChange={(e) => handleRadioChange(e, select)}
                    required
                  />
                  <span className="checkmark"></span>
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
        <div className="mt-10 flex justify-center">
          {page > 1 && (
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              className="button-pill mr-5"
            >
              ย้อนกลับ
            </button>
          )}

          <button type="submit" className="button-pill">
            {page * perPage >= data.length ? "บันทึก" : "ต่อไป"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;

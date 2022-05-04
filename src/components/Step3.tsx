import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import bdsmCheckScene from "../assets/data/bdsm-check.scene.json";
import { Helmet } from "react-helmet";

interface IUnDoneScene {
  id: string | number;
  text: string;
  done?: boolean | undefined;
  like?: boolean | undefined;
  wantToTry?: boolean | undefined;
}

const Step3 = () => {
  const navigate = useNavigate();
  const perPage = 7;
  const [cookies, setCookie, removeCookie] = useCookies([
    "UNDONE_BUT_WANT_TO_TRY_SCENE",
    "UNDONE_SCENE",
  ]);
  const [data, setData] = useState<IUnDoneScene[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectData, setSelectData] = useState<IUnDoneScene[]>([]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (page * perPage >= data.length) {
      const unDoneButWantToTry = await Promise.all(
        data.filter((i) => i.wantToTry).map((i) => i.id)
      );
      await setCookie(
        "UNDONE_BUT_WANT_TO_TRY_SCENE",
        JSON.stringify(unDoneButWantToTry)
      );
      return navigate("/summary");
    }

    setPage(page + 1);
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    select: IUnDoneScene
  ) => {
    const index = data.findIndex((i) => i.id === select.id);
    const mock = [...data];
    mock[index].wantToTry = e.target.value === "yes" ? true : false;
    setData(mock);
  };

  useEffect(() => {
    const t = data.slice((page - 1) * perPage, page * perPage);
    setSelectData(t);
  }, [page]);

  useEffect(() => {
    const unDoneScene: number[] = cookies.UNDONE_SCENE;
    if (!unDoneScene || !unDoneScene.length) return navigate("/checklist/2");
    const selectedUnDoneScene = bdsmCheckScene.filter((d) =>
      unDoneScene.includes(d.id)
    );
    setData(selectedUnDoneScene);
  }, []);

  useEffect(() => {
    const t = data.slice((page - 1) * perPage, page * perPage);
    setSelectData(t);
  }, [data]);

  return (
    <div className="step1-container">
      <Helmet>
        <title>Kinky Journey: 3.รูปแบบการเพลย์ที่ไม่เคยทำ แต่อยากลอง</title>
      </Helmet>
      <div className="checklist-header mb-5">
        <div className="font-bold text-xl text-center">
          3. รูปแบบการเพลย์ที่ไม่เคยทำ แต่อยากลอง
        </div>
      </div>
      <form onSubmit={handleSave}>
        <table className="table-auto w-full border border-collapse border-slate-500">
          <thead>
            <tr>
              <th style={{ width: "50px" }}></th>
              <th></th>
              <th style={{ width: "100px" }}>อยากลอง</th>
              <th style={{ width: "100px" }}>ไม่อยากลอง</th>
            </tr>
          </thead>
          <tbody>
            {selectData.map((select, index) => (
              <tr key={`step3-${index}`} className="text-xl">
                <td>{select.id}.</td>
                <td>{select.text}</td>
                <td className="radio-pill w-10">
                  <input
                    type="radio"
                    name={`radio-step3-${select.id}`}
                    value="yes"
                    checked={select.wantToTry === true}
                    onChange={(e) => handleRadioChange(e, select)}
                    required
                  />
                  <span className="checkmark"></span>
                </td>
                <td className="radio-pill w-10">
                  <input
                    type="radio"
                    name={`radio-step3-${select.id}`}
                    value="no"
                    checked={select.wantToTry === false}
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

export default Step3;

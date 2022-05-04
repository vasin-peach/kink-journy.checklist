import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import bdsmCheckScene from "../assets/data/bdsm-check.scene.json";
import { Helmet } from "react-helmet";

interface IBdsmCheckScene {
  id: string | number;
  text: string;
  done?: boolean | undefined;
  like?: boolean | undefined;
}

const Step2 = () => {
  const navigate = useNavigate();
  const perPage = 5;
  const [cookies, setCookie] = useCookies(["LIKE_SCENE", "UNDONE_SCENE"]);
  const [data, setData] = useState<IBdsmCheckScene[]>(bdsmCheckScene);
  const [page, setPage] = useState<number>(1);
  const [selectData, setSelectData] = useState<IBdsmCheckScene[]>([]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (page * perPage >= data.length) {
      const doneAndLike = await Promise.all(
        data.filter((i) => i.done && i.like).map((i) => i.id)
      );
      const unDone = await Promise.all(
        data.filter((i) => !i.done).map((i) => i.id)
      );

      console.log(unDone);
      await setCookie("LIKE_SCENE", JSON.stringify(doneAndLike));
      await setCookie("UNDONE_SCENE", JSON.stringify(unDone));

      if (!unDone.length) return navigate("/summary");
      else return navigate("/checklist/3");
    }

    setPage(page + 1);
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    select: IBdsmCheckScene,
    target: "done" | "like"
  ) => {
    const index = data.findIndex((i) => i.id === select.id);
    const mock = [...data];

    if (target === "like") {
      mock[index][target] = mock[index][target] ? !mock[index][target] : true;
    } else {
      mock[index][target] = e.target.value === "yes" ? true : false;
    }

    setData(mock);
  };

  useEffect(() => {
    const t = data.slice((page - 1) * perPage, page * perPage);
    setSelectData(t);
  }, [page]);

  return (
    <div className="step1-container">
      <Helmet>
        <title>Kinky Journey: 2.รูปแบบการเพลย์ที่เคยทำมาก่อน</title>
      </Helmet>
      <div className="checklist-header mb-5">
        <div className="font-bold text-xl text-center">
          2. รูปแบบการเพลย์ที่เคยทำมาก่อน
        </div>
      </div>
      <form onSubmit={handleSave}>
        <table className="table-auto w-full border border-collapse border-slate-500">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>เคย</th>
              <th>ไม่เคย</th>
              <th>ชอบ</th>
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
                    name={`radio-step2-${select.id}`}
                    value="yes"
                    checked={select.done === true}
                    onChange={(e) => handleRadioChange(e, select, "done")}
                    required
                  />
                  <span className="checkmark"></span>
                </td>
                <td className="radio-pill w-10">
                  <input
                    type="radio"
                    name={`radio-step2-${select.id}`}
                    value="no"
                    checked={select.done === false}
                    onChange={(e) => handleRadioChange(e, select, "done")}
                    required
                  />
                  <span className="checkmark"></span>
                </td>
                <td className="radio-pill w-10">
                  <input
                    type="checkbox"
                    name={`radio-step2-${select.id}`}
                    value="yes"
                    checked={select.like === true}
                    onChange={(e) => handleRadioChange(e, select, "like")}
                    disabled={select.done !== true}
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

export default Step2;

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
  unlike?: boolean | undefined;
  wantToTry?: boolean | undefined;
}

const Step2 = () => {
  const navigate = useNavigate();
  const perPage = 7;
  const [cookies, setCookie] = useCookies([
    "LIKE_SCENE",
    "UNDONE_SCENE",
    "UNLIKE_SCENE",
    "DONE_LIKE_SCENE",
    "UNDONE_BUT_WANT_TO_TRY_SCENE",
  ]);
  const [data, setData] = useState<IBdsmCheckScene[]>(bdsmCheckScene);
  const [page, setPage] = useState<number>(1);
  const [selectData, setSelectData] = useState<IBdsmCheckScene[]>([]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (page * perPage >= data.length) {
      const doneAndLike = await Promise.all(
        data.filter((i) => i.done && i.like).map((i) => i.id)
      );
      const like = await Promise.all(
        data.filter((i) => i.like).map((i) => i.id)
      );
      const unlike = await Promise.all(
        data.filter((i) => i.unlike).map((i) => i.id)
      );
      const unDone = await Promise.all(
        data.filter((i) => !i.done).map((i) => i.id)
      );
      const wantToTry = await Promise.all(
        data.filter((i) => i.wantToTry).map((i) => i.id)
      );

      console.log(data);

      await setCookie("DONE_LIKE_SCENE", JSON.stringify(doneAndLike));
      await setCookie("LIKE_SCENE", JSON.stringify(like));
      await setCookie("UNLIKE_SCENE", JSON.stringify(unlike));
      await setCookie("UNDONE_SCENE", JSON.stringify(unDone));
      await setCookie(
        "UNDONE_BUT_WANT_TO_TRY_SCENE",
        JSON.stringify(wantToTry)
      );

      return navigate("/summary");
    }

    setPage(page + 1);
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement> | boolean,
    select: IBdsmCheckScene,
    target: "done" | "like" | "wantToTry" | "unlike",
    mode: "radio" | "checkbox" = "radio"
  ) => {
    const index = data.findIndex((i) => i.id === select.id);
    const mock = [...data];

    if (mode === "checkbox") {
      mock[index][target] = mock[index][target] ? !mock[index][target] : true;
    } else {
      mock[index][target] =
        (typeof e === "boolean" ? e : e.target.value) === "yes" ? true : false;
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
              <th style={{ width: "100px" }}>เคย</th>
              <th style={{ width: "100px" }}>ไม่เคย</th>
              <th style={{ width: "100px" }}>ชอบ</th>
              <th style={{ width: "100px" }}>ไม่ชอบ</th>
              <th style={{ width: "100px" }}>อยากลอง</th>
            </tr>
          </thead>
          <tbody>
            {selectData.map((select, index) => (
              <tr key={`step1-${index}`} className="text-xl">
                <td width={50}>{select.id}.</td>
                <td>{select.text}</td>
                <td className="radio-pill w-10">
                  <input
                    type="radio"
                    name={`radio-step2-${select.id}`}
                    value="yes"
                    checked={select.done === true}
                    onChange={(e) => {
                      handleRadioChange(e, select, "done");
                      select.wantToTry &&
                        handleRadioChange(
                          false,
                          select,
                          "wantToTry",
                          "checkbox"
                        );
                    }}
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
                    onChange={(e) => {
                      handleRadioChange(e, select, "done");
                      select.like &&
                        handleRadioChange(false, select, "like", "checkbox");
                      select.unlike &&
                        handleRadioChange(false, select, "unlike", "checkbox");
                    }}
                    required
                  />
                  <span className="checkmark"></span>
                </td>
                <td className="radio-pill w-10">
                  <input
                    type="checkbox"
                    name={`radio-step2-like-${select.id}`}
                    checked={select.like === true}
                    onChange={(e) =>
                      handleRadioChange(e, select, "like", "checkbox")
                    }
                    disabled={(select.done ? false : true) || select.unlike}
                  />
                  <span className="checkmark"></span>
                </td>
                <td className="radio-pill w-10">
                  <input
                    type="checkbox"
                    name={`radio-step2-unlike-${select.id}`}
                    checked={select.unlike === true}
                    onChange={(e) => {
                      handleRadioChange(e, select, "unlike", "checkbox");
                    }}
                    disabled={(select.done ? false : true) || select.like}
                  />
                  <span className="checkmark"></span>
                  {/* {select.like ? "true" : "false"} */}
                </td>
                <td className="radio-pill w-10">
                  <input
                    type="checkbox"
                    name={`radio-step2-want-to-try-${select.id}`}
                    checked={select.wantToTry === true}
                    onChange={(e) =>
                      handleRadioChange(e, select, "wantToTry", "checkbox")
                    }
                    disabled={
                      select.done === undefined
                        ? true
                        : select.done
                        ? true
                        : false
                    }
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

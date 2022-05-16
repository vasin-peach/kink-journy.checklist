import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import bdsmCheckScene from "../assets/data/bdsm-check.scene.json";
import { Helmet } from "react-helmet";
import {
  Checkbox,
  Container,
  Divider,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import { IData } from "./Step1";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  getLifeStyle,
  getPlayScene,
  updatePlayScene,
} from "../store/slices/summary";
import { incressePage, setStep } from "../store/slices/page";

interface IBdsmCheckScene {
  id: string | number;
  text: string;
  done?: boolean | undefined;
  like?: boolean | undefined;
  unlike?: boolean | undefined;
  wantToTry?: boolean | undefined;
}

const Step2 = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const perPage = 10;
  const [data, setData] = useState<IData[]>(bdsmCheckScene);
  const [pageData, setPageData] = useState<IData[]>([]);
  const [page, setPage] = useState<number>(0);

  const lifeStyleData = useAppSelector(getLifeStyle);

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  const updatePageData = () => {
    setPageData(
      Object.entries(data)
        .slice(page * perPage, (page + 1) * perPage)
        .map((item) => item[1])
    );
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number,
    target: string,
    mode: "radio" | "switch" = "radio"
  ) => {
    const index = data.findIndex((i) => i.id === id);
    let value = e.target.value === "true" ? true : false;
    if (mode === "switch" && data[index].value)
      value =
        e.target.value === "true" ? !(data[index].value as any)[target] : true;

    await setData(
      data.map((i) => {
        return i.id === id
          ? { ...i, value: { ...i.value, [target]: value } }
          : i;
      })
    );
  };

  const isLastPage = () => {
    return (page + 1) * perPage >= Object.keys(data).length;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headerElm = document.querySelector("#root");
    headerElm?.scrollIntoView({ behavior: "smooth", block: "start" });

    // save to store
    dispatch(updatePlayScene(data));

    if (!isLastPage()) return setPage(page + 1);
    navigate("/checklist/summary");

    // if (page * perPage >= data.length) {
    //   const doneAndLike = await Promise.all(
    //     data.filter((i) => i.done && i.like).map((i) => i.id)
    //   );
    //   const like = await Promise.all(
    //     data.filter((i) => i.like).map((i) => i.id)
    //   );
    //   const unlike = await Promise.all(
    //     data.filter((i) => i.unlike).map((i) => i.id)
    //   );
    //   const unDone = await Promise.all(
    //     data.filter((i) => !i.done).map((i) => i.id)
    //   );
    //   const wantToTry = await Promise.all(
    //     data.filter((i) => i.wantToTry).map((i) => i.id)
    //   );

    //return navigate("/summary");
    // }

    // setPage(page + 1);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Watches                                  */
  /* -------------------------------------------------------------------------- */
  // page mounted
  useEffect(() => {
    // check playscene data is valid
    console.log(lifeStyleData);
    // if (!lifeStyleData.length) return navigate("/checklist/1");

    // on mounted
    updatePageData();
    dispatch(setStep(1));

    // on un-mounted
    return () => {
      setPage(0);
      updatePageData();
    };
  }, []);

  // page changed
  useEffect(() => {
    updatePageData();
  }, [page, data]);

  /* -------------------------------------------------------------------------- */
  /*                                 Components                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="step1-container">
      <Helmet>
        <title>Kinky Journey: 2.รูปแบบการเพลย์ที่เคยทำมาก่อน</title>
      </Helmet>
      <div className="step-content">
        <form onSubmit={handleSave}>
          <Container>
            <Grid container>
              <Grid
                item
                className="step-content-row"
                sx={{ width: "100%", textAlign: "right" }}
                style={{ background: "none" }}
              >
                <Radio disabled />= จำเป็นต้องติ๊ก (Required)
                <Checkbox disabled />= ไม่จำเป็นต้องติ๊ก (Optional)
                <hr />
              </Grid>
              {pageData.map((item, index) => (
                <Grid item key={index} xs={12} className="step-content-row">
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body1">
                        {item.id}. {item.text.th}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <hr className="my-2 block md:hidden" />
                      <div className="flex justify-center lg:justify-end pr-2">
                        <div>
                          <Radio
                            name={`radio-step-${item.id}`}
                            value="true"
                            checked={item.value?.done === true}
                            onChange={(e) => {
                              handleInputChange(e, item.id, "done");
                            }}
                            required
                          />
                          <span>เคย</span>
                        </div>
                        <div>
                          <Radio
                            name={`radio-step-${item.id}`}
                            value="false"
                            checked={item.value?.done === false}
                            onChange={(e) =>
                              handleInputChange(e, item.id, "done")
                            }
                            required
                          />
                          <span>ไม่เคย</span>
                        </div>
                        {item.value?.done && (
                          <>
                            <div
                              className="mx-2"
                              style={{ borderRight: "1px solid #fff" }}
                            />
                            <div>
                              <Checkbox
                                name={`radio-step-${item.id}`}
                                value="true"
                                checked={item.value?.like === true}
                                disabled={item.value?.unlike as boolean}
                                onChange={(e) => {
                                  handleInputChange(
                                    e,
                                    item.id,
                                    "like",
                                    "switch"
                                  );
                                }}
                              />
                              <span>ชอบ</span>
                            </div>
                            <div>
                              {item.value?.like}
                              <Checkbox
                                name={`checkbox-step-${item.id}`}
                                value="true"
                                checked={item.value?.unlike === true}
                                disabled={item.value?.like as boolean}
                                onChange={(e) => {
                                  handleInputChange(
                                    e,
                                    item.id,
                                    "unlike",
                                    "switch"
                                  );
                                }}
                              />
                              <span>ไม่ชอบ</span>
                            </div>
                          </>
                        )}
                        {item.value?.done === false && (
                          <>
                            <div
                              className="mx-2"
                              style={{ borderRight: "1px solid #fff" }}
                            />
                            <div>
                              <Checkbox
                                name={`checkbox-step-${item.id}`}
                                value="true"
                                checked={item.value?.wantToTry === true}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    item.id,
                                    "wantToTry",
                                    "switch"
                                  )
                                }
                              />
                              <span>อยากลอง</span>
                            </div>
                          </>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <hr className="my-5" />
            <div className="flex justify-center  pb-10">
              {page >= 1 && (
                <button
                  type="button"
                  onClick={() => setPage(page - 1)}
                  className="button-pill mr-5"
                >
                  ย้อนกลับ
                </button>
              )}

              <button type="submit" className="button-pill">
                {isLastPage() ? "บันทึก" : "ต่อไป"}
              </button>
            </div>
          </Container>
        </form>
      </div>
    </div>
  );
};

export default Step2;

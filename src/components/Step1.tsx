import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import bdsmCheckData from "../assets/data/bdsm-check.data.json";
import { Helmet } from "react-helmet";
import { Container, Grid, Radio, Typography } from "@mui/material";
import { useAppDispatch } from "../store/hook";
import { updateLifeStyle } from "../store/slices/summary";
import { getName, setStep } from "../store/slices/page";
import { useSelector } from "react-redux";

export interface IData {
  id: number | string;
  text: {
    th: string;
    en?: string;
  };
  type?: string;
  value?: Record<string, string | boolean>;
}

const Step1 = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const perPage = 10;
  const [data, setData] = useState<IData[]>(bdsmCheckData);
  const [pageData, setPageData] = useState<IData[]>([]);
  const [page, setPage] = useState<number>(0);
  const name = useSelector(getName);

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
    dispatch(updateLifeStyle(data));

    if (!isLastPage()) return setPage(page + 1);
    navigate("/checklist/2");
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Watches                                  */
  /* -------------------------------------------------------------------------- */
  // page mounted
  useEffect(() => {
    if (!name) navigate("/info");

    // on mounted
    updatePageData();
    dispatch(setStep(0));

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

  return (
    <div className="step-container">
      <Helmet>
        <title>Kinky Journey: 1.แบบประเมินรสนิยมทางเพศของตัวเอง</title>
      </Helmet>

      <div className="step-content">
        <form onSubmit={handleSave}>
          <Container>
            <Grid container>
              {pageData.map((item, index) => (
                <Grid item key={index} xs={12} className="step-content-row">
                  <Grid container>
                    <Grid item xs={12} md={9}>
                      <Typography variant="body1">
                        {item.id}. {item.text.th}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <hr className="my-2 block md:hidden" />
                      <div className="flex justify-center lg:justify-end pr-2">
                        <div>
                          <Radio
                            name={`radio-step-${item.id}`}
                            value="true"
                            checked={item.value?.interest === true}
                            onChange={(e) =>
                              handleInputChange(e, item.id, "interest")
                            }
                            required
                          />
                          <span>ใช่</span>
                        </div>
                        <div>
                          <Radio
                            name={`radio-step-${item.id}`}
                            value="false"
                            checked={item.value?.interest === false}
                            onChange={(e) =>
                              handleInputChange(e, item.id, "interest")
                            }
                            required
                          />
                          <span>ไม่ใช่</span>
                        </div>
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

export default Step1;

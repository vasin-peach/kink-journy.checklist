import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import bdsmCheckScene from "../assets/data/bdsm-check.scene.json";
import printJS from "print-js";
import { Helmet } from "react-helmet";

const Summary: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const [cookies, setCookie] = useCookies([
    "NAME",
    "BDSM_ROLE",
    "DONE_LIKE_SCENE",
    "UNDONE_BUT_WANT_TO_TRY_SCENE",
    "UNLIKE_SCENE",
  ]);
  const [likeScene, setLikeScene] = useState<string[]>([]);
  const [wantToTryScene, setWantToTryScene] = useState<string[]>([]);
  const [dontWantToTryScene, setDontWantToTryScene] = useState<string[]>([]);

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  const fetchLikeScene = () => {
    const likeScene: number[] = cookies.DONE_LIKE_SCENE;
    if (!likeScene) return setLikeScene(["N/A"]);

    // find scene data using `LIKE_SCENE` index
    const likeSceneData = bdsmCheckScene
      .filter((i) => likeScene.includes(i.id))
      .map((i) => i.text);

    setLikeScene(likeSceneData);
  };

  const fetchWantToTryScene = () => {
    const wantToTryScene: number[] = cookies.UNDONE_BUT_WANT_TO_TRY_SCENE;
    if (!wantToTryScene) return setWantToTryScene(["N/A"]);

    // find scene data using `UNDONE_BUT_WANT_TO_TRY_SCENE` index
    const wantToTrySceneData = bdsmCheckScene
      .filter((i) => wantToTryScene.includes(i.id))
      .map((i) => i.text);

    setWantToTryScene(wantToTrySceneData);
  };

  const fetchDontWantToTryScene = () => {
    const dontWantToTryScene: number[] = cookies.UNLIKE_SCENE;
    if (!dontWantToTryScene) return setDontWantToTryScene(["N/A"]);

    // find scene data using `UNDONE_BUT_WANT_TO_TRY_SCENE` index
    const dontWantToTrySceneData = bdsmCheckScene
      .filter((i) => dontWantToTryScene.includes(i.id))
      .map((i) => i.text);

    setDontWantToTryScene(dontWantToTrySceneData);
  };

  const printPdf = () => {
    printJS("summary-content", "html");
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Watches                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    fetchLikeScene();
    fetchWantToTryScene();
    fetchDontWantToTryScene();
  }, []);

  return (
    <div className="p-5 summary-container container mx-auto flex items-center flex-col">
      <Helmet>
        <title>
          Kinky Journey: ผลลัพธ์แบบประเมิน ({cookies.NAME || "N/A"})
        </title>
      </Helmet>
      <div className="summary-content" id="summary-content">
        <div className="mb-5">
          <div className="font-bold text-xl text-center">
            ผลลัพธ์แบบประเมินรสนิยม BDSM
          </div>
        </div>
        <table className="table-auto border mx-auto">
          <tbody>
            <tr>
              <td>
                <b>วันที่ทำการประเมิน</b>
              </td>
              <td>{new Date().toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>
                <b>ชื่อ</b>
              </td>
              <td>{cookies.NAME || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <b>บทบาท</b>
              </td>
              <td>{cookies.BDSM_ROLE || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <b>ซีนเพลย์ที่ชอบ</b>
              </td>
              <td>
                {likeScene.map((d, i) => (
                  <div key={i}>
                    {i + 1}. {d}
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                <b>ซีนเพลย์ที่อยากลอง</b>
              </td>
              <td>
                {wantToTryScene.map((d, i) => (
                  <div key={i}>
                    {i + 1}. {d}
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <td>
                <b>ซีนเพลย์ที่เล่นแล้วไม่ชอบ</b>
              </td>
              <td>
                {dontWantToTryScene.map((d, i) => (
                  <div key={i}>
                    {i + 1}. {d}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-10 mx-auto">
          <hr className="my-5" />
          <div
            className="font--bold text-xl mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <div style={{ textIndent: "25px" }}>
              Checklist
              นี้เป็นการประเมินตัวเองเบื้องต้นสำหรับคนที่สนใจและอยากรู้จัก BDSM
              ซึ่งรสนิยมส่วนบุคคลนี้สามารถเปลี่ยนแปลงได้เมื่อคุณรู้จัก BDSM
              มากขึ้น
            </div>
            <br />
            ในวันข้างหน้าที่คุณกลับมาทำแบบประเมินนี้อีกครั้ง
            อยากให้คุณมีความสุขในเส้นทาง BDSM ที่เลือก
          </div>
          <div className="font--bold text-xl mx-auto">
            <br />
            สนใจอยากเรียนรู้เพิ่มเติม ติดตามที่ twitter
            <a
              href="https://twitter.com/inner_taboo"
              className="text-primary"
              target="_blank"
            >
              @inner_taboo
            </a>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => printPdf()}
        className="button-pill mt-10 mb-10"
      >
        บันทึก
      </button>
    </div>
  );
};

export default Summary;

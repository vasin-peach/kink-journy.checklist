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
    "LIKE_SCENE",
    "UNDONE_BUT_WANT_TO_TRY_SCENE",
  ]);
  const [likeScene, setLikeScene] = useState<string[]>([]);
  const [wantToTryScene, setWantToTryScene] = useState<string[]>([]);

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  const fetchLikeScene = () => {
    const likeScene: number[] = cookies.LIKE_SCENE;
    if (!likeScene) setLikeScene(["N/A"]);

    // find scene data using `LIKE_SCENE` index
    const likeSceneData = bdsmCheckScene
      .filter((i) => likeScene.includes(i.id))
      .map((i) => i.text);

    setLikeScene(likeSceneData);
  };

  const fetchWantToTryScene = () => {
    const wantToTryScene: number[] = cookies.UNDONE_BUT_WANT_TO_TRY_SCENE;
    if (!wantToTryScene) setWantToTryScene(["N/A"]);

    // find scene data using `UNDONE_BUT_WANT_TO_TRY_SCENE` index
    const wantToTrySceneData = bdsmCheckScene
      .filter((i) => wantToTryScene.includes(i.id))
      .map((i) => i.text);

    setWantToTryScene(wantToTrySceneData);
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
  }, []);

  return (
    <div className="p-5 summary-container container mx-auto flex items-center flex-col">
      <Helmet>
        <title>Kinky Journey: ผลลัพธ์แบบประเมิน ({cookies.NAME || "N/A"})</title>
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
          </tbody>
        </table>

        <div className="mt-10 mx-auto">
          <div className="font--bold text-xl mx-auto">
            BDSM
            เป็นเรื่องรสนิยมส่วนตัวซึ่งเปลี่ยนแปลงได้ขึ้นกับสภาพปัจจัยทั้งภายนอกภายใน
            ในวันข้างหน้าที่คุณกลับมาทำแบบประเมินนี้อีกครั้ง
            อาจจะทำให้แปลกใจก็เป็นได้
          </div>
          <div className="font--bold text-xl mx-auto">
            สนใจอยากรู้เพิ่ม ติดตาม{" "}
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
        className="button-pill mt-10"
      >
        บันทึก
      </button>
    </div>
  );
};

export default Summary;

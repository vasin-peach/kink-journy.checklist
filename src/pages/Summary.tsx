import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import bdsmCheckScene from "../assets/data/bdsm-check.scene.json";
import printJS from "print-js";
import { Helmet } from "react-helmet";
import { useAppDispatch } from "../store/hook";
import { getName, setStep } from "../store/slices/page";
import { useSelector } from "react-redux";
import {
  getLifeStyle,
  getLikeScene,
  getPlayScene,
  getRole,
  getUnlikeScene,
  getWantToTryScene,
} from "../store/slices/summary";
import {
  Grid,
  List,
  ListItem,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Summary: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const role = useSelector(getRole);
  const name = useSelector(getName);
  const likeScene = useSelector(getLikeScene);
  const wantToTryScene = useSelector(getWantToTryScene);
  const unlikeScene = useSelector(getUnlikeScene);
  const lifeStyle = useSelector(getLifeStyle);
  const playScene = useSelector(getPlayScene);
  const matches = useMediaQuery("(max-width:600px)");

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  const printPdf = () => {
    if (matches) return window.print();

    const elm = document.getElementById("summary-content");
    if (!elm) return;

    const height = elm.offsetHeight;
    html2canvas(elm, {
      scale: 3,
    }).then((canvas) => {
      //Returns the image data URL, parameter: image format and clarity (0-1)
      const pageData = canvas.toDataURL("image/jpeg", 1.0);

      //Default vertical direction, size ponits, format a4[595.28,841.89]
      const pdf = new jsPDF("portrait", "pt", "a4");

      //Two parameters after addImage control the size of the added image, where the page height is compressed according to the width-height ratio column of a4 paper.
      pdf.addImage(
        pageData,
        "JPEG",
        0,
        0,
        595.28,
        (592.28 / canvas.width) * canvas.height
      );

      pdf.save(`Kinky Journey: ผลลัพธ์แบบประเมิน (${name || "N/A"}).pdf`);
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Watches                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    dispatch(setStep(2));

    if (!lifeStyle.length || !playScene.length) navigate("/checklist/1");
    console.log(unlikeScene);
  }, []);

  return (
    <div className="p-5 summary-container container mx-auto flex items-center flex-col">
      <Helmet>
        <title>Kinky Journey: ผลลัพธ์แบบประเมิน ({name || "N/A"})</title>
      </Helmet>
      <div
        className="summary-content"
        id="summary-content"
        style={{ borderRadius: "15px", background: "#fff", padding: "15px" }}
      >
        <div className="mt-10 mx-auto">
          <TableContainer
            component={Paper}
            sx={{ width: "100%" }}
            id="output"
            className="output"
          >
            <TableBody>
              <TableRow>
                <TableCell className="w-1/4">วันที่ทำการประเมิน</TableCell>
                <TableCell className="w-2/4">
                  {new Date().toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ชื่อ</TableCell>
                <TableCell>{name || "ไม่มีข้อมูล"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>บทบาท</TableCell>
                <TableCell>{role || "ไม่มีข้อมูล"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ซีนเพลย์ที่ชอบ</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <Grid container>
                      {likeScene.map((item, index) => (
                        <Grid item xs={12} md={6} lg={4}>
                          <b>{index + 1}</b>. {item.text.th}
                        </Grid>
                      )) || "ไม่มีข้อมูล"}
                    </Grid>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ซีนเพลย์ที่อยากลอง</TableCell>
                <TableCell>
                  {wantToTryScene.map((item, index) => (
                    <Typography variant="body2">
                      {index + 1}. {item.text.th}
                    </Typography>
                  )) || "ไม่มีข้อมูล"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ซีนเพลย์ที่เล่นแล้วไม่ชอบ</TableCell>
                <TableCell>
                  {unlikeScene.map((item, index) => (
                    <Typography variant="body2">
                      {index + 1}. {item.text.th}
                    </Typography>
                  )) || "ไม่มีข้อมูล"}
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
          <div className="font--bold text-xl mx-auto mt-10 text-center">
            <Typography variant="body1" sx={{ textIndent: "25px" }}>
              <span>
                Checklist
                นี้เป็นการประเมินตัวเองเบื้องต้นสำหรับคนที่สนใจและอยากรู้จัก
                BDSM ซึ่งรสนิยมส่วนบุคคลนี้สามารถเปลี่ยนแปลงได้เมื่อคุณรู้จัก
                BDSM มากขึ้น
              </span>
              <span>
                ในวันข้างหน้าที่คุณกลับมาทำแบบประเมินนี้อีกครั้ง
                อยากให้คุณมีความสุขในเส้นทาง BDSM ที่เลือก
              </span>
            </Typography>
            <br />
            <Typography variant="body1">
              <div>
                สนใจอยากเรียนรู้เพิ่มเติม ติดตามที่ twitter
                <a
                  href="https://twitter.com/inner_taboo"
                  className="text-primary"
                  target="_blank"
                >
                  @inner_taboo
                </a>
              </div>
            </Typography>
            <br />
          </div>
          <div className="font--bold text-xl mx-auto">
            <br />
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

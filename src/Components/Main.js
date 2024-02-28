import React, { useContext, useEffect, useState } from "react";
import MyContext from "./Context/MyContext";
import ReactPlayer from "react-player/lazy";
import screenfull from "screenfull";
import { useNavigate } from "react-router-dom";
import copy from "clipboard-copy";
import CallBox from "./CallBox";
import VideoBox from "./VideoBox";

function Main(props) {
  // const navigator = useNavigate();
  const context = useContext(MyContext);
  const { selfid, videolink, sendlink } = context;
  const [mode, setmode] = useState("Full Screen");
  const [link, setlink] = useState("");
  let elem = props.videolink;
  let elem2 = props.setvideolink;
  let a = 1;

  const onClick = async () => {
    try {
      await copy(selfid);
      alert("Text successfully copied to clipboard");
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  const onClickFullScreen = (e) => {
    e.preventDefault();
    if (a === 1) {
      screenfull.request();
      setmode("esc to exit full screen");
      a = 0;
    } else if (a === 0) {
      setmode("Full Screen");
      a = 1;
    }
  };

  const onclicklink = (e) => {
    e.preventDefault();
    props.setvideolink(link);
    sendlink({ link: link });
    localStorage.setItem("link", link);
  };

  const handleonenter = (event) => {
    if (event.key === "Enter") {
      onclicklink(event);
    }
  };

  return (
    <div className="h-screen w-screen flex font-Roboto">
      <div className=" w-[80%] flex-col relative bg-black">
        <div className="h-[5%]  w-full bg-gray-900 px-5 py-1 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClick}
              className="border px-2 text-sm rounded-xl font-semibold text-[#F5F5F5] border-[#F5F5F5]"
            >
              Room id: {selfid ? selfid : "loading..."}
            </button>{" "}
            |
            <p className="text-xs text-white">
              Send your room id to your friend and then fun with your friend
            </p>
          </div>
          <button
            onClick={onClickFullScreen}
            className="border px-2 text-sm rounded-xl  font-semibold  text-[#F5F5F5] border-[#F5F5F5]"
          >
            {mode}
          </button>
        </div>
        <div className="h-[95%]">
          {!props.videolink ? (
            <div className="h-full w-full bg-gray-800 flex flex-col justify-center items-center text-white">
              <h2 className="text-lg font-Roboto italic font-semibold">
                Enter Down Your Video Link
              </h2>
              <div className="w-full h-auto flex gap-3 justify-center">
                {" "}
                <input
                  onKeyDown={handleonenter}
                  onChange={(e) => {
                    setlink(e.target.value);
                  }}
                  value={link}
                  className="h-10 w-1/3 rounded-xl outline-none text-lg font-Roboto font-semibold px-2 bg-slate-50 text-black"
                  placeholder="Enter Link"
                />{" "}
                <button
                  onClick={onclicklink}
                  className="border-0 rounded-xl bg-orange-400 px-3 text-xl font-Roboto font-semibold hover:bg-orange-500"
                >
                  Watch
                </button>{" "}
              </div>
            </div>
          ) : (
            <VideoBox videolink={elem} setvideolink={elem2} />
          )}
        </div>
      </div>

      <div className="h-full w-[20%] flex justify-end">
        <CallBox />
      </div>
    </div>
  );
}

export default Main;

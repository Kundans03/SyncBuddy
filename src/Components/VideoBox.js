import React, { useContext, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import MyContext from "./Context/MyContext";
import ReactPlayer from "react-player";
import ProgressBar from "@ramonak/react-progress-bar";

function VideoBox(props) {
  const context = useContext(MyContext);
  const {
    isPlaying,
    setIsPlaying,
    sendfunction,
    plaubtn,
    setplaubtn,
    hide,
    sethide,
    functiononseek,
    state,
    functiononback,
    style3,
    setstyle3
  } = context;
  const [style, setstyle] = useState({opacity:"0"});
  const style2 = { display: "none", transition: "2s" };
  const [played, setPlayed] = useState(0.0);
  const [Duration, setDuration] = useState("");

  const handlePlayPause = (e) => {
    e.preventDefault();
    if (state.current) {
      setIsPlaying(!isPlaying);
      if (plaubtn === "Pause") {
        setplaubtn("Play");
        setstyle3({ display: "flex", transition: "2s" });
      } else if (plaubtn === "Play") {
        setplaubtn("Pause");
        setTimeout(() => {
          setstyle3({ display: "none", transition: "2s" });
        }, 100);
      }
    }

    sendfunction({ isPlaying: !isPlaying });
    sethide({ opacity: 0 });
  }
  
console.log(isPlaying)
  const onMouseEnter = () => {
    if (isPlaying) { //now true
      setstyle3({ display: "flex", transition: "2s" });
    }
    // if (!isPlaying === false) {  //now false
      setstyle3({ display: "flex", transition: "2s" });
    // }
  }

  const onMouseExit = () => {
    // if (isPlaying) {
      setstyle3({ display: "flex", transition: "2s" });
    // }
    if (!isPlaying) {
      // setTimeout(() => {
        setstyle3({ display: "none", transition: "2s" });
      // }, 4000);
    }
  };

  const onclickback = (e) => {
    e.preventDefault();
    functiononback();
    props.setvideolink(null);
    localStorage.removeItem("link");
  };

  function convertSecondsToTimeString(seconds) {
    if (seconds > 3600) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    } else {
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }
  }

  const handleonspace = (event) => {
    if (event.key === "Space" && event.key === "MediaPlayPause") {
      handlePlayPause(event);
    } else if (event.key === "ArrowLeft") {
      // console.log("-10")
      addonseek();
      state.current.seekTo(played - 10, "seconds");
    } else if (event.key === "ArrowRight") {
      // console.log("+10")
      subonseek();
    }
  };

  const addonseek = () => {
    if (state.current) {
      state.current.seekTo(played + 10, "seconds");
      functiononseek({ seconds: played + 10 });
    }
  };
  const subonseek = () => {
    if (state.current) {
      state.current.seekTo(played - 10, "seconds");
      functiononseek({ seconds: played - 10 });
    }
  };

  return (
    <div className="h-full w-full z-10 relative bg-black  flex  flex-col justify-center ">
            <button
        onKeyDown={handleonspace}
        onClick={handlePlayPause}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseExit}
        style={style}
        className="h-full  z-30 w-full bg-transparent absolute outline-none border-none"
      ></button>

      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseExit}
        style={style3}
        className="z-30 h-[7.5%] w-full absolute top-0 bg-black flex justify-start items-center px-5"
      >
        {" "}
        <button
          onClick={onclickback}
          className="text-white border-2 px-3 rounded-xl font-Roboto font-semibold"
        >
          Back
        </button>
      </div>
      <button
        style={hide}
        onKeyDown={handleonspace}
        onClick={handlePlayPause}
        className="z-30 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black p-3 px-5 rounded-2xl border-4 text-white"
      >
        {plaubtn}
      </button>
      <ReactPlayer
        ref={state}
        url={localStorage.getItem("link")}
        height="100%"
        width="100%"
        loop
        volume={null}
        controls={false}
        playing={!isPlaying}
        onProgress={(e) => {
          setPlayed(e.playedSeconds);
        }}
        onDuration={(e) => {
          setDuration(e);
        }}
      />
      <div
        onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseExit}
        style={style3}
        className="h-12 w-[90%] z-30 absolute px-5 bg-transparent flex flex-col items-center bottom-2 "
      >
        <div  onMouseEnter={onMouseEnter} className="flex w-full px-2 items-center gap-2  text-white">
          <p>
            {convertSecondsToTimeString(parseInt(played))}/
            {convertSecondsToTimeString(Duration)}
          </p>
          <ProgressBar
            className="w-full"
            completed={parseInt(played)}
            maxCompleted={Duration}
            customLabel=" "
            bgColor="red"
            height="5px"
            width="100%"
          />
        </div>

        <div  onMouseEnter={onMouseEnter} className="flex items-center justify-start w-full gap-5 ">
          <button onClick={subonseek} className="text-2xl text-white ">
            <i class="ri-replay-10-line"></i>
          </button>
          <button
            onKeyDown={handleonspace}
            onClick={handlePlayPause}
            className="border rounded-xl px-2 text-white"
          >
            {plaubtn}
          </button>
          <button onClick={addonseek} className="text-2xl text-white ">
            <i class="ri-forward-10-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoBox;

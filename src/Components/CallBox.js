import React, { useContext } from "react";
import MyContext from "./Context/MyContext";
import MessageBox from "./MessageBox";

function CallBox() {
  const context = useContext(MyContext);
  const { selfstream, theirstream } = context;
  return (
    <div className="h-full w-full bg-gray-900 flex flex-col p-1 gap-1 ">
      <div className="h-full flex flex-col gap-1 justify-between">
        <div className="bg-gray-800 h-full w-full relative">
          <h3 className="absolute text-white left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] text-center z-10">
            Waiting for your partner...
          </h3>
          <video
            ref={theirstream}
            autoPlay={true}
            className=" h-full w-full object-cover -scale-x-100 z-20 absolute"
          />
        </div>
        <div className="bg-gray-800 h-full w-full relative">
          <h3 className="absolute text-white left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] text-center z-10">
            Your Stream...
          </h3>
          <video
            ref={selfstream}
            autoPlay={true}
            className=" h-full w-full object-cover -scale-x-100 z-20 absolute"
          />
        </div>
      </div>
      <div className="h-[30%] w-full relative  p-2 bg-gray-800 font-Roboto">
        <MessageBox />
      </div>
    </div>
  );
}

export default CallBox;

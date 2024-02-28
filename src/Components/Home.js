import React, { useContext, useEffect, useState } from "react";
import MyContext from "./Context/MyContext";
import { Peer } from "peerjs";
import { useNavigate } from "react-router-dom";
import "../error.css";
import pic from "./pic.png";

function Home() {
  const navigator = useNavigate();
  // const peer = new Peer();

  const context = useContext(MyContext);
  const {
    connectpeer,
    selfid,
    settheirid,
    theirid,
    startcall,
    alertmessage,
    setalertmessage,
  } = context;
  useEffect(() => {
    connectpeer();
  }, []);

  //onChange function
  const onChange = (e) => {
    settheirid(e.target.value);
    if (selfid) {
      setalertmessage("We are connected to server");
    }
  };

  //onClick function
  const onClick = async (e) => {
    e.preventDefault();
    navigator("/chat");
  };

  //onJoin function
  const onJoin = async (e) => {
    e.preventDefault();
    if (!theirid) {
      setalertmessage("Please enter room id or Create new room");
      setTimeout(() => {
        setalertmessage("");
      }, 5000);
    } else if (theirid && selfid) {
      await startcall();
      navigator("/chat");
    } else if (!selfid) {
      setalertmessage("Waitting for server respound");
    }
  };

  const getid = () => {
    if (!selfid) {
      setalertmessage("Please wait | We are trying to connecting to server ");
    }
  };

  return (
    <>
      <div className=" hidden md:h-screen md:w-screen md:font-Roboto md:flex bg-gradient-to-r from-[#787276] to-[#C5C6D0]   lg:h-screen lg:w-screen lg:font-Roboto lg:flex">
        <div className="h-full w-1/3 bg-transparent flex  items-center justify-center">
          <div className="text-[#F5F5F5]  drop-shadow-2xl ml-20">
            <h1 className="text-5xl  font-semibold italic  mb-5 font-serif">
              SyncBuddy
            </h1>
            <h2 className="mb-3 font-semibold text-2xl ">Join Room</h2>
            <input
              value={theirid}
              onClick={getid}
              onChange={onChange}
              placeholder="Enter Room Id "
              className=" mb-1 bg-transparent outline-none w-full py-1 text-lg"
            />
            <button
              onClick={onJoin}
              className="text-gray-50 font-semibold border m-1 px-5 py-1 rounded-md mb-3 mr-5 hover:text-[#CFC8C2] hover:rotate-3 hover:border-[#CFC8C2]"
            >
              Join
            </button>
            <button
              onClick={onClick}
              className="my-2 text-gray-50 font-semibold border m-1 px-5 py-1 rounded-md mb-3 hover:text-[#CFC8C2] hover:rotate-3 hover:border-[#CFC8C2]"
            >
              Create Room
            </button>
            <hr />
            <h2 className="mb-3 text-black font-mono text-start">
              {alertmessage}
            </h2>
            {/* <h1 className='mb-3 text-black font-mono'>{connectingtoserver}</h1> */}
          </div>
        </div>
        <div className="h-full w-1/2 ml-40 items-center justify-center flex flex-col ">
          <img className="blur-sm h-1/2 w-full" src={pic} />
          <h2 className="h-1/2 w-3/4 font-serif italic  from-neutral-500 text-center  text-3xl text-gray-800">
            You Can Do Live Video Chat <br /> with Your Partner along with Text
            chat <br /> You can watch videos just by using video address both
            person can control video at ones from both sides!!{" "}
          </h2>
          <p className="font-roboto font-semibold mb-20 text-slate-600">
            i hope you will enjoy this app 😊😊
          </p>
        </div>
      </div>
      <div className=" md:hidden lg:hidden">
        <div className="container">
          <h1>
            <span className="pendulum">4</span>04 Not for Phones
          </h1>
        </div>
      </div>
    </>
  );
}

export default Home;

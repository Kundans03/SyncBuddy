import React, { useContext, useState } from "react";
import MyContext from "./Context/MyContext";
function MessageBox() {
  const context = useContext(MyContext);
  const { sendmessage, setdata, data, chat } = context;
  const [alert, setalert] = useState("Enter message");

  const senddata = async (e) => {
    e.preventDefault();
    if (data) {
      await sendmessage();
    } else if (!data) {
      setalert("Message can't be empty");
      setTimeout(() => {
        setalert("Enter message");
      }, 2000);
    }
    setdata("");
  };

  const handleonenter = (event) => {
    if (event.key === "Enter") {
      senddata(event);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between bg-gray-800 ">
      {/* <p className='text-white h-fit font-semibold text-xs rounded-md border w-fit px-1'>connected</p> */}
      <div className="scrollbar overflow-y-scroll   h-auto ">
        {chat.map((element) => {
          return (
            <div style={element.style} key={element.index}>
              <p className="text-white border-white overflow-auto  w-full  px-2 font-semibold  font-Roboto rounded-md  mb-1">
                {element.message}
              </p>
            </div>
          );
        })}
      </div>

      <div className=" h-[15%]   w-[19vw] p-1 flex gap-1  mt-2 items-center">
        <input
          onKeyDown={handleonenter}
          value={data}
          onChange={(e) => {
            setdata(e.target.value);
          }}
          className="  w-full text-white font-Roboto bg-transparent outline-none"
          placeholder={alert}
        />
        <button
          onClick={senddata}
          className="text-white border rounded-md px-1"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageBox;

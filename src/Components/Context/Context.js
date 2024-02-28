import React, { useEffect, useRef, useState } from "react";
import MyContext from "./MyContext";
import { Peer } from "peerjs";
import cors from "cors";
function Context(props) {
  cors();

  const [selfid, setselfid] = useState("");
  const [theirid, settheirid] = useState("");
  const selfstream = useRef("");
  const theirstream = useRef("");
  const [chat, setchat] = useState([]);
  const [alertmessage, setalertmessage] = useState("");
  const [data, setdata] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [plaubtn, setplaubtn] = useState("Play");
  const [hide, sethide] = useState({});
  const [style3, setstyle3] = useState({ display: "flex", transition: "2s" });
  const state = useRef(null);

  const connRef = useRef(null);
  const peer = new Peer();

  //connecting to peer
  const connectpeer = async () => {
    console.log("getting id");
    peer.on("open", (id) => {
      setselfid(id);
      console.log("got sucess", id);
    });
  };

  //listen for connection event
  peer.on("connection", (connection) => {
    console.log("incoming connection request");
    connection.on("data", (receivedData) => {
      if (receivedData.message) {
        setchat((prevChat) => [...prevChat, receivedData]);
      } else if (receivedData.work) {
        setIsPlaying(receivedData.work.isPlaying);
        if (receivedData.work.isPlaying === false) {
          sethide({ opacity: 0 });
          setplaubtn("Pause");
          setstyle3({ display: "flex", transition: "2s" });
        } else if (receivedData.work.isPlaying === true) {
          setplaubtn("Play");
          setTimeout(() => {
            setstyle3({ display: "none", transition: "2s" });
          }, 100);}
        }else if (receivedData.link) {
        try {
          props.setvideolink(receivedData.link.link);
          // localStorage.setItem("link",receivedData.link)
          localStorage.setItem("link", receivedData.link.link);
        } catch (error) {
          console.log(error);
        }
      } else if (receivedData.seek) {
        state.current.seekTo(receivedData.seek.seconds, "seconds");
        // console.log(receivedData.seek)
      } else if (receivedData.back) {
        props.setvideolink(null);
        localStorage.removeItem("link");
      }
    });

    connRef.current = connection;
  });

  const setconnectionformessage = () => {
    const conn = peer.connect(theirid);

    //listening for message
    conn.on("data", (receivedData) => {
      if (receivedData.message) {
        setchat((prevChat) => [...prevChat, receivedData]);
      } else if (receivedData.work) {
        setIsPlaying(receivedData.work.isPlaying);
        if (receivedData.work.isPlaying === false) {
          sethide({ opacity: 0 });
          setplaubtn("Pause");
          setstyle3({ display: "flex", transition: "2s" });
        } else if (receivedData.work.isPlaying === true) {
          setplaubtn("Play");
          setTimeout(() => {
            setstyle3({ display: "none", transition: "2s" });
          }, 100);}
        }else if (receivedData.link) {
        try {
          props.setvideolink(receivedData.link.link);
          // localStorage.setItem("link",receivedData.link)
          localStorage.setItem("link", receivedData.link.link);
        } catch (error) {
          console.log(error);
        }
      } else if (receivedData.seek) {
        state.current.seekTo(receivedData.seek.seconds, "seconds");
        // console.log(receivedData.seek)
      } else if (receivedData.back) {
        props.setvideolink(null);
        localStorage.removeItem("link");
      }
    });

    connRef.current = conn;
  };

  //calling to a person
  const startcall = async () => {
    try {
      var mediaStream =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      await mediaStream({ video: true, audio: true }, (stream) => {
        var call = peer.call(theirid, stream);
        selfstream.current.srcObject = stream;
        call.on("stream", (stream) => {
          theirstream.current.srcObject = stream;
        });
      });

      setTimeout(() => {
        setconnectionformessage();
      }, 6000);
    } catch (error) {
      console.log(error);
    }
  };

  // Answering a call
  peer.on("call", async (call) => {
    console.log("incoming call");
    var mediaStream =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    await mediaStream({ video: true, audio: true }, (stream) => {
      call.answer(stream);
      selfstream.current.srcObject = stream;
    });
    console.log("call recived");
    call.on("stream", (stream) => {
      theirstream.current.srcObject = stream;
    });
  });

  const sendmessage = async () => {
    if (connRef.current) {
      setchat((prevChat) => [
        ...prevChat,
        { id: selfid, message: data, style: { textAlign: "right" } },
      ]);
      connRef.current.send({
        id: selfid,
        message: data,
        style: { textAlign: "left" },
      });
    }
  };

  const sendfunction = (work) => {
    if (connRef.current) {
      connRef.current.send({ work: work });
      // console.log(work)
    }
  };
  const functiononseek = (seek) => {
    if (connRef.current) {
      connRef.current.send({ seek: seek });
    }
  };
  const functiononback = () => {
    if (connRef.current) {
      connRef.current.send({ back: "back" });
    }
  };

  const sendlink = async (link) => {
    if (connRef.current) {
      await connRef.current.send({ link: link });
      // console.log(link)
    }
  };

  return (
    <MyContext.Provider
      value={{
        connectpeer,
        selfid,
        peer,
        theirid,
        settheirid,
        peer,
        selfstream,
        theirstream,
        startcall,
        alertmessage,
        setalertmessage,
        chat,
        setdata,
        sendmessage,
        data,
        setconnectionformessage,
        connRef,
        isPlaying,
        setIsPlaying,
        sendfunction,
        sendlink,
        plaubtn,
        setplaubtn,
        hide,
        sethide,
        functiononseek,
        state,
        functiononback,
        style3,
        setstyle3
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Context;

import "./App.css";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Context from "./Components/Context/Context";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function App() {
  const [videolink, setvideolink] = useState(null);
  return (
    <div className="App">
      <Context setvideolink={setvideolink}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/chat"
              element={
                <Main videolink={videolink} setvideolink={setvideolink} />
              }
            />
          </Routes>
        </Router>
        {/* <CallBox/> */}
      </Context>
    </div>
  );
}

export default App;

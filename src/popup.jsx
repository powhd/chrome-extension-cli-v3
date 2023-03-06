import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import storage from "./services/storage";
import "./popup.css";

const Index = () => {
  const [exist, setExist] = useState(false);

  useEffect(async () => {
    console.log("_____popup");
    return () => {};
  }, []);

  return <div className="popup">ff chrome extends &#x2902;</div>;
};

ReactDOM.render(<Index />, document.getElementById("root"));

import React from "react";
import IndexRouter from "./route";
import { AnyProvider } from "./Context";
import "./App.css";

const App = () => {
  return (
    <AnyProvider>
      <IndexRouter />
    </AnyProvider>
  );
};

export default App;

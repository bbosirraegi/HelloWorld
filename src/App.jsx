import React from "react";
import IndexRouter from "./route";
import { MainLayout } from "./components";
import { CommunityProvider } from './Context'
import "./App.css";

const App = () => {
  return (
    <CommunityProvider>
      <IndexRouter />
    </CommunityProvider>
  );
};

export default App;

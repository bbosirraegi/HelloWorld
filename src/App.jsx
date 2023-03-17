import React from "react";
import IndexRouter from "./route";
import { MainLayout } from "./components";
import { CommunityProvider, TopicProvider } from "./Context";
import "./App.css";

const App = () => {
  return (
    <TopicProvider>
      <CommunityProvider>
        <IndexRouter />
      </CommunityProvider>
    </TopicProvider>
  );
};

export default App;

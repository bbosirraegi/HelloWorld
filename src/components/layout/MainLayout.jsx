import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../css/mainlayout.css";
import BestTopics from "./BestTopic";
import ContentsHeader from "./ContentsLayout/ContentsHeader";
import ContentsPart from "./ContentsLayout/ContentsPart";
import Header from "./Header";

function MainLayout() {
  return (
    <div className="container vhvw">
      <div className="mainlayout-a">
        {/* Header */}
        <Header />
      </div>
      <div className="mainlayout-b">
        {/* Main */}
        <ContentsHeader />
        <ContentsPart>
          <Outlet />
        </ContentsPart>
      </div>
      <div className="mainlayout-c">
        <BestTopics />
      </div>
    </div>
  );
}

export default MainLayout;

import styled from "styled-components";
import { useState } from "react";
import CommentList from "../components/CommentList";
import MemoryInfo from "../components/MemoryInfo";

// 피그마에 있는 폰트 적용
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Spoqa Han Sans Neo', sans-serif;
  }
`;

function MemoryDetail() {
  return (
    <>
      <GlobalStyle />
      <div style={{ padding: "50px" }}>
        <MemoryInfo />
        <CommentList />
      </div>
    </>
  );
}

export default MemoryDetail;

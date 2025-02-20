import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Header from "./header/header";
import Memory from "./memory/memory";
import MakeNewMemory from "./memory/makeNewMemory";
import CheckPwForPrivate from "./memory/authorizePrivate";

import MemoryDetail from "./memory/memoryDetail";
import UnfoundPage from "./memory/UnfoundPage";

import CreateGroup from "./pages/CreateGroup";

// 조각집 헤더가 모든 페이지에 있어서 고정하고 그 아래에 내용 넣도록 레이아웃 설정
function ProtectedLayout() {
  return (
    <Header>
      <Outlet />
    </Header>
  );
}

{
  /*로고 + 그룹만들기 버튼이 고정으로 되어 있는 레이아웃 만들때 쓰면 좋을거 같아서 미리 주석처리리*/
}
/*function ProtectedLayout2() {
  return (
    <Header>
      <Outlet />
    </Header>
  );
}*/

function App() {
  return (
    <Router>
      <Routes>
        {/* 조각집 로고를 헤더에 고정적으로 가지지않는 페이지를를 라우트하는 곳 : 따로 만들어서 넣기 - 임시적으로 넣어놨습니다! */}

        <Route element={<ProtectedLayout />}>
          {/* 조각집 로고가 헤더위치에 고정적으로 있는 페이지 경로 지정하는 부분 - 동적인거는 개발하면서 수정.. 
              url은 path안에 넣고 보여줄 화면을 element 안에 넣어주시면 됩니다! 일단 테스트로 2개 정도 넣어놓았습니다! */}

          <Route path="/" element={<CreateGroup />} />
          {/* <Route path="/Home" element={<Memory />} /> */}
          <Route path="/groups/:groupId" element={<Memory />} />

          {/* <Route path="/newMemory" element={<MakeNewMemory />} /> */}
          <Route path="/newMemory/:groupId" element={<MakeNewMemory />} />

          <Route path="/privateMemory" element={<CheckPwForPrivate />} />

          <Route path="/posts/:id" element={<MemoryDetail />} />
          <Route path="*" element={<UnfoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

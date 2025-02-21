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

import PrivateGroupList from "./pages/PrivateGroupList";
import PublicGroupList from "./pages/PublicGroupList";
import CreateGroup from "./pages/CreateGroup";
import PrivateGroupAccess from "./pages/PrivateGroupAccess";

// 헤더 고정 레이아웃
function ProtectedLayout() {
  return (
    <Header>
      <Outlet />
    </Header>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 헤더가 고정된 레이아웃 */}
        <Route element={<ProtectedLayout />}>
          {/* 조각집 로고가 헤더위치에 고정적으로 있는 페이지 경로 지정하는 부분 - 동적인거는 개발하면서 수정.. 
              url은 path안에 넣고 보여줄 화면을 element 안에 넣어주시면 됩니다! 일단 테스트로 2개 정도 넣어놓았습니다! */}

          <Route path="/groups/:groupId" element={<Memory />} />
          <Route path="/newMemory/:groupId" element={<MakeNewMemory />} />

          <Route
            path="/privateMemory/:postId"
            element={<CheckPwForPrivate />}
          />
          <Route path="/newMemory" element={<MakeNewMemory />} />
          <Route path="/privateMemory" element={<CheckPwForPrivate />} />
          <Route path="/posts/:postId" element={<MemoryDetail />} />
          <Route path="*" element={<UnfoundPage />} />

          {/* 공개 그룹 목록 (기본 경로) */}
          <Route path="/" element={<PublicGroupList />} />
          {/* 비공개 그룹 목록 */}
          <Route path="/private-groups" element={<PrivateGroupList />} />
          {/* 그룹 생성 페이지 */}
          <Route path="/createGroup" element={<CreateGroup />} />
          {/* 비공개 그룹 접근 (비밀번호 확인 페이지) */}
          <Route
            path="/groups/private/access/:groupId"
            element={<PrivateGroupAccess />}
          />
          {/* 메모리 관련 페이지 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

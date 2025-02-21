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
          {/* 공개 그룹 목록 (기본 경로) */}
          <Route path="/" element={<PublicGroupList />} />
          {/* 비공개 그룹 목록 */}
          <Route path="/private-groups" element={<PrivateGroupList />} />
          {/* 그룹 생성 페이지 */}
          <Route path="/createGroup" element={<CreateGroup />} />
          {/* 비공개 그룹 접근 (비밀번호 확인 페이지) */}
          <Route path="/groups/private/access/:groupId" element={<PrivateGroupAccess />} />
          {/* 메모리 관련 페이지 */}
          <Route path="/Home" element={<Memory />} />
          <Route path="/newMemory" element={<MakeNewMemory />} />
          <Route path="/privateMemory" element={<CheckPwForPrivate />} />
          <Route path="/post" element={<MemoryDetail />} />
          {/* 존재하지 않는 페이지 처리 */}
          <Route path="/unfound" element={<UnfoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

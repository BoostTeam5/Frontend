import React, { useState, useEffect } from "react";
import PublicGroupCard from "../components/PublicGroupCard";
import "../style/PrivateGroupList.css"; // 동일한 스타일 사용
import publicIcon from "../assets/public_active.png";  // 공개 active 아이콘
import privateIcon from "../assets/private_default.png"; // 비공개 default 아이콘
import searchBarBg from "../assets/searchBar.png";
import searchIcon from "../assets/search.png";
import addGroupIcon from "../assets/addGroup.png";
import noGroupAlert from "../assets/no_group_alert.png"; // 그룹 없음 이미지
import addGroupIconLong from "../assets/addGroup_long.png";
import { useNavigate } from "react-router-dom";
import { fetchGroups } from "../api/groupApi"; // API 함수 임포트

const PublicGroupList = () => {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("likes"); // 공감순 디폴트
  const [displayCount, setDisplayCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await fetchGroups();
        // API에서 불러온 그룹 중 공개(isPublic === true) 그룹만 사용
        const publicGroups = data.filter((group) => group.isPublic);
        setGroups(publicGroups);
      } catch (error) {
        console.error("그룹 데이터 불러오기 실패:", error);
      }
    };
    getGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === "likes") return b.likeCount - a.likeCount;
    if (sortBy === "recent")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "comments") return b.postCount - a.postCount;
    return 0;
  });

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 12);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="private-group-container">
      {/* 상단 UI */}
      <div className="header-controls">
        <img src={publicIcon} alt="공개 버튼" className="public-btn" />
        <img
          src={privateIcon}
          alt="비공개 버튼"
          className="private-btn"
          onClick={() => navigate("/private-groups")}
        />
        <div className="search-bar">
          <img src={searchBarBg} alt="검색창 배경" className="search-bg" />
          <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
          <input
            type="text"
            placeholder="그룹명을 검색해 주세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 정렬 박스 */}
        <div className="sort-box">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="likes">공감순</option>
            <option value="recent">최신순</option>
            <option value="comments">댓글순</option>
          </select>
        </div>

        {/* 그룹 만들기 버튼 */}
        <img
          src={addGroupIcon}
          alt="그룹 만들기"
          className="create-group-btn"
          onClick={() => navigate("/createGroup")}
        />
      </div>

      {/* 그룹이 없을 경우 */}
      {sortedGroups.length === 0 ? (
        <div className="no-group-container">
          <img
            src={noGroupAlert}
            alt="등록된 공개 그룹 없음"
            className="no-group-image"
          />
          <img
            src={addGroupIconLong}
            alt="그룹 만들기"
            className="add-group-icon"
            onClick={() => navigate("/createGroup")}
          />
        </div>
      ) : (
        <>
          {/* 그룹 카드 목록 */}
          <div className="private-group-list">
            {sortedGroups.slice(0, displayCount).map((group) => (
              <PublicGroupCard key={group.groupId} group={group} />
            ))}
          </div>

          {/* 더보기 버튼 */}
          {displayCount < sortedGroups.length && (
            <button className="load-more-btn" onClick={loadMore}>
              {loading ? "로딩 중..." : "더보기"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PublicGroupList;

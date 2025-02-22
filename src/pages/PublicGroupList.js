import React, { useState, useEffect } from "react";
import PublicGroupCard from "../components/PublicGroupCard";
import PrivateGroupCard from "../components/PrivateGroupCard";
import "../style/PrivateGroupList.css"; // 동일한 스타일 사용
import publicActiveIcon from "../assets/public_active.png"; // 공개 active 아이콘
import publicDefaultIcon from "../assets/public_default.png";
import privateActiveIcon from "../assets/private_active.png";
import privateDefaultIcon from "../assets/private_default.png";
import searchBarBg from "../assets/searchBar.png";
import searchIcon from "../assets/search.png";
import addGroupIcon from "../assets/addGroup.png";
import noGroupAlert from "../assets/no_group_alert.png"; // 그룹 없음 이미지
import addGroupIconLong from "../assets/addGroup_long.png";
import { useNavigate } from "react-router-dom";
import groupApi from "../api/groupApi";

const PublicGroupList = () => {
  const [groups, setGroups] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("likes"); // 공감순 디폴트
  const [displayCount, setDisplayCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await groupApi.fetchGroups(
          1,
          100,
          sortBy,
          keyword,
          isPublic
        );
        console.log("전체 불러온 그룹 수:", response.data.length);
        setGroups(response.data);
      } catch (error) {
        console.error("그룹 데이터 불러오기 실패:", error);
      }
    };
    getGroups();
  }, [isPublic, sortBy, keyword]);

  // 로컬 필터링 (이미 isPublic가 API에서 처리된다면 이 필터는 필요 없을 수 있음)
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(keyword.toLowerCase())
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
        <img
          src={isPublic ? publicActiveIcon : publicDefaultIcon}
          alt="공개 버튼"
          className="public-btn"
          onClick={() => setIsPublic(true)}
        />
        <img
          src={!isPublic ? privateActiveIcon : privateDefaultIcon}
          alt="비공개 버튼"
          className="private-btn"
          onClick={() => setIsPublic(false)}
        />
        <div className="search-bar">
          <img src={searchBarBg} alt="검색창 배경" className="search-bg" />
          <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
          <input
            type="text"
            placeholder="그룹명을 검색해 주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
        </div>
        {/* 정렬 선택 박스 */}
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
            alt="등록된 그룹 없음"
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
              <div key={group.id} style={{ cursor: "pointer" }}>
                {/* <div key={group.groupId} style={{ cursor: "pointer" }}> */}
                {isPublic ? (
                  <PublicGroupCard
                    group={group}
                    onClick={() => navigate(`/groups/${group.id}`)}
                  />
                ) : (
                  <PrivateGroupCard
                    group={group}
                    onClick={() => navigate(`/private-groups/${group.id}`)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* 더보기 버튼: 남은 그룹이 있으면 표시 */}
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

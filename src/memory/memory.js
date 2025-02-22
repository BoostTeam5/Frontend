import React, { useEffect, useState, Button, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupEditModal from "./groupEditModal";
import GroupDeleteModal from "./groupDeleteModal";
import defaultImg from "../assets/family.png";
import line from "../assets/line.png";
import likeBtn from "../assets/likeBtn.png";
import addMemory from "../assets/addMemory.png";
import publicActiveIcon from "../assets/public_active.png";
import privateActiveIcon from "../assets/private_active.png";
import publicDefaultIcon from "../assets/public_default.png";
import privateDefaultIcon from "../assets/private_default.png";
import noMemory from "../assets/no_memory_alert.png";
import search from "../assets/search.png";
import comment from "../assets/comment-count.png";
import likeCountImg from "../assets/flower-like.png";
import "./groupEditModal.css";
import "./memory.css";
import MemoryApi from "../apis/memoryAPI";

function Memory() {
  const { groupId } = useParams(); // URL에서 가져오는 함수
  const [group, setGroup] = useState([]); // 그룹 정보 상태

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("latest"); //  latest | mostCommented | mostLiked
  const [keyword, setKeyword] = useState("");

  // 공개 비공개 그룹별 api에서 isPublic 속성에 따라서 데이터 분류하고 저장
  const [posts, setPosts] = useState([]);
  // 공개 비공개 필터링
  const [isPublic, setIsPublic] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false); // 이거 필요없을듯 public으로 수정하기

  // 그룹 수정, 삭제
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 추억 만들기 버튼
  const [isMakeMemoryOpen, setIsMakeMemoryOpen] = useState(false);
  const [badges, setBadges] = useState([]);
  const [hasMore, setHasMore] = useState(false); // 더 불러올 게시글이 있는지 여부
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // 추억 만들기 버튼
  const handleMakeMemory = () => {
    setIsMakeMemoryOpen(true);
  };

  // 추억 만들기 버튼 클릭시 추억 생성 페이지로 이동
  const navigate = useNavigate();
  const GoToMemory = () => {
    navigate(`/newMemory/${groupId}`);
  };

  const loadMoreData = () => {
    console.log("더보기");
  };

  const handleFilterChange = (value) => {
    setIsPublic(value); // ✅ isPublic 값 변경하여 API 다시 호출
  };

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "mostCommented", label: "게시글 많은 순" },
    { value: "mostLiked", label: "공감순" },
    { value: "badge", label: "획득 뱃지순" },
  ];

  // 드롭다운에서 정렬 옵션 선택 시 호출되는 핸들러
  const handleSortOptionClick = (option) => {
    setSortBy(option.value);
    setDropdownOpen(false);
    setPage(1);
  };

  // 태그 혹은 제목으로 검색하기
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  // 공개 비공개 안 눌렀을 때 게시글 보여주기
  const filteredPosts = posts.filter((post) => {
    // isPublic이 null이면 전체 게시글 보여주기, 그렇지 않으면 해당 상태와 일치하는 게시글만 반환
    return isPublic === null ? true : post.isPublic === isPublic;
  });

  const updateLike = async () => {
    try {
      await MemoryApi.giveGroupLike(groupId); // 그룹 좋아요 API 호출
      console.log("✅ 그룹 좋아요 업데이트 완료");

      // 최신 그룹 정보 다시 불러오기
      fetchGroup();
    } catch (error) {
      console.error("❌ 그룹 좋아요 업데이트 실패:", error);
    }
  };

  const fetchGroup = useCallback(async () => {
    try {
      const data = await MemoryApi.readGroupInfo(groupId);
      setGroup(data);
      setBadges(data.badges);
      //console.log(data.badges[0].name);
      console.log("✅ 최신 그룹 정보:", data);
    } catch (error) {
      console.error("❌ 그룹 정보 불러오기 실패:", error);
    }
  }, [groupId]);

  useEffect(() => {
    if (groupId && !isEditModalOpen) {
      fetchGroup();
    }
  }, [groupId, isEditModalOpen, fetchGroup]); // ✅ useEffect에서 fetchGroup 사용

  // 두번 렌더링되지 않게 부모에서는 group 정보 바꾸고 모달 닫기까지만으로 수정
  const handleUpdateGroup = async (updatedGroup) => {
    console.log("Parent received updated group:", updatedGroup);
    setGroup(updatedGroup);
    setIsEditModalOpen(false);
  };

  // 필터나 정렬, 검색어 등 변화 시 페이지와 게시글 초기화
  useEffect(() => {
    setPage(1);
    setPosts([]);
  }, [groupId, sortBy, keyword, isPublic]);

  //useEffect로 그룹의 게시글 가져오기 */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await MemoryApi.readPosts(
          groupId,
          page,
          pageSize,
          sortBy,
          keyword,
          isPublic
        );

        // const uniquePosts = Array.from(
        //   new Set(response.data.map((post) => post.id))
        // ).map((id) => response.data.find((post) => post.id === id));
        //setPosts(uniquePosts);
        if (page === 1) {
          setPosts(response.data);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
        }

        // 만약 불러온 게시글 개수가 pageSize와 같다면 더 불러올 게시글이 있다고 가정
        setHasMore(response.data.length === pageSize);
        //setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    if (groupId) {
      fetchPosts();
    }
  }, [groupId, page, pageSize, sortBy, keyword, isPublic]); // ✅ 값이 바뀌면 자동으로 실행

  // 그룹 삭제 API
  const deleteGroupAPI = async (password) => {
    try {
      const response = await MemoryApi.deleteGroup(groupId, password); // 입력된 비밀번호 전달

      if (response && response.message === "그룹 삭제 성공") {
        alert("그룹이 삭제되었습니다.");
        setIsDeleteModalOpen(false); // 모달 닫기
        navigate("/"); // 삭제 후 메인 페이지 이동
      } else {
        alert("그룹 삭제 실패. 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);
      alert("비밀번호를 다시 입력해주세요");
    }
  };

  const OpacityButton = ({ src, onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{
          border: "none",
          background: "none",
          padding: 0,
          cursor: "pointer",
          transition: "opacity 0.2s ease-in-out",
        }}
        onMouseDown={(e) => (e.currentTarget.style.opacity = 0.6)}
        onMouseUp={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      >
        <img
          src={src}
          alt="버튼 이미지"
          style={{ width: "180px", height: "50px" }}
        />
      </button>
    );
  };

  return (
    <div className="groupDetail-container">
      {/* 상단 그룹 정보 */}
      <div className="clickedGroupInfo">
        {/* 왼쪽: 그룹 이미지 */}
        <div className="groupImageDesign">
          <img
            src={group.imageUrl ? group.imageUrl : defaultImg}
            alt="그룹 이미지"
          />
        </div>

        {/* 중앙: 그룹 정보 */}
        <div className="groupInfo-text">
          <div className="info1">
            <div className="info1">
              <span>
                D+
                {Math.floor(
                  (new Date() - new Date(group.createdAt)) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
              </span>
              <span>{group.isPublic ? "공개" : "비공개"}</span>
            </div>
          </div>

          <div className="info2">
            <span>{group.name || "달봉이네 가족"}</span>
            <span>{`추억 ${group.postCount}` || `추억 8`}</span>
            <span>|</span>
            <span>{`그룹 공감 ${group.likeCount}` || `그룹 공감 1.5K`}</span>
          </div>

          <div className="groupIntro">
            {group.introduction ||
              "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다."}
          </div>

          <div className="badge-container">
            {badges.map((badge) => (
              <span key={badge.id} className="badge">
                {badge.name}
              </span>
            ))}
          </div>
        </div>

        {/* 오른쪽: 버튼 컨테이너 */}
        <div className="button-container">
          <div className="textBtn">
            <button
              className="text-button"
              onClick={() => {
                setIsEditModalOpen(true);
              }}
            >
              그룹 정보 수정하기
            </button>
            <button
              className="text-button"
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              그룹 삭제하기
            </button>
          </div>

          <div className="like-button-container">
            <OpacityButton
              src={likeBtn}
              onClick={() => {
                updateLike();
              }}
            />
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="divider">
        <img src={line} alt="구분선" />
      </div>

      <div className="memory-container">
        {/* 상단 헤더 영역 */}
        <div className="memory-header">
          <h1 className="memory-title">추억 목록</h1>
          <button
            className="add-memory-btn"
            onClick={() => navigate(`/newMemory/${groupId}`)}
          >
            추억 만들기
          </button>
        </div>

        {/* 필터 & 검색 & 정렬 영역 */}
        <div className="memory-controls-memory">
          {/* 공개/비공개 필터 */}
          <div className="filter-buttons">
            <img
              src={isPublic === true ? publicActiveIcon : publicDefaultIcon}
              alt="공개 버튼"
              className="public-btn"
              onClick={() => handleFilterChange(true)}
            />
            <img
              src={isPublic === false ? privateActiveIcon : privateDefaultIcon}
              alt="비공개 버튼"
              className="private-btn"
              onClick={() => handleFilterChange(false)}
            />
          </div>

          {/* 검색창 */}
          <div className="search-bar-detail">
            <img src={search} alt="검색 아이콘" className="searchBarIMG" />
            <input
              type="text"
              placeholder="태그 혹은 제목을 입력해주세요"
              onChange={handleKeywordChange}
            />
          </div>

          {/* 정렬 드롭다운 */}
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDropdown}>
              {sortOptions.find((opt) => opt.value === sortBy)?.label || sortBy}
              <span>▼</span>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                {sortOptions.map((option, index) => (
                  <li key={index} onClick={() => handleSortOptionClick(option)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 추억 리스트 영역 */}
        <div className="memory-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div
                key={index}
                className="memory-item"
                onClick={
                  post.isPublic
                    ? () => navigate(`/posts/${post.id}`)
                    : () => navigate(`/privateMemory/${post.id}`)
                }
              >
                <div className="memory-content">
                  <div className="memory-meta">
                    {post.nickname} | {post.isPublic ? "공개" : "비공개"}
                  </div>
                  <div className="memory-title">{post.title}</div>
                  {post.isPublic && (
                    <div className="memory-image-container">
                      <img
                        src={post.imageUrl || defaultImg}
                        alt="Memory"
                        className="memory-img-home"
                      />
                    </div>
                  )}
                  <div className="memory-stats">
                    <img src={likeCountImg} alt="likes" />
                    <span>{post.likeCount}</span>
                    <img src={comment} alt="No Image" />
                    <span>{post.commentCount}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img
              src={noMemory}
              className="NoImage-groupDetail"
              alt="등록된 추억 없음"
            />
          )}
        </div>

        {/* 하단 더보기 버튼 */}
        <div className="memory-footer">
          <button
            className="load-more-btn"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            더보기
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <GroupEditModal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateGroup}
          currentData={{
            groupName: group.name,
            groupImg: group.imageUrl,
            groupIntro: group.introduction,
            isPublic: group.isPublic,
          }}
        />
      )}
      {isDeleteModalOpen && (
        <GroupDeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={deleteGroupAPI} // 삭제 요청 함수 전달
        />
      )}
    </div>
  );
}

export default Memory;

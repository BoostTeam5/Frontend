import React, { useEffect, useState, Button } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupEditModal from "./groupEditModal";
import GroupDeleteModal from "./groupDeleteModal";
import defaultImg from "../assets/family.png";
import line from "../assets/line.png";
import likeBtn from "../assets/likeBtn.png";
import addMemory from "../assets/addMemory.png";
import public_active from "../assets/public_active.png";
import public_default from "../assets/public_default.png";
import private_active from "../assets/private_active.png";
import private_default from "../assets/private_default.png";
import noMemory from "../assets/no_memory_alert.png";
import search from "../assets/search.png";
import comment from "../assets/comment-count.png";
import likeCountImg from "../assets/flower-like.png";
import "./groupEditModal.css";
import "./memory.css";
import MemoryApi from "../apis/memoryAPI";
import MakeNewMemory from "./makeNewMemory";

function Memory() {
  const { groupId } = useParams(); // URL에서 가져오는 함수
  const [group, setGroup] = useState(null); // 그룹 정보 상태

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("latest");
  const [keyword, setKeyword] = useState("");

  // 공개 비공개 그룹별 api에서 isPublic 속성에 따라서 데이터 분류하고 저장
  const [posts, setPosts] = useState([]);

  // 특정 그룹 정보 렌더링
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState();
  // 그룹의 정보 수정시 필요한 각각의 정보
  const [groupIntro, setGroupIntro] = useState("");
  const [isGroupOpen, setIsGroupOpen] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [badges, setBadges] = useState([]);
  const [postCount, setPostCount] = useState(0);
  // 공개 비공개 필터링
  const [isPublic, setIsPublic] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false); // 이거 필요없을듯 public으로 수정하기

  // 그룹 수정, 삭제
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 추억 만들기 버튼
  const [isMakeMemoryOpen, setIsMakeMemoryOpen] = useState(false);

  // 추억 개수
  const [countMemory, setCountMemory] = useState(3);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  // 추억 만들기 버튼
  const handleMakeMemory = () => {
    setIsMakeMemoryOpen(true);
  };

  // 추억 만들기 버튼 클릭시 추억 생성 페이지로 이동
  const navigate = useNavigate();
  const GoToMemory = () => {
    navigate(`/newMemory/${groupId}`);
  };

  // 공개 비공개 버튼 클릭 핸들러
  const handleToPublicActive = () => {
    setIsPublic(true);
  };
  const handleToPublicDefault = () => {
    setIsPublic(false);
  };
  const handleToPrivateActive = () => {
    setIsPrivate(true);
  };
  const handleToPrivateDefault = () => {
    setIsPrivate(false);
  };

  // 태그 혹은 제목으로 검색하기
  const handleSearch = () => {};

  /* useEffect로 데이터 불러오기기 */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await MemoryApi.readPost(
          groupId,
          page,
          pageSize,
          sortBy,
          keyword,
          isPublic
        );
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    if (groupId) {
      fetchPosts();
    }
  }, [groupId, page, pageSize, sortBy, keyword, isPublic]); // ✅ 값이 바뀌면 자동으로 실행

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

  const handleUpdateGroup = (updatedData) => {
    setGroupName(updatedData.groupName);
    setGroupImg(updatedData.groupImg || defaultImg);
    setGroupIntro(updatedData.groupIntro);
    setIsGroupOpen(updatedData.isPublic);
    setIsEditModalOpen(false); // 모달 닫기
  };

  const handleDeleteGroup = () => {
    {
      /* Delete Group API 호출하고 state 변경하고 다시 데이터로드 */
    }
  };

  useEffect(() => {
    console.log("Updated groupName:", groupName);
  }, [groupName]);

  return (
    <div className="groupDetail-container">
      {/* 상단 그룹 정보 */}
      <div className="clickedGroupInfo">
        {/* 왼쪽: 그룹 이미지 */}
        <div className="groupImageDesign">
          <img src={groupImg || defaultImg} alt="그룹 이미지" />
        </div>

        {/* 중앙: 그룹 정보 */}
        <div className="groupInfo-text">
          <div className="info1">
            <span>{"D+265"}</span>
            <span>{isGroupOpen ? "공개" : "비공개"}</span>
          </div>

          <div className="info2">
            <span>{groupName || "달봉이네 가족"}</span>
            <span>{postCount ? `추억 ${postCount}` : `추억 8`}</span>
            <span>|</span>
            <span>
              {likeCount ? `그룹 공감 ${likeCount}` : `그룹 공감 1.5K`}
            </span>
          </div>

          <div className="groupIntro">
            {groupIntro ||
              "서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다."}
          </div>

          {/* 획득 배지 */}
          <div className="badge-container">
            <span className="badge">🏅 7일 연속 게시글 등록</span>
            <span className="badge">🏆 그룹 공감 1만 개 이상 받기</span>
            <span className="badge">💖 추억 공감 1만 개 이상 받기</span>
          </div>
        </div>

        {/* 오른쪽: 버튼 컨테이너 */}
        <div className="button-container">
          <div className="textBtn">
            <button
              className="text-button"
              onClick={() => {
                {
                  setIsEditModalOpen(true);
                }
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
              onClick={() => alert("이미지 버튼 클릭!")}
            />
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="divider">
        <img src={line} alt="구분선" />
      </div>

      <div className="memory-container">
        {/* 제목 */}
        <div className="memory-header">
          <h2 className="memory-title">추억 목록</h2>
          <button
            className="add-memory-btn"
            onClick={() => navigate(`/newMemory/${groupId}`)}
          >
            추억 만들기
          </button>
        </div>

        {/* 필터 + 검색 */}
        <div className="memory-filter-container">
          <div className="filter-buttons">
            <img
              src={isPublic ? public_active : public_default}
              onClick={isPublic ? handleToPublicDefault : handleToPublicActive}
              alt="공개"
            />
            <img
              src={isPrivate ? private_active : private_default}
              onClick={
                isPrivate ? handleToPrivateDefault : handleToPrivateActive
              }
              alt="비공개"
            />
          </div>

          <div className="search-bar">
            <img src={search} alt="검색 아이콘" />
            <input type="text" placeholder="태그 혹은 제목을 입력해주세요" />
          </div>

          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDropdown}>
              공감순
              <span>▼</span>
            </button>

            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>최신순</li>
                <li>게시글 많은 순</li>
                <li>공감순</li>
                <li>획득 뱃지순</li>
              </ul>
            )}
          </div>
        </div>

        <div className="memory-list">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="memory-item">
                <div className="memory-content">
                  <div className="memory-meta">
                    {post.author} | {post.isPublic ? "공개" : "비공개"}
                  </div>
                  <div className="memory-title">{post.title}</div>
                  <div className="memory-stats">
                    <img src={likeCountImg} alt="likes" />{" "}
                    <span>{post.likes}</span>
                    <img src={comment} alt="comments" />{" "}
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img src={noMemory} />
          )}
        </div>
      </div>

      {/* <div className="memory-list">
        {countMemory !== 0 ? (
          <div className="memory-item">
            <div>
              <div>달봉이아들 | 비공개</div>
              <div>에델바이스 꽃말이 소중한 추억이래요</div>
              <div>
                <img src={likeCountImg}></img> <text>120</text>
                <img src={comment}></img> <text>8</text>
              </div>
            </div>
          </div>
        ) : (
          <img src={noMemory} />
        )}
      </div> */}

      {isEditModalOpen && (
        <GroupEditModal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateGroup}
          currentData={{ groupName, groupImg, groupIntro, isGroupOpen }}
        />
      )}
      {isDeleteModalOpen && (
        <GroupDeleteModal onClose={() => setIsDeleteModalOpen(false)} />
      )}

      {/*추억 개수에 따른 것*/}
    </div>
  );
}

export default Memory;

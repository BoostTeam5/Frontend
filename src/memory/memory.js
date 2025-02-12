import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import GroupEditModal from "./groupEditModal";
import GroupDeleteModal from "./groupDeleteModal";
import defaultImg from "../assets/family.png";
import line from "../assets/line.png";
import likeBtn from "../assets/likeBtn.png";
import addMemory from "../assets/addMemory.png";
import MakeNewMemory from "./makeNewMemory";
import "./groupEditModal.css";
import "./memory.css";

function Memory() {
  // 공개 비공개 그룹별 데이터 저장
  const [memoryOpenItems, setMemoryOpenItems] = useState();
  const [memoryClosedItems, setMemoryClosedItems] = useState();

  // 특정 그룹 정보 렌더링
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState();
  const [groupIntro, setGroupIntro] = useState("");
  const [isGroupOpen, setIsGroupOpen] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [badges, setBadges] = useState([]);
  const [postCount, setPostCount] = useState(0);

  // 그룹 수정, 삭제
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 추억 만들기 버튼
  const [isMakeMemoryOpen, setIsMakeMemoryOpen] = useState(false);

  // 추억 만들기 버튼
  const handleMakeMemory = () => {
    setIsMakeMemoryOpen(true);
  };

  const navigate = useNavigate();
  const GoToMemory = () => {
    navigate("/newMemory");
  };
  /* useEffect로 데이터 가져오기 */
  useEffect(() => {});

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

      <div className="memory">
        <p>추억 목록</p>
        <OpacityButton
          src={addMemory}
          onClick={() => {
            GoToMemory();
          }}
        />
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
      </div>
    </div>
  );
}

export default Memory;

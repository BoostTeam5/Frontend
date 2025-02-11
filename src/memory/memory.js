import React, { useEffect, useState, Button } from "react";
import defaultImg from "../assets/family.png";
import line from "../assets/line.png";
import likeBtn from "../assets/likeBtn.png";
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

  /* useEffect로 데이터 가져오기 */
  useEffect(() => {});

  return (
    <div className="groupDetail-container">
      <div className="clickedGroupInfo">
        {/* 그룹 이미지 */}
        <div className="groupImageDesign">
          <img src={groupImg || defaultImg} alt="그룹 이미지" />
        </div>

        {/* 그룹 정보 텍스트 */}
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
        </div>

        <div>
          <div>
            <button
              onClick={() => alert("버튼 클릭!")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              그룹 정보 수정하기
            </button>

            <button
              onClick={() => alert("버튼 클릭!")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              그룹 삭제하기
            </button>
          </div>

          <OpacityButton
            className="likeBtn"
            src={likeBtn}
            onClick={() => alert("버튼 클릭!")}
          />
        </div>
      </div>

      <div>
        <img src={line}></img>
      </div>
      <div className="memory">
        <p>TEST</p>
      </div>
    </div>
  );
}

export default Memory;

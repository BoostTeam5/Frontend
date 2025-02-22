// src/components/PrivateGroupCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/PrivateGroupCard.css";
import flowerLikeIcon from "../assets/flowerIcon.png";

const PrivateGroupCard = ({ group }) => {
  const navigate = useNavigate();

  // D+일 계산 함수 (createdAt으로부터 며칠 지났는지)
  const getDDay = (createdAt) => {
    if (!createdAt) return 0;
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const diff = currentDate - createdDate; // 밀리초 차이
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // 계산된 D+일
  const dDayValue = getDDay(group.createdAt);

  // 좋아요 수 1000단위 표기 함수
  const formatLikes = (likes) => {
    if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + "K";
    }
    return likes;
  };


  return (
    <div
      className="private-card"
      onClick={() => navigate(`/groups/private/access/${group.id}`)}
    >
      <div className="card-content-private">
        {/* 그룹 메타 정보 */}
        <div className="group-meta-private">
          <span className="d-day">D+{dDayValue}</span>
          <span className="separator">|</span>
          <span className="private-label">비공개</span>
        </div>

        {/* 그룹명 */}
        <h3 className="group-title-private">{group.name}</h3>

        {/* 추억 & 그룹 공감 텍스트 */}
        <div className="group-labels-private">
          <span className="label-text-private">추억</span>
          <span className="label-text-private">그룹 공감</span>
        </div>

        {/* 추억 & 그룹 공감 수치 및 아이콘 */}
        <div className="group-stats-private">
          <span className="stat-value-private">{group.postCount}</span>
          <div className="like-container-private">
            <img
              src={flowerLikeIcon}
              alt="공감 아이콘"
              className="flower-icon-private"
            />
            <span className="stat-value-private">
              {formatLikes(group.likeCount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateGroupCard;

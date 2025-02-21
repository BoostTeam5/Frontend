import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/PrivateGroupCard.css";
import flowerLikeIcon from "../assets/flowerIcon.png";

const PrivateGroupCard = ({ group }) => {
  const navigate = useNavigate();

  // ✅ 좋아요 수 1000단위 표기 함수
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
        {/* ✅ 그룹 메타 정보 */}
        <div className="group-meta-private">
          <span className="d-day">D+{group.dDay}</span>
          <span className="separator">|</span>
          <span className="private-label">비공개</span>
        </div>

        {/* ✅ 그룹명 */}
        <h3 className="group-title-private">{group.name}</h3>

        {/* ✅ 추억 & 그룹 공감 텍스트 수평 정렬 */}
        <div className="group-labels-private">
          <span className="label-text-private">추억</span>
          <span className="label-text-private">그룹 공감</span>
        </div>

        {/* ✅ 추억 & 그룹 공감 숫자 + 아이콘 수평 정렬 */}
        <div className="group-stats-private">
          <span className="stat-value-private">{group.posts}</span>
          <div className="like-container-private">
            <img
              src={flowerLikeIcon}
              alt="공감 아이콘"
              className="flower-icon-private"
            />
            <span className="stat-value-private">{formatLikes(group.likes)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateGroupCard;
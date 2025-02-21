import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/PublicGroupCard.css";
import flowerLikeIcon from "../assets/flowerIcon.png";
import contentImg from "../assets/contentImg.png"; // ✅ 335*335 이미지 추가

const PublicGroupCard = ({ group }) => {
  const navigate = useNavigate();

  // ✅ 좋아요 수 1000단위 표기 함수
  const formatLikes = (likes) => {
    if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + "K";
    }
    return likes;
  };
  const countVar = group.badges;

  return (
    <div
      className="public-card"
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      <div className="card-content">
        {/* ✅ 콘텐츠 이미지 */}
        <img
          src={group.imageUrl || contentImg}
          alt="콘텐츠 이미지"
          className="content-image"
        />

        {/* ✅ 그룹 메타 정보 */}
        <div className="group-meta">
          <span className="d-day">D+{group.dDay}</span>
          <span className="separator">|</span>
          <span className="public-label">공개</span>
        </div>

        {/* ✅ 그룹명 */}
        <h3 className="group-title">{group.name}</h3>

        {/* ✅ 그룹 설명 */}
        <p className="group-description">{group.description}</p>

        {/* ✅ 획득 배지, 추억, 그룹 공감 텍스트 */}
        <div className="group-labels">
          <span className="label-text">획득 배지</span>
          <span className="label-text">추억</span>
          <span className="label-text">그룹 공감</span>
        </div>

        {/* ✅ 획득 배지 개수, 추억 수, 그룹 공감 수치 + 아이콘 */}
        <div className="group-stats">
          <span className="badge-value">{group.badgeCount}</span>
          <span className="post-value">{group.postCount}</span>
          <div className="like-container-public">
            <img
              src={flowerLikeIcon}
              alt="공감 아이콘"
              className="flower-icon"
            />
            <span className="stat-value">{formatLikes(group.likeCount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicGroupCard;
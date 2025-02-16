import React, { useState } from "react";

// 그룹 데이터 예제 (스크린샷과 동일한 데이터 추가)
const groupsData = [
  {
    id: 1,
    name: "에델바이스",
    description: "서로 따뜻함을 공유하고 어쩌고...",
    imageUrl: "/images/edelweiss.jpg",
    dDay: 25,
    badges: 8,
    memories: 5,
    likes: 1500,
  },
  {
    id: 2,
    name: "에델바이스",
    description: "서로 따뜻함을 공유하고 어쩌고...",
    imageUrl: "",
    dDay: 25,
    badges: 8,
    memories: 5,
    likes: 1500,
  },
  {
    id: 3,
    name: "에델바이스",
    description: "서로 따뜻함을 공유하고 어쩌고...",
    imageUrl: "/images/edelweiss.jpg",
    dDay: 25,
    badges: 8,
    memories: 5,
    likes: 1500,
  },
  {
    id: 4,
    name: "에델바이스",
    description: "서로 따뜻함을 공유하고 어쩌고...",
    imageUrl: "",
    dDay: 25,
    badges: 8,
    memories: 5,
    likes: 1500,
  },
];

const PublicGroups = () => {
  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  
  // 정렬 옵션 상태 관리 (기본값: 최신순)
  const [sortOption, setSortOption] = useState("latest");

  // 검색어 필터링 적용
  const filteredGroups = groupsData.filter((group) =>
    group.name.includes(searchTerm)
  );

  // 정렬 옵션 적용
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return b.dDay - a.dDay; // 생성 후 지난 일수 기준 정렬 (최근 생성 우선)
      case "mostPosts":
        return b.memories - a.memories; // 게시글 개수 기준 정렬
      case "mostLikes":
        return b.likes - a.likes; // 공감 개수 기준 정렬
      case "mostBadges":
        return b.badges - a.badges; // 획득한 배지 개수 기준 정렬
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto p-4">
      {/* 헤더 부분: 제목 + 그룹 만들기 버튼 */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">공개 그룹 목록</h1>
        <button className="px-4 py-2 bg-black text-white rounded-md">그룹 만들기</button>
      </header>
      
      {/* 검색 및 정렬 기능 */}
      <div className="flex justify-between mb-4">
        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="그룹명을 검색하세요"
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* 정렬 옵션 선택 */}
        <select
          className="border p-2 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="mostPosts">게시글 많은 순</option>
          <option value="mostLikes">공감순</option>
          <option value="mostBadges">획득 배지순</option>
        </select>
      </div>
      
      {/* 그룹 목록 표시 */}
      <div className="grid grid-cols-4 gap-4">
        {sortedGroups.map((group) => (
          <div
            key={group.id}
            className="border rounded-lg p-4 shadow-sm"
            style={{ width: "375px", height: group.imageUrl ? "561px" : "206px" }}
          >
            {/* 그룹 대표 이미지 (있을 경우 표시) */}
            {group.imageUrl && (
              <img
                src={group.imageUrl}
                alt={group.name}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            
            {/* 그룹명 */}
            <h2 className="text-lg font-semibold mt-2">{group.name}</h2>
            
            {/* 그룹 설명 */}
            <p className="text-sm text-gray-500">{group.description}</p>
            
            {/* 그룹 정보 표시 (D-Day, 배지 개수, 추억 개수, 공감 개수) */}
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>D-{group.dDay}</span>
              <span>배지 {group.badges}개</span>
              <span>추억 {group.memories}개</span>
              <span>❤️ {group.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicGroups;
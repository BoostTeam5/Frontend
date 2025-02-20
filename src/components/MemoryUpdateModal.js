import Modal from "./Modal";
import InputField, { Input } from "./InputField";
import styled from "styled-components";
import { useEffect, useState } from "react";
import TagInput from "./TagInput";
import { updateMemory, verifyMemoryPassword } from "../memoryApi";
import dayjs from "dayjs";

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

function MemoryUpdateModal({ postId, memory, onUpdate, onClose }) {
  const [memoryValues, setMemoryValues] = useState(memory);
  const [memoryImage, setMemoryImage] = useState();
  const [tagInput, setTagInput] = useState(""); // 태그 input창 관리
  const [password, setPassword] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [tags, setTags] = useState([]); // 받아온 데이터의 태그 값 관리

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setMemoryValues((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value, // 파일 저장
      imageUrl: type === "file" ? files[0].name : prev.imageUrl, // 파일명 저장
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    //if (file) setMemoryImage(file.name); // 이미지 파일명 저장
    if (file) setMemoryImage(URL.createObjectURL(file));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput]);
      }
      setTagInput(""); // 입력창 초기화
    }
  };

  const removeTag = (tagIdx) => {
    setTags(tags.filter((_, idx) => idx !== tagIdx));
  };

  useEffect(() => {
    if (memoryValues?.post_tags?.length) {
      const extractedTags = memoryValues.post_tags.map(
        (pt) => pt.tags?.tagName || ""
      );
      if (tags.length === 0) {
        setTags(extractedTags);
      }
    }
  }, [memoryValues]);

  const formatTagsForUpdate = (tags) => {
    return tags.map((tagName) => ({ tags: { tagName } }));
  };

  // 추억 수정 요청 보내기
  const handleUpdate = async () => {
    if (!password) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    try {
      // 비밀번호가 계속 일치하지 않다고 함... 이유를 모르겠음
      //const checkPassword = await verifyMemoryPassword(postId, password);

      const updatedData = {
        postId: postId,
        ...memoryValues,
        postPassword: password,
        post_tags: formatTagsForUpdate(tags),
        tags: tags,
      };
      //const response = await updateMemory(postId, updatedData);
      const response = onUpdate(updatedData);
      setMemoryValues(response);
      setTags([...memoryValues.tags]);
      onClose();
    } catch (e) {
      console.error(e.response?.data?.message || "추억 수정 실패");
    }
  };

  /*
  const handleSubmit = () => {
    if (password !== memory.postPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력하세요.");
      setPassword("");
      return;
    }
    onSave({ ...memoryValues, postPassword: password });
    onClose();
  }; // onSubmit에 전달
  */

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleUpdate}
      modalTitle="추억 수정"
      buttonTitle="등록하기"
    >
      <div style={{ display: "flex", gap: "40px" }}>
        <LeftSection>
          <InputField
            name="nickname"
            type="text"
            value={memoryValues.nickname}
            label="닉네임"
            onChange={handleInputChange}
            placeholder="닉네임을 입력해 주세요"
          />
          <InputField
            name="title"
            type="text"
            value={memoryValues.title}
            label="제목"
            onChange={handleInputChange}
            placeholder="제목을 입력해 주세요"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Label>이미지</Label>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FileInput
                value={memoryValues.imageUrl || ""}
                placeholder="파일을 선택해 주세요"
                readOnly
              />
              <input
                name="imageUrl"
                type="file"
                id="file-upload"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <FileBtn htmlFor="file-upload">파일 선택</FileBtn>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Label>본문</Label>
            <ContentArea
              name="content"
              type="text"
              value={memoryValues.content}
              onChange={handleInputChange}
              placeholder="본문 내용을 입력해 주세요"
            />
          </div>
        </LeftSection>
        <Divider />
        <RightSection>
          <InputField
            name="location"
            type="text"
            value={memoryValues.location}
            label="장소"
            onChange={handleInputChange}
            placeholder="장소를 입력해 주세요"
          />
          <TagInput
            name="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            tags={tags}
            removeTag={removeTag}
          />
          <InputField
            name="moment"
            type="date"
            value={formatDate(memoryValues.moment)}
            label="추억의 순간"
            onChange={handleInputChange}
            placeholder="추억의 순간을 입력해 주세요 (ex. YYYY-MM-DD)"
          />
          <div
            style={{
              display: "flex",
              flexDirection: " column",
              marginBottom: "30px",
              gap: "8px",
            }}
          >
            <Label>추억 공개 선택</Label>
            <ToggleContainer>
              <span style={{ fontSize: "14px" }}>공개</span>
              <Switch>
                <HiddenCheckbox
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
                {isPublic ? <CheckedSlider /> : <Slider />}
                <span />
              </Switch>
            </ToggleContainer>
          </div>
          <InputField
            name="postpassword"
            type="password"
            value={password}
            label="수정 권한 인증"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />
        </RightSection>
      </div>
    </Modal>
  );
}

export default MemoryUpdateModal;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 1px;
  background: #ddd;
  margin: 0 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const FileInput = styled(Input)`
  width: 260px;
  text-align: left;
`;

const FileBtn = styled.label`
  cursor: pointer;
  border: 2px solid #282828;
  border-radius: 5px;
  width: 100px;
  text-align: center;
  height: 40px;
  margin-bottom: 20px;
  line-height: 40px;
  font-size: 14px;
`;

const ContentArea = styled.textarea`
  width: 370px;
  height: 100px;
  padding: 15px 14px;
  margin-bottom: 30px;
  font-size: 12px;
  border: 2px solid #dddddd;
  border-radius: 5px;
  resize: none;
  overflow-y: auto;

  &:focus {
    border-color: #282828;
  }

  &::placeholder {
    color: #b8b8b8;
  }

  // 스크롤바 스타일
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 5px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

const HiddenCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;

  &::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 2px;
    bottom: 1px;
    background-color: white;
    transition: 0.4s;
    border: 2px solid #282828;
    border-radius: 50%;
  }
`;

const CheckedSlider = styled(Slider)`
  background-color: #282828;

  &::before {
    transform: translateX(29px);
  }
`;

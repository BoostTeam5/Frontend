import Modal from "./Modal";
import InputField, { Input } from "./InputField";
import styled from "styled-components";
import { useEffect, useState } from "react";
import TagInput from "./TagInput";

function MemoryUpdateModal({ onClose, initialValues }) {
  const [values, setValues] = useState(initialValues);
  const [memoryImage, setMemoryImage] = useState();
  const [tags, setTags] = useState(values.tags); // tags 데이터 관리
  const [tagInput, setTagInput] = useState(""); // 태그 input창 관리
  const [passwordInput, setPasswordInput] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setMemoryImage(file.name); // 이미지 파일명 저장
    //if (file) setMemoryImage(URL.createObjectURL(file));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags((prevTags) => [...prevTags, tagInput]);
      }
      setTagInput(""); // 입력창 초기화
    }
  };

  const removeTag = (tagIdx) => {
    setTags((prevTags) => prevTags.filter((_, idx) => idx !== tagIdx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.postPassword === passwordInput) {
      const formData = new FormData();
      formData.append("nickname", values.nickname);
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("imgFile", values.imageUrl);
      formData.append("location", values.location);
      formData.append("tags", JSON.stringify(tags));
      formData.append("moment", values.moment);

      console.log("폼 제출 완료", formData.get("nickname"));
      //setValues(INITIAL_VALUES);
      setTags([]);
      onClose();
    } else {
      console.log("비밀번호가 틀렸습니다. 다시 입력하세요");
      setPasswordInput("");
    }
  };

  useEffect(() => {
    console.log("updated nickname: ", values.nickname);
  }, [values.nickname]);

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleSubmit}
      modalTitle="추억 수정"
      buttonTitle="등록하기"
    >
      <div style={{ display: "flex", gap: "40px" }}>
        <LeftSection>
          <InputField
            name="nickname"
            type="text"
            value={values.nickname}
            label="닉네임"
            onChange={handleInputChange}
            placeholder="닉네임을 입력해 주세요"
          />
          <InputField
            name="title"
            type="text"
            value={values.title}
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
              }}
            >
              <FileInput
                value={memoryImage ? memoryImage : ""}
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
              value={values.content}
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
            value={values.location}
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
            value={values.moment}
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
            value={passwordInput}
            label="수정 권한 인증"
            onChange={(e) => setPasswordInput(e.target.value)}
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
`;

const FileBtn = styled.label`
  cursor: pointer;
  border: 2px solid #282828;
  border-radius: 5px;
  width: 100px;
  text-align: center;
  height: 40px;
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

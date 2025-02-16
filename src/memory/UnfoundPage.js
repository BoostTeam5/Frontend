import styled from "styled-components";
import unfoundImg from "../assets/404.png";

function UnfoundPage() {
  return (
    <Container>
      <img
        src={unfoundImg}
        alt="찾을 수 없는 페이지"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Container>
  );
}

export default UnfoundPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
`;

import styled, { css } from "styled-components";

// 0. styled-components 설치하기 (library)
// npm install styled-components (설치되었는지 확인 - package.json)

// CSS in JS 란?
// 이 문구가 뜻하는 그대로, 이 기술은 JS안에 CSS를 작성하는 것

// styled-components란?
// CSS 문법을 그대로 사용하면서 결과물을 스타일링된 컴포넌트 형태로 만들어주는 라이브러리
// 컴포넌트 개념을 사용하기 때문에 리액트와 궁합이 잘 맞음
// 백틱을 사용하여 구성 요소의 스타일을 지정
// (VS code 확장 프로그램 : vs code styled-components 설치)

// 1. 기본적인 사용법
// 스타일링된 컴포넌트 형태로 반환됨
const Wrapper = styled.div`
  padding: 1rem;
  background: lightblue;


  /* 6. 반응형 디자인:
  - 일반 CSS를 사용할 때와 똑같이 media 쿼리를 사용 가능
  - 리액트스럽게 반응형 만드는 라이브러리: React-responsive 사용 가능*/
  /* 기본적으로 가로 크기를 1024px에 가운데 정렬을 하고
  가로 크기가 작아짐에 따라 크기를 줄이고, 768px 미만이 되면 꽉 채우기 */
  width: 1024px;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    width: 768px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;

// 2. props 사용하기
// 컴포넌트 형태라 props 사용이 가능
const Button = styled.button`
  width: ${props => props.width || '100px'}; // 기본값 설정
  height: ${props => props.height || '40px'}; // 기본값 설정
  color: ${props => props.dark ? 'white' : 'black'};
  background: ${props => props.dark ? 'black' : 'white'};
  border: 2px solid lightgray;
  cursor: pointer;

  /* 3. & 문자를 사용하여 Sass처럼 자기 자신 선택 가능 */
  /* & = Button. 자기 자신 가르킴 */
  &:hover {
    background: lightpink;
  }


  /* 4. 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우 css를 불러와 사용 */
  ${props =>
    props.inverted &&
    css`
    background: white;
    /* color: gray; */
    border: 2px solid white;
    &:hover {
      background: #1f1f1f;
      color: white;
    }
    `}

  /* & + & { */
  & + button {
    margin-left: 1rem;
  }
`;


// 5. 스타일 확장(커스텀) 하기
const RoundedButton = styled(Button)`
  border-radius: 16px;
`


function StyledPage() {
  return (
    <>
      <Wrapper>
        <Title>
          Hi, React🤗<br />
          Hi, Javascript🥰<br />
          Hi, Python Turtle🐢<br />
        </Title>
      </Wrapper>

      <Button width="200px" height="60px">Normal</Button>

      <Button dark>Dark</Button>

      <Button inverted>Inverted</Button>

      <RoundedButton>Rounded</RoundedButton>

      <button>일반 버튼 태그</button>
    </>
  );
}

export default StyledPage;
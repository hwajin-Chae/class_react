import { createGlobalStyle } from "styled-components";
import { Button, Navbar, Container, Nav } from "react-bootstrap";

// bootstrap : 레이아웃을 복사, 붙여넣기 식으로 편하게 개발 가능한 css, js 라이브러리
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Pages/Header";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
// bootstrap CSS 추가

const GlobalStyle = createGlobalStyle`
/* 글로벌(공통) 스타일 정의 */
  body {
    box-sizing: border-box;
  }
  #root {
    text-align: center;
  }
  * {
    box-sizing: inherit;
  }
  .cursor-pointer {
    cursor: pointer;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* 부트스트랩 연습 */}
      {/* <Button variant="primary">Primary</Button> */}

      {/* 헤더 영역: 상단 내비게이션 바 */}
      {/* Quiz. Header 컴포넌트 추출 및 Outlet 활용하여 라우팅 구성해보기 */}
      <Routes>
        <Route path="/" element={<Header />}>
          {/* index: index route(여기서는 defalut child route) */}
          <Route index element={<Main />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;

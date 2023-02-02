import { useCallback, useEffect, useRef, useState } from "react";
import { createGlobalStyle } from "styled-components";
// import { Reset } from "styled-reset";
import reset from "styled-reset";
import { v4 as uuidv4 } from 'uuid';

import TodoInsert from "./Components/TodoInsert";
import TodoList from "./Components/TodoList";
import TodoTemplate from "./Components/TodoTemplate";

// 글로벌(공통) 스타일 적용 index.css에서 해도 무방하지만
// styled-components를 사용해서 적용하고 싶다면...?!
// createGlobalStyle을 사용하면 컴포넌트가 만들어지고 이를 렌더링하면 됨

const GlobalStyle = createGlobalStyle`
  /* reset css 적용 */
  ${reset}

  /* 글로벌(공통) 스타일 */
  body {
    background: #e9ecef;
  }
`;

function App() {

  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   text: '리액트 공부하기',
    //   checked: true
    // },
    // {
    //   id: 2,
    //   text: '자바스크립트 우주 게임 만들기🚀',
    //   checked: true
    // },
    // {
    //   id: 3,
    //   text: '자바스크립트 공룡 게임 만들기🦕',
    //   checked: false
    // }
  ]);


  // 로컬 스토리지에서 가져오기 (d/t 새로고침 시 할일 적어놓은 것 날아가서)
  // 활용 예: 장바구니, 아이디 기억하기 등 ... db는 아니지만 활용할 수 있음
  useEffect(() => {
    const dbTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(dbTodos);
  }, []);



  // todos 배열에 새 객체를 추가하기 위한 handleInsert() 함수 정의
  // 새 객체를 만들 때마다 id 값에 1씩 더해주어야 하는데, useRef()를 사용하여 변수 생성
  // useState -> 데이터 변경 시 재렌더링 / useRef ->
  // id 값은 렌더링되는 정보가 아니기 때문에 Ref 사용
  // 단순히 새로운 항목을 만들 때 참조가 되는 값이기 때문

  const nextId = useRef(4);

  // props로 전달해야 할 함수를 만들 때(=useCallback 사용)는 userCallback()을 사용해본다
  // useCallback() 미사용 시 컴포넌트가 재렌더링 될 때마다 새롭게 정의됨
  // => props로 넘겨지는 값이 바뀌므로 자식 컴포넌트가 재렌더링
  const handleInsert = useCallback((text) => {
    const todo = {
      id: uuidv4(),
      text,  // text: text,
      checked: false
    };

    // 방법1 - 이전 방법
    // const copyTodos = [...todos];
    // copyTodos.push(todo);
    // setTodos(copyTodos);

    // 방법2 - 배열의 내장 함수 이용
    setTodos(todos.concat(todo));  // 새로운 배열 반환함, concat으로 배열 이어붙임

      nextId.current += 1; // nextId에 1씩 더하기

      localStorage.setItem('todos', JSON.stringify(todos.concat(todo)));
    }, [todos]);


  // todos 배열에서 id로 항목을 지우기 위한 handleRemove() 함수 정의
  // 불변성을 지키면서 배열의 요소를 제거해야 할 때 filter() 활용
  const handleRemove = useCallback((id) => {
    // 방법1 - 이전 방법
    // const copyTodos = [...todos];

    // const targetIndex = todos.findIndex((todo) => todo.id === id);
    // copyTodos.splice(targetIndex, 1);
    // setTodos(copyTodos);

    // 방법2 - 배열의 내장 함수 이용
    // filter('테스트 함수'): 기존의 배열은 변경하지 않고 특정 조건을 만족하는 요소들만 따로 추출하여 새로운 배열을 만듦
    // 테스트 함수에서는 true 또는 false를 반환해야 하며, 여기서 true를 반환하는 경우만 새로운 배열에 포함됨
    setTodos(todos.filter((todo) => todo.id !== id ));
    
    // 로컬 스토리지 저장
      localStorage.setItem('todos', JSON.stringify(todos.filter((todo) => todo.id !== id )));

    }, [todos]);

  

  // todos 배열의 특정 요소를 수정하기 위한 handleToggle() 함수 정의
  // 불변성을 유지하면서 배열의 특정 요소를 업데이트 해야할 때 map() 활용
  const handleToggle = useCallback((id) => {
    
    // 방법1 - 이전 방법
    // const copyTodos = [...todos];
    // const target = todos.find((todo) => todo.id === id);
    // target.checked = !target.checked;

    // const targetIndex = todos.findIndex((todo) => todo.id === id);
    // copyTodos[targetIndex] = target;
    // setTodos(copyTodos);

    // 방법2- 배열의 내장 함수 이용
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    ));
    
  // 로컬 스토리지에 저장
      localStorage.setItem('todos', JSON.stringify(todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo)));

    }, [todos]);



  return (
    <>
      {/* <Reset /> */}
      <GlobalStyle />
      <TodoTemplate>
        <TodoInsert onInsert={handleInsert} />
        <TodoList todos = {todos} onRemove={handleRemove} onToggle={handleToggle}/>
      </TodoTemplate>
    </>
  );
}

export default App;


// 패키지 설치
// npm install styled-components styled-reset react-icons

// react-icons: 리액트에서 다양한 아이콘을 쓸 수 있는 라이브러리
// SVG 형태의 아이콘을 리액트 컴포넌트처럼 쉽게 사용
// 커스텀은 props 또는 CSS 스타일로 변경 가능



// HTML 웹 스토리지란?
// 웹 스토리지를 사용하면 웹 앱이 사용자의 브라우저 내에 로컬로 데이터를 저장할 수 있음
// 웹 스토리지는 도메인 당 사용 가능
// 같은 도메인의 모든 페이지는 동일한 데이터를 저장하고 액세스함

// 웹 스토리지 객체
// 웹 스토리지는 데이터를 저장하기 위한 두 가지 객체를 제공
// window.localStorage - 만료 날짜 없이 ㅔ데이터를 저장
// window.sessionStorage - 한 세션에 대한 데이터 저장(브라우저 탭을 닫으면 데이터가 손실됨)

// npm install uuid --> 난수값을 발생시키는 프로그램
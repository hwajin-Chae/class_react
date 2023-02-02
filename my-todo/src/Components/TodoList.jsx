import styled from "styled-components";
import TodoListItem from "./TodoListItem";

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow: auto;
`;

// todos 배열을 props로 받아와서 map() 함수를 사용하여 여러개의 TodoListItem 컴포넌트로 변환해 보여줌
function TodoList({ todos, onRemove, onToggle }) {  // 구조 분해 할당: 어떤 형식으로 쓰든 개발자 취향
  return (
    <TodoListWrapper>
      {/* <TodoListItem />
      <TodoListItem />
      <TodoListItem /> */}

      {/* map() 함수를 이용하여 TodoListItem으로 이루어진 배열로 변환하여 렌더링 */}
      {/* map 사용하려면 -> key 값이 필요. id를 붙여줬으니까 todo.id 활용 */}
      {todos.map((todo) =>
        <TodoListItem key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} />)}
    </TodoListWrapper>
  );
}

export default TodoList;

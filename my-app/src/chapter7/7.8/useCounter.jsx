// useCounter() 커스텀 훅
// initialValue라는 초기 카운트 값을 받아서 count 라는 이름의 state 생성 시 초기값으로 제공
// 카운트 증가 및 감소를 편리하게 할 수 있도록 함수를 제공하는 훅

import { useState } from "react";

// 어떤 함수 컴포넌트에서든지 카운트 기능을 쉽게 사용
function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  const increaseCount = () => {
    setCount((count) => count + 1);
    //  (count + 1); 만 써도 되긴 하나, 위와 같은 콜백 형태로 넣어줘야 작은 에러도 나지 않음.
    // 중괄호 생략도 가능
  };

  const decreaseCount = () => {
    setCount((count) => Math.max(count - 1, 0));
    // 0에서 멈추고 싶으면... Math.max.
    // 두번째에 0을 써주면, 아무리 첫번째에서 음수가 나와도 0 밑으로 떨어지지 않음
  };

  return [count, increaseCount, decreaseCount];
}

export default useCounter;
// 사람을 수용하는 시설에서 사용한다고 가정
// useCounter() 훅을 사용하여 카운트를 관리하는 컴포넌트

import { useEffect } from "react";
import { useState } from "react";
import useCounter from "./useCounter";

// 최대 카운트 수. 최대로 수용할 수 있는 상수를 지정, 대소문자 상관 x
const MAX_CAPACITY = 10;

function Accommodate() {
  const [isFull, setIsFull] = useState(false);
  const [count, increaseCount, decreaseCount] = useCounter(0); // 초기 0부터 카운트 시작

  // useEffect() 작동 방식을 확인하기 위해 일부러 두 개의 훅을 사용
  // 1) 의존성 배열이 없는 경우
  // 컴포넌트가 마운트 된 직후에 호출되고, 이후 컴포넌트가 업데이트 될 때마다 호출
  useEffect(() => {
    console.log('================');
    console.log('useEffect() is called.');
    console.log(`isFull: ${isFull}`);
  });

  // 2) 의존성 배열이 있는 경우
  // 컴포넌트가 마운트 된 직후에 호출되고, 이후 count 값이 바뀔때마다 호출
  useEffect(() => {
    // 카운트 개수가 최대 용량에 도달하면 경고 문구가 표시되며, 더 이상 입장이 불가
    setIsFull(count >= MAX_CAPACITY);  // -> true가 되면, setIsFull에 전달
    console.log(`Current count value: ${count}`);
  }, [count]);

  return (
    <div style={{ padding: 16 }}>
      {/* ㄴ> key: value 로 작성해야함 */}
      
      <p>{`총 ${count}명 수용했습니다.`}</p>

      <button onClick={increaseCount} disabled={isFull}>입장</button>
      {/* isFull 이 true 일 때 -> disabled 시킴 */}
      <button onClick={decreaseCount} disabled={count === 0}>퇴장</button>

      {isFull && <p style={{ color: 'red' }}>정원이 가득 찼습니다.🙁</p>}
      {!isFull && <p style={{ color: 'blue' }}>입장이 가능합니다.😉</p>}
      {count === 0 && <p style={{ color: 'yellowgreen'}}>퇴장할 사람이 없습니다.🤗</p>}
    
    </div>
  );
}

export default Accommodate;
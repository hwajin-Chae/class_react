import { useState } from "react";

function SetStateMerge(props) {
  const [result, setResult] = useState(2);

  const handleAdd = () => {
    console.log('handleAdd Start');
    // setResult(result + 5);
    setResult(result => result + 5);
    console.log('handleAdd end');
  };
  const handleSub = () => {
    console.log('handleSub Start');
    // setResult(result - 3);
    setResult(result => result - 3);
    console.log('handleSub end');
  };
  const handleMul = () => {
    console.log('handleMul Start');
    // setResult(result * 2);
    setResult(result => result * 2);
    console.log('handleMul end');
  };
  const handleDiv = () => {
    console.log('handleDiv Start');
    // setResult(result / 2);
    setResult(result => result / 2);
    console.log('handleDiv end');
  };
  const handleMixCalc = () => {
    handleAdd();
    handleMul();
  };
  // setState()(= set 함수)는 비동기로 처리함
  // 그래서 하나의 state를 동시에 여기저기서 수정하려고 할 때 문제가 발생
  // 위 문제 해결 방법: setState()안에 그냥 인자값만 넣는 게 아니라 콜백 함수를 넘어줘야함

  return (
    <div>
      <p>계산 결과: {result}</p>
      <button onClick={handleAdd}>+ 5</button>
      <button onClick={handleSub}>- 3</button>
      <button onClick={handleMul}>* 2</button>
      <button onClick={handleDiv}>/ 2</button>
      <button onClick={handleMixCalc}>MixCalc</button>
    </div>
  );
};

export default SetStateMerge;
import { useEffect } from "react";
import { useState } from "react";

function EffectSummary(props) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');


  // useEffet()는 공통으로 마운트 시에는 무조건 실행됨

  // 렌더링 될때마다 매번 실행됨 (의존성 배열 X)
  useEffect(() => {
    console.log('나는 매번 실행됨:>');
  });
  
  // count가 변할때마다 실행됨 (의존성 배열 O)
  useEffect(() => {
    console.log('%ccount가 변함:)', 'color: dodgerblue;, background: #fff;');
  }, [count]);

  // name이 변할때마다 실행됨 (의존성 배열 O)
  useEffect(() => {
    console.log('%cname이 변함:D', 'color: orange;, background: #fff;');
  }, [name]);

  // (빈 배열) 마운트 될때만 실행됨
  // 의존하는 애(?)가 없어서 처음 한 번만 실행된 후, 이후엔 실행되지 않음
  useEffect(() => {
    console.log('%c마운트 될 때만 실행:/', 'color: yellowgreen;, background: #fff;');

    return () => {
      console.log('%c언마운트 될 때만 실행:/', 'color: red;, background: #fff;');
    }
  }, []);


  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>카운트 +1</button>
      <p>이름: {name}</p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

export default EffectSummary;
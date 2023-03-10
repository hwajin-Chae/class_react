import { useState } from "react";

function NameForm() {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    // e.target.value: 해당 타켓(<input>)에 입력된 값
    setValue(e.target.value);
    // 입력값이 state를 통해 관리되는 이런 방식을 제어 컴포넌트라 부름
    // input에 이름이 입력되면, 개발자도구-value...


    // 만약 사용자가 입력한 모든 알파벳을 대문자로 변경시켜서 관리하고 싶다면..?
    // setValue(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    alert('입력한 이름: ' + value);
    // 제출 -> 새로고침 : Submit의 기본 기능임
    e.preventDefault(); // 해당 event의 기본 동작을 막음. 여기서는 submit 이벤트의 기본 동작은 새로고침
    // ㄴ> 이거 쓰면 새로고침 안됨:>  Defalut(submit default->reload)를 prevent
  };


  return (
    // 여기서는 기존 HTML 방식과 차이를 보이기위해 form 태그를 그대로 사용
    // <button type="button" onClick={handleSubmit}>제출<button/> 이렇게 쓰는 게 일반적임
    <form onSubmit={handleSubmit}>
      <label>
        이름:
        {/* state에서 값을 가져다 넣어줌으로 항상 state에 들어있는 값이 input에 표시됨 */}
        <input type="text" value={value} onChange={handleChange}/>
      </label>
      <button type="submit">제출</button>
    </form>
  );
}

export default NameForm;
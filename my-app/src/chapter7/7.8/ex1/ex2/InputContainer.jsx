import { useState } from "react";
import useInput from "./useInput";

function InputContainer() {
  const [inputValue, handleChange, reset] = useInput('');

  // 데이터를 서버에 보내기 전 작업은 컴포넌트마다 다를 수 있기 때문에


  const handleSubmit = () => {
      alert(inputValue);
      // setInputValue('');
      reset();
    };

    // reset ---> input 안에 입력된 게 있으면 다시 리셋 시키는 역할


  return (  
    <div>
      <h1>입력 양식</h1>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>확인</button>
    </div>
  );
}

export default InputContainer;
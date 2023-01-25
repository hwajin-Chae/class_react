import { useState } from "react";
import EffectSummary from "./EffectSummary";

function EffectContainer(props) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(true)}>나타나라</button>
      <button onClick={() => setIsVisible(false)}>사라져라</button>
      {/* 사라져라 누르면 EffectSummary에서 언마운트 실행됨 */}
      {isVisible && <EffectSummary/>}
    </div>
  );
}

export default EffectContainer;
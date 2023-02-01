// 하위 엘리먼트를 감싸서 카드 형태로 보여주는 컴포넌트

function Card(props) {
  const { title, backgroundColor, children } = props;

  return (
    <div
      style={{
        margin: 8,
        padding: 8,
        borderRadius: 8,
        boxShadow: "0px 0px 4px gray",
        backgroundColor: backgroundColor || "lightgray"  // short-circuit
        // backgroundColor에 falsy 값이 들어오면 기본값으로 lightgray를 사용하겠다는 뜻
      }}
    >
      {title &&
        <h1 style={{ color: "blue", borderBottom: "1px solid white" }}>{title}</h1>
      }
      {children &&
        <p style={{ color: "white" }}>{children}</p>
      }
    </div>
  );
}

export default Card;
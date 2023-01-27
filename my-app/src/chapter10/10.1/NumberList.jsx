function NumberList(props) {
  const { numbers } = props;
  // 중괄호 : 객체의 구조분해 할당

  const listItem = numbers.map((number, index) => {
    return <li key={index}>{number}</li>;
    // key={index} 그대로 임의로 주는 것 지양해야함
  });
  // map() 함수 결과
  // [
  //   <li>1</li>,
  //   <li>2</li>,
  //   <li>3</li>,
  //   <li>4</li>,
  //   <li>5</li>
  // ]

  return (
    <ul>{listItem}</ul>
  );
}

export default NumberList;
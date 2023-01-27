const students = [
  {
    id: 'a1',
    name: '김재현',
  },
  {
    id: 'a2',
    name: '이그린',
  },
  {
    id: 'a3',
    name: '최그린',
  },
  {
    id: 'a4',
    name: '박그린',
  },
];

// Quiz: 배열의 각 요소를 렌더링하고 배열 렌더링 시 key 값 추가해보기, key 값은 id 속성을 추가
// 출석부에 이름 출력하기
function AttendanceBook() {
  return (
    <ul>
      {students.map((student) => {
        return <li key={student.id}>{student.name}</li>
      })}
    </ul>
  );
}

export default AttendanceBook;
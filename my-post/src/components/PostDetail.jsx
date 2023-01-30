function PostDetail(props) {

  const { posts, setPosts, currentIndex } = props;

  return (
    <div>
      <h4>제목: {posts[currentIndex]}</h4>
      <p>날짜: 2023년 1월 20일</p>
      <p>작성자: hj.chae</p>
      <p>상세내용</p>

      {/* 간단한 포스트 수정하기 */}
      <button type="button"
        onClick={() => {
          // 배열이나 객체의 state를 변경하는 법
          // 새로운 배열 또는 객체를 만들어 set 함수에 넣어줘야함
          const copyPosts = [...posts]; // 배열의 복사본(새로운 배열)
          copyPosts[currentIndex] = `${copyPosts[currentIndex]} - 수정`;
          setPosts(copyPosts);
        }}
      >
        수정하기
      </button>
    </div>
  );
}

export default PostDetail;
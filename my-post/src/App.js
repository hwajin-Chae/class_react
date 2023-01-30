import { useState } from 'react';
import './App.css';
import PostDetail from './components/PostDetail';

function App() {
  // 서버에서 데이터를 가져왔다고 가정

  const [posts, setPosts] = useState(['리액트 잘 쓰려면?', 'JS 핵심 문법', '스타일링 가이드']);


  const [showPostDetail, setShowPostDetail] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [likeCount, setLikeCount] = useState([0, 0, 0]);


  return (
    <>
      {/* 상단 헤더 만들기 */}
      <header className='header--dark'>
        <h4>Chae post</h4>
        <nav>
          <ul>
            <li>트렌딩</li>
            <li>최신</li>
          </ul>
        </nav>
      </header>

      <div className='inner'>
        

        {/* 포스트 목록 */}
        {/* <div className='list'>
              <h4>{posts}</h4>
              <p>2023년 1월 20일</p>
              <p>by hj.chae</p>
            </div>
        <div className='list'>
          <h4>{posts[1]}</h4>
          <p>2023년 1월 2일</p>
          <p>by sw.kim</p>
        </div>
        <div className='list'>
          <h4>{posts[2]}</h4>
          <p>2021년 12월 20일</p>
          <p>by goni.kim</p>
        </div> */}
        
      {/* Quiz: map()을 이용하여 posts 반복 출력하기 */}
      {posts.map((post, index) => {
          return (
            <div key={index} className="list"
              onClick={() => {
                setShowPostDetail(true);
                setCurrentIndex(index);
              }}
              >
              <h4>{post}</h4>
              <p>2023년 1월 20일</p>
              <p>by hj.chae</p>

              <hr />

              <span onClick={() => {
                const copyLikeCount = [...likeCount];
                const result = copyLikeCount[1]++;
                setLikeCount(result);
              }}
              >💙 {likeCount[index]}</span>
            </div>
          );
        })}


      {/* 포스트 상세보기 조건부 렌더링 */}
      {/* { showPostDetail ? <PostDetail /> : null } */}
      { showPostDetail && <PostDetail posts={posts} setPosts={setPosts}
      currentIndex={currentIndex} /> }

      </div>



      
    </>
  );
}

export default App;

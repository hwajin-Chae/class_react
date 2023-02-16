import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
// Dispatch -> 스토어에 데이터 보냄 / Selector -> 스토어에서 데이터 가져옴

// 리액트(JS)에서 이미지 파일 import 하는법
import yonexImg from "../images/yonex.jpg";

// 서버에서 받아온 데이터라고 가정
import data from "../data.json";
import { getAllProducts,
  getMoreProducts,
  getMoreProductsAsync,
  selectProductList,
  selectStatus } from "../features/product/productSlice";
import ProductListItem from '../components/ProductListItem';
import { getProducts } from '../api/productAPI';
import LatestView from '../components/LatestView';

const MainBackground = styled.div`
  height: 500px;
  background-image: url(${yonexImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function Main(props) {
  
  const dispatch = useDispatch();

  const productList = useSelector(selectProductList);
  // data.json

  // API 요청 상태 가져오기(로딩 상태)
  // 로딩 만들기 추천 라이브러리: React-spinners, Lottie Files
  const status = useSelector(selectStatus);


  // 처음 마운트 됐을 때 서버에 상품 목록 데이터를 요청하고
  // 그 결과를 리덕스 스토어에 저장

  useEffect(() => {
    // 서버에 데이터를 요청했다고 가정
    // ... api call... (api 요청하는 코드들)
    dispatch(getAllProducts(data));
  }, []);


  const handleGetMoreProducts = async () => {
    const result = await getProducts();
    if (!result) return;

    // 스토어에 dispatch로 요청 보내기
    dispatch(getMoreProducts(result));
  };


  return (
    <>
      {/* 메인 이미지 섹션 */}
      <section>
        <MainBackground />
      </section>
    
      {/* 상품 목록 섹션 */}
      <section>
        <Container>
          <Row>
            {/* <Col md={4}>
              <img src="https://www.yonexmall.com/shop/data/goods/1645767865278s0.png" width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col>
            <Col md={4}>
              <img src="https://www.yonexmall.com/shop/data/goods/1659329583483s0.png" width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col>
            <Col md={4}>
              <img src="https://www.yonexmall.com/shop/data/goods/1667190100104s0.png" width="80%" />
              <h4>상품명</h4>
              <p>상품가격</p>
            </Col> */}
            {/* <ProductListItem />
            <ProductListItem />
            <ProductListItem /> */}

            {/* 배열을 map 돌려야함 */}
            {productList.map((product) =>
                <ProductListItem key={product.id} product={product} />
            )}

            {/* Quiz 1: 반복적인 상품 목록 아이템 productListItem 컴포넌트화 시키기 */}
            {/* Quiz 2: 전역 스토어에서 가져온 productList 배열을 반복하며 ProductListItem 렌더링 */}
            {/* Quiz 3: 상품 정보를 props를 넘겨서 데이터 바인딩 */}
          </Row>
        </Container>

        {/* 상품 더보기 */}
        <Button variant="secondary" className="mb-4"
          onClick={() => {
            axios.get('http://localhost:4000/products')
              .then((response) => {
                console.log(response.data);
                // 스토어에 dispatch로 요청 보내기
                dispatch(getMoreProducts(response.data));
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          더보기
        </Button>


        {/* 위 HTTP 요청 코드를 함수로 만들어서 api 폴더로 추출하고 async/await로 바꾸기 */}
        <Button variant="secondary" className="mb-4" onClick={handleGetMoreProducts}>
          더보기
        </Button>

        {/* thunk (리덕스 라이브러리) 를 이용한 비동기 작업 처리하기 */}
        <Button variant="secondary" className="mb-4"
          onClick={() => dispatch(getMoreProductsAsync())}
        >
          더보기 {status}
        </Button>
      </section>

      <LatestView />
    </>
  );
}

export default Main;

// json-server
// 실무와 비슷한 느낌으로 하기 위해 가짜 API 서버를 만듦
// json 파일 하나만 있으면 연습용 서버를 쉽게 구성 가능
// npx json-server ./src/data2.json --port 4000
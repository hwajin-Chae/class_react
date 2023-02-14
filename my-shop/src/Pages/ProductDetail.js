import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductById, selectSelectedProduct } from "../features/product/productSlice";

// ... api call ...  에서 옴. 서버에서 받아온 데이터라고 가정
import data from "../data.json";
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';



// 스타일드 컴포넌트를 이용한 애니메이션 속성 적용
const highlight = keyframes`
  from { background-color: #cff4fc; }  // 0%
  50% { background-color: #e8f7fa; }   // 50%
  to { background-color: #cff4fc; }    // 100%
`;
const StyledAlert = styled(Alert)`
  animation: ${highlight} 1s linear infinite;
`;



function ProductDetail(props) {
  // useParams() 사용하여 productId 가져오기
  const { productId } = useParams();
  const dispatch = useDispatch();

  // Quiz: 전역 스토어에서 selectedProduct 꺼내오기
  const product = useSelector(selectSelectedProduct);


  // ** Info 창 상태
  const [ showInfo, setShowInfo ] = useState(true);


  // **** 사용자로 부터 입력 받은 text를 State 사용하여 관리하기
  const [ orderCount, setOrderCount ] = useState(1);  // 주문 수량 상태



  // 처음 마운트 됐을 때 서버에 상품 id를 이용하여 데이터를 요청하고, 그 결과를 리덕스 스토어에 저장
  useEffect(() => {
    // 서버에서 특정 상품의 데이터를 가져오는 작업을 했다고 가정
    // ... api call ...  ...> 5번 줄로 ㄱㄱㄱㄱㄱㄱ
    const foundProduct = data.find((product) => {
      return product.id === productId;
    });

    dispatch(getProductById(foundProduct));

    // ** Info창 3초 뒤에 사라지게 만들기 (처음 한번 렌더링 될 때만 실행되도록 설정, 만약 useEffect 안에 안넣고 밖으로 빼면 계속 렌더링 되기 때문)
    const timeout = setTimeout(() => {
      setShowInfo(false)
    }, 3000);
    // 불필요하게 타이머가 계속 생기는 것을 정리 -> 뒷정리 함수 사용(=언마운트 될 때 실행)
    return () => {
      clearTimeout(timeout);
    };
  }, []);


  // **** input text.... handleChangeOrderCount 함수 만들기
  const handleChangeOrderCount = (e) => {
    if (isNaN(e.target.value)) {
      toast.error('숫자만 입력하세요💀');
      return;
    }
    setOrderCount(Number(e.target.value));
  };


  // product가 없을 경우에
  if (!product) {
    // return null;
    // null을 return하면 여기서 멈추고 빈화면 나옴
    // 혹은 아래처럼 에러페이지를 작성
    return <div>상품이 존재하지 않습니다.</div>;
  }

  
  return (
    <Container className="pt-3">
      {/*  className="pt-3" ---> padding 1rem (bootstrap에서 지원하는 거임), 그 외 pt, pb, pl, ..etc... */}

      {/* ** Quiz : 처음 상세페이지 들어왔을 때 info 띄우고, 3초 뒤에 사라지게 만들기
          처음 렌더링 됐을 때 setTimeout으로 타이머 설정 */}
      {showInfo &&
        <StyledAlert variant="info" onClose={() => setShowInfo(false)} dismissible>
            현재 34명이 이 상품을 보고 있습니다.
        </StyledAlert>
      }
      


      <Row>
        {/* Quiz : 데이터 바인딩 작업 */}
        <Col md={6}>
          <img src={product.imagePath} width="80%"/>
        </Col>
        <Col md={6}>
          <h4 className='pt-5'>{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price}원</p>

          <Col md={4} className="m-auto mb-3">
            {/* Quiz: 아래 input type text를 제어 컴포넌트로 만들기 */}
            {/* 1) 사용자가 입력한 값을 orderCount 라는 state로 관리
                2) 사용자가 값을 입력할 때마다 orderCount에 값 저장 */}
            <Form.Control type="text" value={orderCount}
              onChange={handleChangeOrderCount} />
          </Col>

          <Button variant="primary">주문하기</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;

// 상품 상세 만들었음... 라우팅 해야함. 라우팅 하려면 App.js 로
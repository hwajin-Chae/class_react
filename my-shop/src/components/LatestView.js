import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { selectProductList } from '../features/product/productSlice';

const LatestViewWrapper = styled(Card)`
  position: fixed;
  top: 100px;
  right: 20px;
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.25);
  width: 8rem;
`;


function LatestView(props) {
  // 전역스토어(productList)에 저장했던 상품을 꺼내옴 -> useSelect 사용
  const productList = useSelector(selectProductList);
  const latestViewed = JSON.parse(localStorage.getItem('latestViewed')); // 없으면 null 반환
  const latestViewedProducts = latestViewed?.map((id) => productList.find((product) => product.id === id)); // 옵셔널 체이닝에 의해 undefined 반환

  if (productList.length < 1 || !latestViewedProducts) {
    return null;
    // productList가 없거나(빈배열이거나), latestViewedProducts 없으면 return null;
  }

  return (
    <LatestViewWrapper>
      <Card.Header>최근 본 상품</Card.Header>
      <ListGroup variant="flush">
        {latestViewedProducts.map((product, index) => (
          <React.Fragment key={product.id}>
            {/* ㄴ> React.Fragment 없이, <></> 사용가능하나,
                    key 값을 주려면 React.Fragment 꼭 써야함  */}
            <img src={product.imagePath} alt={`img-${index}`}/>
            <ListGroup.Item className="text-ellipsis">{product.title}</ListGroup.Item>
          </React.Fragment>
        ))}
        
      </ListGroup>
    </LatestViewWrapper>
  );
}

export default LatestView;
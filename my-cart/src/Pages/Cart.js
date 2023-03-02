import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, removeItemFromCart, selectCartList } from '../feature/cartSlice';

function Cart() {

  const cartAdd = useSelector(selectCartList);
  console.log(cartAdd);

  const dispatch = useDispatch();
  

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>

          {/* Quiz:
            1) 전역 스토어에서 cartList를 꺼내오세요
            2) 꺼내온 cartList를 반복 렌더링 + 데이터 바인딩 */}
            {cartAdd.map((cart, index) => (
              <tr key={cart.id}>
                <td>{index + 1}</td>
                <td>{cart.title}</td>
                <td>
                  <Button variant="outline-warning"
                    onClick={() => { dispatch(decreaseCount(cart.id)); }}> - </Button>
                    {` ${cart.count} `}
                  <Button variant="outline-warning"
                    onClick={() => { dispatch(increaseCount(cart.id)); }}> + </Button>
                </td>
                <td>{cart.price * cart.count}원</td>
                <td>
                  <Button variant="outline-success"
                    onClick={(e) => {dispatch(removeItemFromCart(cart.id));
                    }}>x</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
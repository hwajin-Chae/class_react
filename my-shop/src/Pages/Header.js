import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";


function Header(props) {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#" onClick={() => {
              navigate('/');}}>SHOP</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/'); }}>홈</Nav.Link>
              <Nav.Link onClick={() => { navigate('/cart'); }}>장바구니</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Outlet />
    </>
    
  )
}

export default Header;


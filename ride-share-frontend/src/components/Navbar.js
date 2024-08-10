import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CiLogout } from "react-icons/ci";
import './style.css';
import { useLocation } from 'react-router-dom';

function NavigationBar() {

  function handleLogout(){
      localStorage.clear();
      window.location.href = "/";
  }

  const route = useLocation().pathname.slice(1);
  
  const expand = "sm";
  return (
    <Navbar expand={expand} className="mb-4 shadow">
        <Container fluid>
        <Navbar.Brand href="/rides" className='kanit-regular'>Ride Share</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title className='kanit-regular'> Ride Share </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 kanit-light">
                <Nav.Link href="/rides" style={(route === 'rides') ? {fontWeight: "bold"} : {}}>Rides</Nav.Link>
                <Nav.Link href="/add-ride" style={(route === 'add-ride') ? {fontWeight: "bold"} : {}}>Add Ride</Nav.Link>
                <Nav.Link href="/my-rides" style={(route === 'my-rides') ? {fontWeight: "bold"} : {}}>My Rides</Nav.Link>
                <Nav.Link href="/starred-rides" style={(route === 'starred-rides') ? {fontWeight: "bold"} : {}}>Starred Rides</Nav.Link>
                <Nav.Link onClick={handleLogout}>
                    <CiLogout/> Logout
                </Nav.Link>
            </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
        </Container>
    </Navbar>
  );
}

export default NavigationBar;
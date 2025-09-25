import './App.css';
import { useState } from "react";
import { Container, Navbar, NavbarBrand,NavbarToggler, Collapse, Card, CardBody, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddVehicle from './component/add-vec';
import logo from './logo.svg';
import Home from './component/home';
import ManageVehicle from './component/manage-vec';
import ManageBooking from './component/manage-booking';

function App() {
  const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container>
      <Navbar color="white" light expand="md" className="my-2 px-3">
      <NavbarBrand tag={Link} to="/">
        <img alt="logo" src={logo} style={{ height: 60, width: 60 }} />
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <div className="ms-auto d-flex flex-column flex-md-row gap-2">
          <Button color="primary" size="sm" onClick={() => navigate("/manage-vehicle")}>
            Manage Vehicle
          </Button>
          <Button color="primary" size="sm" onClick={() => navigate("/manage-booking")}>
            Manage Booking
          </Button>
        </div>
      </Collapse>
    </Navbar>



      <Routes>
        <Route path="/manage-vehicle" element={<ManageVehicle />} />
        <Route path="/manage-booking" element={<ManageBooking/>} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
}

export default App;

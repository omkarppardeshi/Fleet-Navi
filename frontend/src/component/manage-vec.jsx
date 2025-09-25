import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Button, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const ManageVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vehicles');
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      } else {
        setMessage('Failed to fetch vehicles.');
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Delete vehicle
  const handleDelete = async (name, _id) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch('http://localhost:5000/api/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id }),
      });

      if (response.ok) {
        setMessage(`Vehicle "${name}" deleted successfully.`);
        // Refresh vehicle list
        fetchVehicles();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to delete vehicle.'}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2 className="mb-0">All Vehicles</h2>
        </Col>
        <Col className="text-end">
          <Button color="primary" size="sm" onClick={() => navigate('/add-vehicle')}>
            Add Vehicle
          </Button>
        </Col>
      </Row>

      {message && <Alert color="info">{message}</Alert>}

      {vehicles.length > 0 ? (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Type</th>
              <th>Capacity (KG)</th>
              <th>Tyres</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, index) => (
              <tr key={v._id || index}>
                <td>{index + 1}</td>
                <td>{v.name}</td>
                <td>{v.type}</td>
                <td>{v.capacityKg}</td>
                <td>{v.tyres}</td>
                <td>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => handleDelete(v.name, v._id)}
                  >
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No vehicles found.</p>
      )}
    </Container>
  );
};

export default ManageVehicle;

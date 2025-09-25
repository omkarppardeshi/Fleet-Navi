import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Alert,
  FormFeedback,
} from 'reactstrap';

const AddVehicle = () => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [tyres, setTyres] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('success');

  // Local validation state
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setErrors({});

    // Simple frontend validation
    const newErrors = {};
    if (!name) newErrors.name = 'Vehicle name is required';
    if (!type) newErrors.type = 'Vehicle type is required';
    if (!capacity || capacity <= 0) newErrors.capacity = 'Capacity must be a positive number';
    if (!tyres || tyres <= 0) newErrors.tyres = 'Number of tyres must be positive';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop submission
    }

    const newVehicle = {
      name,
      capacityKg: Number(capacity),
      type,
      tyres: Number(tyres),
      status: 1
    };

    try {
      const response = await fetch('http://localhost:5000/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle),
      });

      if (response.status === 201) {
        setMessage('Vehicle added successfully!');
        setMessageColor('success');
        setName('');
        setCapacity('');
        setType('');
        setTyres('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Something went wrong.'}`);
        setMessageColor('danger');
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
      setMessageColor('danger');
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add New Vehicle</h2>

      {message && <Alert color={messageColor}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="vehicle-name">Vehicle Name</Label>
          <Input
            type="text"
            id="vehicle-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter vehicle name"
            invalid={!!errors.name} // highlight if error
          />
          {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="type">Type</Label>
          <Input
            type="select"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            invalid={!!errors.type}
          >
            <option value="">Select type</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Trailer">Trailer</option>
            <option value="Sedan">Sedan</option>
          </Input>
          {errors.type && <FormFeedback>{errors.type}</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="capacity">Capacity (KG)</Label>
          <Input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Enter capacity in KG"
            invalid={!!errors.capacity}
          />
          {errors.capacity && <FormFeedback>{errors.capacity}</FormFeedback>}
        </FormGroup>

        <FormGroup>
          <Label for="tyres">Number of Tyres</Label>
          <Input
            type="number"
            id="tyres"
            value={tyres}
            onChange={(e) => setTyres(e.target.value)}
            placeholder="Enter number of tyres"
            invalid={!!errors.tyres}
          />
          {errors.tyres && <FormFeedback>{errors.tyres}</FormFeedback>}
        </FormGroup>
        <div className='text-center'>
            <Button color="primary" type="submit">
          Add Vehicle
        </Button>
        </div>
        
      </Form>
    </Container>
  );
};

export default AddVehicle;

import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Table, Alert } from "reactstrap";
import { backendPath } from '../../src/api/index.js';


const ManageBooking = () => {
    const [capacity, setCapacity] = useState("");
    const [fromPincode, setFromPincode] = useState("");
    const [toPincode, setToPincode] = useState("");
    const [startTime, setStartTime] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("success");

    console.log("Message", message);


    const handleSearch = async () => {
        setMessage("");
        setVehicles([]);

        if (!capacity || !fromPincode || !toPincode || !startTime) {
            setMessage("All fields are required.");
            setMessageColor("danger");
            return;
        }

        try {
            const query = new URLSearchParams({
                capacityRequired: capacity,
                fromPincode,
                toPincode,
                startTime
            }).toString();

            const response = await fetch(`http://localhost:5000/api/available?${query}`);
            if (!response.ok) throw new Error("Failed to fetch available vehicles");

            const data = await response.json();
            setVehicles(data);
            if (data.length === 0) {
                setMessage("No vehicles available for the selected time.");
                setMessageColor("warning");
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
            setMessageColor("danger");
        }
    };

    const handleBook = async (vehicleId) => {
        setMessage("");
        const customerId = "12345"; // hardcoded for simplicity

        try {
            const response = await fetch(`${backendPath}api/bookings/add-booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    vehicleId,
                    fromPincode,
                    toPincode,
                    startTime,
                    customerId
                })
            });

            if (response.status === 201) {
                setMessage("Booking successful!");
                setMessageColor("success");
                setVehicles(prev => prev.filter(v => v._id !== vehicleId));

            } else if (response.status === 409) {
                setMessage("Vehicle became unavailable.");
                setMessageColor("danger");
            } else {
                const errData = await response.json();
                setMessage(errData.error || "Failed to book vehicle.");
                setMessageColor("danger");
            }

            // Optionally, refresh available vehicles
            //   handleSearch();
        } catch (err) {
            setMessage(`Network error: ${err.message}`);
            setMessageColor("danger");
        }
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">Search & Book Vehicle</h2>

            {message && <Alert color={messageColor}>{message}</Alert>}

            <Form inline className="mb-4">
                <FormGroup className="me-2">
                    <Label for="capacity" className="me-2">Capacity Required (KG)</Label>
                    <Input type="number" id="capacity" value={capacity} onChange={e => setCapacity(e.target.value)} />
                </FormGroup>

                <FormGroup className="me-2">
                    <Label for="from" className="me-2">From Pincode</Label>
                    <Input type="text" id="from" value={fromPincode} onChange={e => setFromPincode(e.target.value)} />
                </FormGroup>

                <FormGroup className="me-2">
                    <Label for="to" className="me-2">To Pincode</Label>
                    <Input type="text" id="to" value={toPincode} onChange={e => setToPincode(e.target.value)} />
                </FormGroup>

                <FormGroup className="me-2">
                    <Label for="startTime" className="me-2">Start Date & Time</Label>
                    <Input type="datetime-local" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} />
                </FormGroup>

                <Button color="primary" onClick={handleSearch}>Search Availability</Button>
            </Form>

            {vehicles.length > 0 && (
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vehicle Name</th>
                            <th>Capacity</th>
                            <th>Tyres</th>
                            <th>Estimated Ride Duration (Hrs)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((v, index) => (
                            <tr key={v._id}>
                                <td>{index + 1}</td>
                                <td>{v.name}</td>
                                <td>{v.capacityKg}</td>
                                <td>{v.tyres}</td>
                                <td>{v.estimatedRideDurationHours}</td>
                                <td>
                                    <Button color="success" size="sm" onClick={() => handleBook(v._id)}>
                                        Book Now
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default ManageBooking;

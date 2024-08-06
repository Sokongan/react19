// src/application/components/DraggableForm.js

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Button, Form, InputGroup, Col, Row } from 'react-bootstrap';


const DraggableForm = ({ onSubmit, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [ns, setNs] = useState('');
  const [degrees, setDegrees] = useState('');
  const [minutes, setMinutes] = useState('');
  const [ew, setEw] = useState('');
  const [distance, setDistance] = useState(0);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const azimuth = `${ns} ${degrees}d${minutes} ${ew}`;
    onSubmit({ azimuth, distance });
    setNs('');
    setDegrees('');
    setMinutes('');
    setEw('');
    setDistance(0);
  };

  return (
    <Draggable>
      <div className="draggable-form">
        <div className="header">
          <Button variant="primary" onClick={handleMinimize}>
            {isMinimized ? 'Maximize' : 'Minimize'}
          </Button>
          <Button variant="danger" onClick={onClose}>Close</Button>
        </div>
        {!isMinimized && (
          <ResizableBox width={500} height={200} minConstraints={[200, 100]} maxConstraints={[600, 400]}>
            <div className="form-content">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>NS</InputGroup.Text>
                      <Form.Control type="text" placeholder="N/S" value={ns} onChange={(e) => setNs(e.target.value.toUpperCase())} />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Deg</InputGroup.Text>
                      <Form.Control type="number" placeholder="Degrees" value={degrees} onChange={(e) => setDegrees(e.target.value)} />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Min</InputGroup.Text>
                      <Form.Control type="number" placeholder="Minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>EW</InputGroup.Text>
                      <Form.Control type="text" placeholder="E/W" value={ew} onChange={(e) => setEw(e.target.value.toUpperCase())} />
                    </InputGroup>
                  </Col>
                </Row>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Distance (m)</InputGroup.Text>
                  <Form.Control type="number" placeholder="0" value={distance} onChange={(e) => setDistance(parseFloat(e.target.value))} />
                </InputGroup>
                <Button type="submit">Add Point</Button>
              </Form>
            </div>
          </ResizableBox>
        )}
        {isMinimized && (
          <div className="minimized-form" onClick={handleMinimize} 
            style={{
              position: 'fixed', 
              bottom: '10px', 
              left: '10px', 
              backgroundColor: 'yellow', 
              padding: '10px', 
              cursor: 'pointer' 
              }}>
            Plot
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default DraggableForm;

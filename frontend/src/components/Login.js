import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password && loginData.role) {
      localStorage.setItem('userRole', loginData.role);
      navigate('/dashboard');
    } else {
      alert('Please fill all fields');
    }
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2>LUCT Faculty Portal</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                  <Tab eventKey="login" title="Login">
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email"
                          placeholder="Enter your email" 
                          value={loginData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="password"
                          placeholder="Enter your password" 
                          value={loginData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select 
                          name="role"
                          value={loginData.role}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Role</option>
                          <option value="student">Student</option>
                          <option value="lecturer">Lecturer</option>
                          <option value="prl">Principal Lecturer (PRL)</option>
                          <option value="pl">Program Leader (PL)</option>
                        </Form.Select>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Sign In
                      </Button>
                    </Form>
                  </Tab>
                  
                  <Tab eventKey="register" title="Register">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your full name" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Create a password" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm your password" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select>
                          <option value="">Select Role</option>
                          <option value="student">Student</option>
                          <option value="lecturer">Lecturer</option>
                        </Form.Select>
                      </Form.Group>
                      <Button variant="success" className="w-100">
                        Create Account
                      </Button>
                    </Form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
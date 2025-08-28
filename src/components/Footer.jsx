import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-dark text-light py-5 ">
      <Container>
        <Row>
          <Col lg={4} className="mb-4">
            <h5 className="text-white mb-3">NGO Community</h5>
            <p className="text-primary">
              Connecting NGOs with communities and resources for a better world. 
              Our platform facilitates collaboration between organizations, volunteers, and donors.
            </p>
            <div className="d-flex mt-3">
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
          
          <Col md={6} lg={4} className="mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-primary text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="/search" className="text-primary text-decoration-none">Search NGOs</a>
              </li>
              <li className="mb-2">
                <a href="/requirements" className="text-primary text-decoration-none">Requirements</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-primary text-decoration-none">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-primary text-decoration-none">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-primary text-decoration-none">Terms of Service</a>
              </li>
            </ul>
          </Col>
          
          <Col md={6} lg={4} className="mb-4">
            <h5 className="mb-3">Newsletter</h5>
            <p className="text-primary">Subscribe to our newsletter to get updates on new NGOs and opportunities.</p>
            <Form onSubmit={handleSubscribe}>
              <Form.Group className="mb-2">
                <Form.Control 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="text-primary mb-0">
              © {new Date().getFullYear()} NGO Community. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="text-primary mb-0">
              Made with <i className="fas fa-heart text-danger"></i> for a better world
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
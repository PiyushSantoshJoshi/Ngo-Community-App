import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Piyush from "../assets/Piyush.png"

// Reusable component for formatted images with consistent rounding
const FormattedImage = ({ src, alt, width = 300, height = 300, className = "", rounded = true, ...props }) => {
  // Check if the image is from Unsplash
  const isUnsplash = src.includes('unsplash.com');
  
  // If it's not from Unsplash, add the formatting parameters
  const formattedSrc = isUnsplash ? src : `${src}?auto=format&fit=crop&w=${width}&h=${height}`;
  
  // Add rounded-circle class if rounded is true
  const imageClass = rounded ? `${className} rounded-circle` : className;
  
  return (
    <img 
      src={formattedSrc} 
      alt={alt} 
      className={imageClass}
      style={{ width: `${width}px`, height: `${height}px`, objectFit: 'cover' }}
      {...props}
    />
  );
};

const AboutUs = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center display-4 fw-bold text-primary mb-4">About NGO Community</h1>
          <p className="lead text-center mx-auto" style={{maxWidth: '800px'}}>
            We are a dedicated platform connecting NGOs with communities, volunteers, and resources 
            to create a better world through collaboration and support.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <h2 className="mb-4">Our Mission</h2>
          <p>
            Our mission is to bridge the gap between non-governmental organizations and the communities 
            they serve. We provide a platform where NGOs can showcase their work, manage their requirements, 
            and connect with potential donors and volunteers.
          </p>
          <p>
            We believe in transparency, efficiency, and the power of community to drive positive change 
            in the world.
          </p>
        </Col>
        <Col md={6} className="mb-4 d-flex justify-content-center">
          <FormattedImage
            src="https://images.unsplash.com/photo-1504805572947-34fad45aed93"
            alt="Community helping hands"
            width={600}
            height={400}
            rounded={false}
            className="shadow"
          />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">What We Offer</h2>
        </Col>
      </Row>
      
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="d-flex justify-content-center mb-3">
                <FormattedImage
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300"
                  alt="NGO Discovery"
                  width={120}
                  height={120}
                />
              </div>
              <Card.Title>NGO Discovery</Card.Title>
              <Card.Text>
                Find and connect with NGOs based on location, cause, or specific needs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="d-flex justify-content-center mb-3">
                <FormattedImage
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300"
                  alt="Resource Management"
                  width={120}
                  height={120}
                />
              </div>
              <Card.Title>Resource Management</Card.Title>
              <Card.Text>
                NGOs can efficiently manage and post their requirements.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="d-flex justify-content-center mb-3">
                <FormattedImage
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300"
                  alt="Direct Communication"
                  width={120}
                  height={120}
                />
              </div>
              <Card.Title>Direct Communication</Card.Title>
              <Card.Text>
                Our messaging system enables direct communication between NGOs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="py-5 bg-light rounded-3 mb-5">
        <Col className="text-center">
          <h2 className="mb-4">Join Our Community</h2>
          <p className="mb-4 mx-auto" style={{maxWidth: '600px'}}>
            Whether you're an NGO looking for support, a volunteer wanting to make a difference, 
            or a donor seeking meaningful causes, our platform connects you with the right opportunities.
          </p>
          <a href="/register" className="btn btn-primary btn-lg me-3">Sign Up Now</a>
          <a href="/search" className="btn btn-outline-primary btn-lg">Explore NGOs</a>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="text-center mb-4">Our Team</h2>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={3} className="text-center">
          <FormattedImage
            src={Piyush}
            alt="Team member"
            width={300}
            height={300}
            className="mb-3 shadow"
          />
          <h5>Piyush Joshi</h5>
          <p className="text-muted">Founder & CEO</p>
        </Col>
        <Col md={3} className="text-center">
          <FormattedImage
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
            alt="Team member"
            width={300}
            height={300}
            className="mb-3 shadow"
          />
          <h5>Michael Chen</h5>
          <p className="text-muted">Technical Director</p>
        </Col>
        <Col md={3} className="text-center">
          <FormattedImage
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
            alt="Team member"
            width={300}
            height={300}
            className="mb-3 shadow"
          />
          <h5>Priya Sharma</h5>
          <p className="text-muted">Community Manager</p>
        </Col>
        <Col md={3} className="text-center">
          <FormattedImage
            src="https://images.unsplash.com/photo-1568992687947-868a62a9f521"
            alt="Team member"
            width={300}
            height={300}
            className="mb-3 shadow"
          />
          <h5>David Martinez</h5>
          <p className="text-muted">Partnership Coordinator</p>
        </Col>
      </Row>
    </Container>
  );
};

// CSS for additional styling
const aboutUsStyles = `
.rounded-circle {
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card:hover .rounded-circle {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
`;

// Component that includes both the page and styles
const AboutUsWithStyles = () => {
  return (
    <>
      <style>{aboutUsStyles}</style>
      <AboutUs />
    </>
  );
};

export default AboutUsWithStyles;
export { FormattedImage };
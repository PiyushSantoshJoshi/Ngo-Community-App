import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: '🏢',
      title: 'NGO Directory',
      description: 'Find and connect with NGOs in your area. Search by location, category, or name.'
    },
    {
      icon: '📋',
      title: 'Requirements Management',
      description: 'Post and discover requirements. NGOs can share what they need, and users can help fulfill them.'
    },
    {
      icon: '💬',
      title: 'Direct Messaging',
      description: 'Communicate directly with NGOs and other users through our secure messaging system.'
    },
    {
      icon: '✅',
      title: 'Verified NGOs',
      description: 'All NGOs are verified and approved by our admin team to ensure authenticity.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Registered NGOs' },
    { number: '50+', label: 'Cities Covered' },
    { number: '1000+', label: 'Requirements Posted' },
    { number: '10000+', label: 'Community Members' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Connecting NGOs with Communities
              </h1>
              <p className="lead mb-4">
                Join our platform to discover NGOs, post requirements, and make a difference in your community. 
                Whether you're an NGO looking for support or a community member wanting to help, we've got you covered.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                {!isAuthenticated ? (
                  <>
                    <Button as={Link} to="/register" variant="light" size="lg">
                      Get Started
                    </Button>
                    <Button as={Link} to="/ngo-register" variant="outline-light" size="lg">
                      Register NGO
                    </Button>
                  </>
                ) : (
                  <Button as={Link} to="/search" variant="light" size="lg">
                    Explore NGOs
                  </Button>
                )}
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="display-1">🤝</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-6 fw-bold">Why Choose NGO Community?</h2>
              <p className="lead text-muted">
                Our platform provides everything you need to connect and collaborate
              </p>
            </Col>
          </Row>
          
          <Row>
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3} className="mb-4">
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <div className="display-4 mb-3">{feature.icon}</div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center">
            {stats.map((stat, index) => (
              <Col key={index} md={3} sm={6} className="mb-4">
                <div className="text-center">
                  <h2 className="display-5 fw-bold text-primary mb-2">{stat.number}</h2>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="lead text-muted mb-4">
                Join thousands of users who are already making an impact in their communities. 
                Start your journey today!
              </p>
              {!isAuthenticated ? (
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button as={Link} to="/register" variant="primary" size="lg">
                    Join Now
                  </Button>
                  <Button as={Link} to="/ngo-register" variant="outline-primary" size="lg">
                    Register Your NGO
                  </Button>
                </div>
              ) : (
                <Button as={Link} to="/search" variant="primary" size="lg">
                  Explore NGOs
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-6 fw-bold">How It Works</h2>
              <p className="lead text-muted">
                Simple steps to get started
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col md={4} className="text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px' }}>
                <span className="fw-bold">1</span>
              </div>
              <h5>Register</h5>
              <p className="text-muted">Create your account as a user or register your NGO</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px' }}>
                <span className="fw-bold">2</span>
              </div>
              <h5>Connect</h5>
              <p className="text-muted">Search for NGOs or post requirements</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px' }}>
                <span className="fw-bold">3</span>
              </div>
              <h5>Collaborate</h5>
              <p className="text-muted">Message, collaborate, and make an impact</p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;

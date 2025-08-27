import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Spinner, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { searchRequirements, postRequirement, setSearchFilters, clearSearchResults } from '../redux/requirementSlice';
import { useAuth } from '../hooks/useAuth';

const Requirements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postForm, setPostForm] = useState({
    item: '',
    quantity: '',
    description: ''
  });
  const [postErrors, setPostErrors] = useState({});

  const dispatch = useDispatch();
  const { requirements, loading, error } = useSelector((state) => state.requirement);
  const { isAuthenticated, isNgo, user } = useAuth();

  useEffect(() => {
    // Load initial requirements
    dispatch(searchRequirements());
  }, [dispatch]);

  const handleSearch = () => {
    const filters = {};
    if (searchTerm) filters.item = searchTerm;
    dispatch(searchRequirements(filters));
  };

  const handleClear = () => {
    setSearchTerm('');
    dispatch(clearSearchResults());
  };

  const validatePostForm = () => {
    const errors = {};
    if (!postForm.item.trim()) errors.item = 'Item is required';
    if (!postForm.quantity.trim()) errors.quantity = 'Quantity is required';
    if (!postForm.description.trim()) errors.description = 'Description is required';
    
    setPostErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePostForm()) return;
    if (!isAuthenticated || !isNgo || !user?.email) return; // guard

    try {
      const result = await dispatch(postRequirement({
        ngoEmail: user.email,
        item: postForm.item,
        quantity: postForm.quantity,
        description: postForm.description
      }));

      if (result.meta.requestStatus === 'fulfilled') {
        setShowPostModal(false);
        setPostForm({ item: '', quantity: '', description: '' });
        setPostErrors({});
        // Refresh requirements (only approved are listed; newly created will be pending)
        dispatch(searchRequirements());
      }
    } catch (err) {
      console.error('Error posting requirement:', err);
    }
  };

  const handlePostFormChange = (e) => {
    const { name, value } = e.target;
    setPostForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (postErrors[name]) {
      setPostErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const filteredRequirements = useMemo(() => {
    if (!searchTerm) return requirements;
    
    return requirements.filter(req => 
      req.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requirements, searchTerm]);

  const getStatusBadge = (status) => {
    const variants = {
      'open': 'success',
      'fulfilled': 'info',
      'closed': 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container className='mt-5 mb-5'>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold">Requirements</h2>
              <p className="text-muted">Find and post requirements for NGOs</p>
            </div>
            {isAuthenticated && isNgo && (
              <Button 
                variant="primary" 
                onClick={() => setShowPostModal(true)}
              >
                Post Requirement
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Search Bar */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Search requirements by item or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <div className="d-flex gap-2">
                <Button variant="primary" onClick={handleSearch} className="flex-fill">
                  Search
                </Button>
                <Button variant="outline-secondary" onClick={handleClear} className="flex-fill">
                  Clear
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Requirements List */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading requirements...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <Row className="mb-3">
            <Col>
              <h5>
                {filteredRequirements.length} Requirement{filteredRequirements.length !== 1 ? 's' : ''} found
              </h5>
            </Col>
          </Row>

          {filteredRequirements.length === 0 ? (
            <Card className="text-center py-5">
              <Card.Body>
                <h5 className="text-muted">No requirements found</h5>
                <p className="text-muted">Try adjusting your search criteria</p>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {filteredRequirements.map((requirement) => (
                <Col key={requirement.id} lg={6} xl={4} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-1">{requirement.item}</h5>
                        {getStatusBadge(requirement.status)}
                      </div>
                      
                      <p className="text-muted small mb-2">
                        Quantity: {requirement.quantity}
                      </p>
                      
                      {requirement.description && (
                        <p className="card-text small mb-3">
                          {requirement.description}
                        </p>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          Posted: {new Date(requirement.createdAt?.toDate?.() || requirement.createdAt).toLocaleDateString()}
                        </small>
                        <Button variant="outline-primary" size="sm">
                          Contact NGO
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      {/* Post Requirement Modal */}
      <Modal show={showPostModal} onHide={() => setShowPostModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Post New Requirement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePostSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Required *</Form.Label>
                  <Form.Control
                    type="text"
                    name="item"
                    value={postForm.item}
                    onChange={handlePostFormChange}
                    isInvalid={!!postErrors.item}
                    placeholder="e.g., Books, Medical supplies"
                  />
                  <Form.Control.Feedback type="invalid">
                    {postErrors.item}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity *</Form.Label>
                  <Form.Control
                    type="text"
                    name="quantity"
                    value={postForm.quantity}
                    onChange={handlePostFormChange}
                    isInvalid={!!postErrors.quantity}
                    placeholder="e.g., 100 books, 50 boxes"
                  />
                  <Form.Control.Feedback type="invalid">
                    {postErrors.quantity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={postForm.description}
                onChange={handlePostFormChange}
                isInvalid={!!postErrors.description}
                placeholder="Provide detailed description of what you need..."
              />
              <Form.Control.Feedback type="invalid">
                {postErrors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Alert variant="info" className="mb-0">New requirements will be pending until admin approval.</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPostModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePostSubmit} disabled={!isAuthenticated || !isNgo}>
            Post Requirement
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Requirements;

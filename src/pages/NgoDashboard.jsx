import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNgoApprovedRequirements, postRequirement } from '../redux/requirementSlice';

const NgoDashboard = () => {
  const { user, isNgo } = useAuth();
  const dispatch = useDispatch();
  const { myApprovedRequirements, loading, error } = useSelector((s) => s.requirement);

  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ item: '', quantity: '', description: '' });
  const [createErrors, setCreateErrors] = useState({});

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchNgoApprovedRequirements(user.email));
    }
  }, [dispatch, user?.email]);

  const validateCreate = () => {
    const errs = {};
    if (!createForm.item.trim()) errs.item = 'Item is required';
    if (!createForm.quantity.trim()) errs.quantity = 'Quantity is required';
    if (!createForm.description.trim()) errs.description = 'Description is required';
    setCreateErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateCreate() || !user?.email) return;
    try {
      const result = await dispatch(postRequirement({
        ngoEmail: user.email,
        item: createForm.item,
        quantity: createForm.quantity,
        description: createForm.description,
      }));
      if (result.meta.requestStatus === 'fulfilled') {
        setShowCreate(false);
        setCreateForm({ item: '', quantity: '', description: '' });
        // After creation, it will be pending; keep list of approved as-is
      }
    } catch {}
  };

  return (
    <Container className='mt-5 mb-5'>
      <Row className='mb-4'>
        <Col>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h2 className='fw-bold'>NGO Dashboard</h2>
              <p className='text-muted mb-0'>Manage your requirements. New ones need admin approval.</p>
            </div>
            {isNgo && (
              <Button variant='primary' onClick={() => setShowCreate(true)}>Create Requirement</Button>
            )}
          </div>
        </Col>
      </Row>

      {loading && (
        <div className='text-center py-5'>
          <Spinner animation='border' />
          <p className='mt-2'>Loading your approved requirements...</p>
        </div>
      )}

      {error && <Alert variant='danger'>{error}</Alert>}

      {!loading && !error && (
        <Row>
          {myApprovedRequirements.length === 0 ? (
            <Col>
              <Card className='text-center py-5'>
                <Card.Body>
                  <h5 className='text-muted mb-2'>No approved requirements yet</h5>
                  <p className='text-muted'>Create a requirement and wait for admin approval.</p>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            myApprovedRequirements.map((req) => (
              <Col key={req.id} md={6} lg={4} className='mb-4'>
                <Card className='h-100 shadow-sm'>
                  <Card.Body>
                    <div className='d-flex justify-content-between align-items-start mb-2'>
                      <h5 className='mb-1'>{req.item}</h5>
                      <Badge bg='success'>Approved</Badge>
                    </div>
                    <p className='text-muted small mb-2'>Quantity: {req.quantity}</p>
                    {req.description && <p className='small mb-3'>{req.description}</p>}
                    <small className='text-muted'>
                      Posted: {new Date(req.createdAt?.toDate?.() || req.createdAt).toLocaleDateString()}
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}

      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Requirement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className='mb-3'>
              <Form.Label>Item *</Form.Label>
              <Form.Control
                name='item'
                value={createForm.item}
                onChange={(e) => setCreateForm({ ...createForm, item: e.target.value })}
                isInvalid={!!createErrors.item}
              />
              <Form.Control.Feedback type='invalid'>{createErrors.item}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Quantity *</Form.Label>
              <Form.Control
                name='quantity'
                value={createForm.quantity}
                onChange={(e) => setCreateForm({ ...createForm, quantity: e.target.value })}
                isInvalid={!!createErrors.quantity}
              />
              <Form.Control.Feedback type='invalid'>{createErrors.quantity}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='description'
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                isInvalid={!!createErrors.description}
              />
              <Form.Control.Feedback type='invalid'>{createErrors.description}</Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Alert variant='info' className='mb-0'>New requirements will be pending until admin approval.</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowCreate(false)}>Cancel</Button>
          <Button variant='primary' onClick={handleCreate}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NgoDashboard;


import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { approveRequirement, rejectRequirement, fetchPendingRequirements } from '../redux/requirementSlice';

const AdminPendingRequirements = () => {
  const dispatch = useDispatch();
  // Change this line to access pendingRequirements instead of requirements
  const { pendingRequirements, loading, error } = useSelector((s) => s.requirement);

  useEffect(() => {
    // Load only pending requirements
    dispatch(fetchPendingRequirements());
  }, [dispatch]);

  const handleApprove = async (id) => {
    await dispatch(approveRequirement(id));
    dispatch(fetchPendingRequirements()); // refresh list
  };

  const handleReject = async (id) => {
    await dispatch(rejectRequirement({ requirementId: id, reason: "Not suitable" }));
    dispatch(fetchPendingRequirements()); // refresh list
  };

  return (
    <Container className='mt-5 mb-5'>
      <Row className='mb-4'>
        <Col>
          <h2 className='fw-bold'>Pending Requirements</h2>
          <p className='text-muted'>Approve or Reject requirements submitted by NGOs</p>
        </Col>
      </Row>

      {loading && (
        <div className='text-center py-5'>
          <Spinner animation='border' />
          <p className='mt-2'>Loading pending requirements...</p>
        </div>
      )}

      {error && <Alert variant='danger'>{error}</Alert>}

      {!loading && !error && (
        <Row>
          {pendingRequirements.length === 0 ? (
            <Col>
              <Card className='text-center py-5'>
                <Card.Body>
                  <h5 className='text-muted'>No pending requirements</h5>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            pendingRequirements.map((req) => (
              <Col key={req.id} md={6} lg={4} className='mb-4'>
                <Card className='h-100 shadow-sm'>
                  <Card.Body>
                    <h5 className='mb-2'>{req.item}</h5>
                    <p className='text-muted small mb-2'>Quantity: {req.quantity}</p>
                    {req.description && <p className='small mb-3'>{req.description}</p>}
                    <div className='d-flex justify-content-between align-items-center'>
                      <small className='text-muted'>{req.ngoEmail}</small>
                      <div className="d-flex gap-2">
                        <Button size='sm' variant='success' onClick={() => handleApprove(req.id)}>
                          Approve
                        </Button>
                        <Button size='sm' variant='danger' onClick={() => handleReject(req.id)}>
                          Reject
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  );
};

export default AdminPendingRequirements;

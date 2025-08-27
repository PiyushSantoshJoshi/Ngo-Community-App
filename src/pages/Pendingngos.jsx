import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { approveNgo, getPendingNgos } from '../redux/ngoSlice';

const PendingNgos = () => {
  const dispatch = useDispatch();
  const { pendingNgos, loading, error } = useSelector((state) => state.ngo);

  useEffect(() => {
    dispatch(getPendingNgos());
  }, [dispatch]);

  const handleApprove = async (ngoId) => {
    await dispatch(approveNgo(ngoId));
    dispatch(getPendingNgos());
  };

  return (
    <Container className='mt-5 mb-5'>
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Pending NGO Approvals</h2>
          <p className="text-muted">Review and approve NGO registrations</p>
        </Col>
      </Row>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading pending NGOs...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mb-4">{error}</Alert>
      )}

      {!loading && !error && (
        <Row>
          {pendingNgos.length === 0 ? (
            <Col>
              <Card className="text-center py-5">
                <Card.Body>
                  <h5 className="text-muted">No pending NGOs</h5>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            pendingNgos.map((ngo) => (
              <Col key={ngo.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="mb-1">{ngo.name}</h5>
                      <Badge bg="warning">Pending</Badge>
                    </div>
                    <p className="text-muted small mb-1">{ngo.email}</p>
                    <p className="text-muted small mb-2">{ngo.city} • {ngo.category}</p>
                    <p className="small mb-3">{ngo.fullAddress}</p>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">📞 {ngo.contact}</small>
                      <Button size="sm" variant="success" onClick={() => handleApprove(ngo.id)}>Approve</Button>
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

export default PendingNgos;

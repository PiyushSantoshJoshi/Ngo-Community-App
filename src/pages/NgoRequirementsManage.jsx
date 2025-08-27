import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Spinner, Badge, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchNgoApprovedRequirements, 
  fetchNgoPendingRequirements,
  fetchNgoRejectedRequirements
} from '../redux/requirementSlice';
import requirementsAPI from '../api/requirements';
import { useAuth } from '../hooks/useAuth';

const NgoRequirementsManage = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { 
    myApprovedRequirements, 
    ngoPendingRequirements, 
    ngoRejectedRequirements,
    loading, 
    error 
  } = useSelector((state) => state.requirement);

  const [selected, setSelected] = useState(null);
  const [editForm, setEditForm] = useState({ item: '', quantity: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  // Add date formatting function
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date not available';
    
    try {
      let date;
      
      // Handle Firestore timestamps
      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else {
        // Handle regular date objects or strings
        date = new Date(timestamp);
      }
      
      // Format with both date and time
      return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchNgoPendingRequirements(user.email));
      dispatch(fetchNgoApprovedRequirements(user.email));
      dispatch(fetchNgoRejectedRequirements(user.email));
    }
  }, [dispatch, user?.email]);

  const openEdit = (req) => {
    setSelected(req);
    setEditForm({ 
      item: req.item || '', 
      quantity: req.quantity || '', 
      description: req.description || '' 
    });
  };

  const saveEdit = async () => {
    if (!selected) return;
    setSaving(true);
    setSaveError(null);
    try {
      await requirementsAPI.updateRequirement(selected.id, editForm);
      setSelected(null);
      if (user?.email) {
        dispatch(fetchNgoApprovedRequirements(user.email));
      }
    } catch (e) {
      setSaveError(e?.error || 'Failed to update requirement');
    } finally {
      setSaving(false);
    }
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  // Fix the render function - remove the 'type' parameter usage
  const renderRequirementsList = (requirements, listType) => (
    <Row>
      {!requirements || requirements.length === 0 ? (
        <Col>
          <Card className='text-center py-5'>
            <Card.Body>
              <h5 className='text-muted'>No requirements found</h5>
              <p className='small text-muted'>
                {listType === 'pending' && 'Requirements awaiting admin approval will appear here'}
                {listType === 'approved' && 'Your approved requirements will appear here'}
                {listType === 'rejected' && 'Rejected requirements will appear here'}
              </p>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        requirements.map((req) => (
          <Col key={req.id} md={6} lg={4} className='mb-4'>
            <Card className='h-100 shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-start mb-2'>
                  <h5 className='mb-1'>{req.item || 'Unnamed Item'}</h5>
                  <Badge bg={getBadgeVariant(req.status)}>
                    {req.status?.charAt(0).toUpperCase() + req.status?.slice(1) || 'Unknown'}
                  </Badge>
                </div>
                <p className='text-muted small mb-2'>
                  Quantity: {req.quantity || 'Not specified'}
                </p>
                {req.description && <p className='small mb-3'>{req.description}</p>}
                
                {/* Add date display with fallback */}
                <p className='text-muted small mb-2'>
                  Posted: {formatDate(req.createdAt)}
                </p>

                {req.status === 'rejected' && req.rejectionReason && (
                  <Alert variant='danger' className='small py-2 mb-3'>
                    <strong>Rejection Reason:</strong> {req.rejectionReason}
                  </Alert>
                )}

                {req.status === 'approved' && (
                  <div className='d-flex justify-content-end'>
                    <Button size='sm' variant='outline-primary' onClick={() => openEdit(req)}>
                      Edit
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );

  return (
    <Container className='mt-5 mb-5'>
      <Row className='mb-4'>
        <Col>
          <h2 className='fw-bold'>Manage My Requirements</h2>
          <p className='text-muted'>View and manage your requirement submissions</p>
        </Col>
      </Row>

      {loading && (
        <div className='text-center py-5'>
          <Spinner animation='border' />
          <p className='mt-2'>Loading requirements...</p>
        </div>
      )}
      
      {error && <Alert variant='danger'>{error}</Alert>}

      {!loading && !error && (
        <>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
            fill
          >
            <Tab eventKey="pending" title={`Pending (${ngoPendingRequirements?.length || 0})`}>
              {renderRequirementsList(ngoPendingRequirements, 'pending')}
            </Tab>
            <Tab eventKey="approved" title={`Approved (${myApprovedRequirements?.length || 0})`}>
              {renderRequirementsList(myApprovedRequirements, 'approved')}
            </Tab>
            <Tab eventKey="rejected" title={`Rejected (${ngoRejectedRequirements?.length || 0})`}>
              {renderRequirementsList(ngoRejectedRequirements, 'rejected')}
            </Tab>
          </Tabs>
        </>
      )}

      <Modal show={!!selected} onHide={() => setSelected(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Requirement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {saveError && <Alert variant='danger'>{saveError}</Alert>}
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Item</Form.Label>
              <Form.Control 
                value={editForm.item} 
                onChange={(e) => setEditForm({ ...editForm, item: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control 
                type="number"
                value={editForm.quantity} 
                onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as='textarea' 
                rows={3} 
                value={editForm.description} 
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setSelected(null)}>Cancel</Button>
          <Button variant='primary' onClick={saveEdit} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NgoRequirementsManage;
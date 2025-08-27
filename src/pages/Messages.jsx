import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import messagesAPI from '../api/messages';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // Mock conversations data (in real app, this would come from API)
  const mockConversations = [
    {
      id: 1,
      name: 'Education for All NGO',
      email: 'education@ngo.com',
      lastMessage: 'Thank you for your support!',
      timestamp: '2 hours ago',
      unread: 2
    },
    {
      id: 2,
      name: 'Healthcare Foundation',
      email: 'health@ngo.com',
      lastMessage: 'We received the medical supplies',
      timestamp: '1 day ago',
      unread: 0
    },
    {
      id: 3,
      name: 'Environmental Protection Group',
      email: 'environment@ngo.com',
      lastMessage: 'Can you help with tree planting?',
      timestamp: '3 days ago',
      unread: 1
    }
  ];

  useEffect(() => {
    // Load conversations
    setConversations(mockConversations);
    
    // Select first conversation by default
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0]);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.email);
    }
  }, [selectedConversation]);

  const loadMessages = async (withUser) => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const response = await messagesAPI.getMessages(user.email, withUser);
      setMessages(response);
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    const messageData = {
      from: user.email,
      to: selectedConversation.email,
      message: newMessage.trim()
    };

    try {
      const response = await messagesAPI.sendMessage(messageData);
      
      // Add message to local state
      const newMsg = {
        id: Date.now(),
        from: user.email,
        to: selectedConversation.email,
        message: newMessage.trim(),
        createdAt: new Date()
      };
      
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      
      // Update conversation last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, lastMessage: newMessage.trim(), timestamp: 'Just now', unread: 0 }
            : conv
        )
      );
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (typeof timestamp === 'string') return timestamp;
    
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = Math.floor((now - messageTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return messageTime.toLocaleDateString();
  };

  return (
    <Container fluid className='mt-4 mb-5'>
      <Row className="mb-2">
        <Col>
          <h2 className="fw-bold">Messages</h2>
          <p className="text-muted">Connect with NGOs and other users</p>
        </Col>
      </Row>

      <Row>
        {/* Conversations List */}
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-light">
              <h6 className="mb-0">Conversations</h6>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {conversations.map((conversation) => (
                  <ListGroup.Item
                    key={conversation.id}
                    action
                    active={selectedConversation?.id === conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className="d-flex justify-content-between align-items-start py-3"
                  >
                    <div className="flex-grow-1 me-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="mb-1">{conversation.name}</h6>
                        {conversation.unread > 0 && (
                          <Badge bg="primary" pill>
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted small mb-1 text-truncate">
                        {conversation.lastMessage}
                      </p>
                      <small className="text-muted">
                        {conversation.timestamp}
                      </small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Chat Area */}
        <Col md={8}>
          <Card className="h-100 border-0 shadow-sm">
            {selectedConversation ? (
              <>
                <Card.Header className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{selectedConversation.name}</h6>
                      <small className="text-muted">{selectedConversation.email}</small>
                    </div>
                    <Button variant="outline-primary" size="sm">
                      View Profile
                    </Button>
                  </div>
                </Card.Header>
                
                <Card.Body className="d-flex flex-column" style={{ height: '400px' }}>
                  {/* Messages */}
                  <div className="flex-grow-1 overflow-auto mb-3">
                    {loading ? (
                      <div className="text-center py-3">
                        <div className="spinner-border spinner-border-sm text-primary"></div>
                        <p className="mt-2">Loading messages...</p>
                      </div>
                    ) : error ? (
                      <Alert variant="danger" className="text-center">
                        {error}
                      </Alert>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-5">
                        <p className="text-muted">No messages yet</p>
                        <small className="text-muted">Start the conversation!</small>
                      </div>
                    ) : (
                      <div>
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`d-flex mb-3 ${
                              message.from === user?.email ? 'justify-content-end' : 'justify-content-start'
                            }`}
                          >
                            <div
                              className={`px-3 py-2 rounded-3 ${
                                message.from === user?.email
                                  ? 'bg-primary text-white'
                                  : 'bg-light'
                              }`}
                              style={{ maxWidth: '70%' }}
                            >
                              <p className="mb-1">{message.message}</p>
                              <small
                                className={`${
                                  message.from === user?.email ? 'text-white-50' : 'text-muted'
                                }`}
                              >
                                {formatTimestamp(message.createdAt)}
                              </small>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <Form onSubmit={sendMessage}>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={loading}
                      />
                      <Button type="submit" variant="primary" disabled={!newMessage.trim() || loading}>
                        Send
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </>
            ) : (
              <Card.Body className="d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <div className="display-4 mb-3">💬</div>
                  <h5 className="text-muted">Select a conversation to start messaging</h5>
                  <p className="text-muted">Choose from the list on the left to begin chatting</p>
                </div>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;

import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Spinner, Alert, Image, Row, Col } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { API_BASE_URL } from "../config";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    contact: "",
    profilePicture: ""
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    try {
      setError(null);
      const res = await axios.get(`${API_BASE_URL}/user/${encodeURIComponent(user.email)}`);
      setProfile(res.data);
    } catch (err) {
      console.error("Profile load error:", err);
      setError("Failed to load profile. " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Ensure we're only sending the fields that the backend expects
      const updateData = {
        name: profile.name || "",
        bio: profile.bio || "",
        contact: profile.contact || "",
        profilePicture: profile.profilePicture || ""
      };

      const response = await axios.put(
        `${API_BASE_URL}/user/${encodeURIComponent(user.email)}`,
        updateData
      );
      
      setSuccess(response.data.message || "Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Failed to update profile. " + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    loadProfile(); // Reload original data
  };

  if (loading) {
    return (
      <Container className="mt-5 mb-5">
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading profile...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">My Profile</h2>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                  {success}
                </Alert>
              )}

              {editing ? (
                <Form onSubmit={handleSave}>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Picture URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="profilePicture"
                      value={profile.profilePicture}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                    />
                    <Form.Text className="text-muted">
                      Paste a direct link to your profile picture
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact Information</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact"
                      value={profile.contact}
                      onChange={handleChange}
                      placeholder="Phone number or other contact info"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary" disabled={saving}>
                      {saving ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary" 
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <div className="text-center mb-4">
                    {profile.profilePicture ? (
                      <Image
                        src={profile.profilePicture}
                        roundedCircle
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        alt="Profile"
                        className="border"
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light rounded-circle mx-auto border"
                        style={{ width: "150px", height: "150px" }}
                      >
                        <span className="text-muted">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <strong>Email:</strong> {user.email}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Name:</strong> {profile.name || "Not provided"}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Bio:</strong> {profile.bio || "Not provided"}
                  </div>
                  
                  <div className="mb-4">
                    <strong>Contact:</strong> {profile.contact || "Not provided"}
                  </div>
                <div className="row">
                  <Button 
                    className="col-3"
                    onClick={() => setEditing(true)} 
                    variant="primary"
                    style={{margin: "auto"}}
                  >
                    Edit Profile
                  </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
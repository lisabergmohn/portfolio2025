import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../styles/globals.module.css";
import pigeon from "../assets/pigeon.png";

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // Skicka e-post via backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      setResponseMessage(data.message);

      if (response.ok) {
        setEmail("");
        setName("");
        setMessage("");
        setLinkSent(true);
      }
    } catch (error) {
      setResponseMessage("Något gick fel, försök igen senare");
    }
  };
  return (
    <div id="contact-section">
      {!linkSent ? (
        <Form className={styles.CustomForm} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Namn</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>E-post</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Meddelande</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>

          <Button className={styles.ContactBtn} type="submit">
            Skicka
          </Button>
        </Form>
      ) : (
        <div className={styles.thankYouContainer}>
<p className={styles.message}>
      {responseMessage || 'Tack för ditt meddelande.\n\nJag återkommer inom kort.'}
    </p>
        <img
          alt="Bild på duva"
          src={pigeon}
          style={{ maxHeight: "60px" }}
          className="d-inline-block align-top"
        />
        </div>
      )}
    
    </div>
  );
}

export default Contact;

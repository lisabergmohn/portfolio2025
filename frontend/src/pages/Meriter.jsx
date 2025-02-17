import React from "react";
import styles from "../styles/globals.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Form, Button, Container } from "react-bootstrap";

function Meriter() {
  const [email, setEmail] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const [linkSent, setLinkSent] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);

      if (response.ok) {
        setEmail("");
        setLinkSent(true);
      }
    } catch (error) {
      setMessage("Ange din e-post.");
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");
      if (!token) {
    
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/verify/${token}`
        );
        const data = await response.json();

        if (response.ok) {
          setCvUrl(data.cv);
        } else {
          setMessage(data.error || "Något gick fel, försök igen senare");
        }
      } catch (error) {
        setMessage("Ange din e-postadress för att få en länk till ditt CV");
      }
    };
    verifyToken();
  }, [searchParams]);

  return (
    <div id="merit-section">
    <Container >
      <Form className={styles.CustomForm}>
        <Form.Group>
          {!linkSent && !cvUrl ? (
            <>
              <h2>Nyfiken?</h2>

              <p>
                Ange din e-post nedan för att få en engångslänk till mitt CV.
                Länken skickas direkt till din e-post och är giltig i 1 timme.
              </p>

              <Form.Control
                type="email"
                placeholder="namn@exempel.se"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={styles.message}>{message}</p>
              <Button className={styles.ContactBtn} onClick={handleSubmit}>
                Skicka länk
              </Button>
            </>
          ) : linkSent && !cvUrl ? (
            <p>Länken har skickats. Du kan nu kontrollera din e-post</p>
          ) : (
            <>
              <h2>Mitt CV</h2>
              <iframe src={cvUrl} width="100%" height="600px"></iframe>
            </>
          )}
        </Form.Group>
      </Form>
    </Container>
    </div>
  );
}

export default Meriter;

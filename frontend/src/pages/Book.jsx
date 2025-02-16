import React, { Fragment } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/globals.module.css";
import Contact from "./Contact";

function Book() {
  return (
    <Fragment>
      <Container className={styles.MyContainer}>
        <h2>Stöd i digital teknik</h2>
        <Row>
          <Col>
            <p>
              Behöver du stöd eller vägledning för att använda en mobil, dator
              eller surfplatta? Jag erbjuder möjligheten att lära dig mer om ny
              teknik i lugnt tempo, anpassat efter dina individuella behov.
            </p>
            <p>
              Mina tidigare uppdrag i Göteborgsområdet har bidragit till att många nu
              själva kan hantera sin dator eller mobil för olika
              internetrelaterade tjänster. Det kan till exempel handla om att
              använda BankID, köpa tågbiljetter eller skicka sms och e-post.
            </p>
            <p>
              Om du önskar personlig vägledning finns det möjlighet att boka
              tid. Ring 0708 - 95 75 28 eller skicka ett e-post via formuläret nedan.
            </p>
          </Col>
        </Row>
      </Container>
          {/** Kontaktformulär */}
          <Container className={styles.MyContainer} id="contact-section">
        <Row>
          <Col>
           <Contact />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Book;

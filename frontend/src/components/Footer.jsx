import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/globals.module.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function CustomFooter() {
  return (
    <Container fluid className={styles.footer}>
      <Row>
        <Col>
          <ul>
            <li>
              <a href="mailto:lisa.karlmark@gmail.com" className={styles.footerLink}>
              <FaEnvelope style={{ marginRight: "0.5rem" }} />
                Lisa B Karlmark
                </a>
            </li>
            <li>
              <a href="tel:0708-957528" className={styles.footerLink}>
              <FaPhoneAlt style={{ marginRight: "0.5rem" }} />
                0708 - 95 75 28</a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/place/Robertsh%C3%B6jd,+Göteborg" className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
                Robertshöjd, Göteborg
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomFooter;

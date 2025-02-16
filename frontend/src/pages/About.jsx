import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/globals.module.css";
import Lisa from "../assets/Lisa.jpg";
import Meriter from "./Meriter";


function Home() {
  return (
    <Fragment>
      {/** Första containern */}
      <Container className={styles.MyContainer}>
        <Row>
          <Col>
            <img className={styles.image} alt="Bild på Lisa" src={Lisa} />
            <p>
              Jag är webbutvecklare med erfarenhet av React, JavaScript,
              Node.js, HTML och CSS. Som grundare av Baskunskaper AB har jag
              arbetat med att öka digital delaktighet genom IT-pedagogik och
              tekniska lösningar. Mitt fokus ligger på att skapa funktionella
              och estetiska applikationer, samt att förklara komplex teknik på
              ett begripligt sätt.
            </p>
            <p>
              För närvarande fördjupar jag mig inom IAM, CIAM och avancerade
              React-teknologier för att vidareutveckla mina färdigheter. Min
              bakgrund inom Photoshop och design ger en kombination av teknisk
              och kreativ kompetens.
            </p>
          </Col>
        </Row>
        </Container>
     
          {/** Kontaktformulär */}
          <Container className={styles.MyContainer} id="merit-section">
        <Row>
          <Col>
           <Meriter />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Home;

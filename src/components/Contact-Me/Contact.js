import React, { useState } from "react";
import "./Contact.css";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { Element } from "react-scroll";

const Contact = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    console.log(event);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <>
      <Element id="contact" name="contact">
        <div className="portfolio-contact">
          <div className="contact-header">
            <h2>
              Contact<span>Me</span>
            </h2>
            <div className="sm_border"></div>
          </div>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  className="custominputteext"
                  required
                  type="text"
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicEmail">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  className="custominputteext"
                  required
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  className="custominputteext"
                  required
                  type="text"
                  placeholder="Subject"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                className="mb-3 "
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  placeholder="Your Message"
                  className="custominputteext"
                  as="textarea"
                  rows={5}
                />
              </Form.Group>
            </Row>
            <div className="button-container">
              {" "}
              <button type="submit" className="contact-btton">
                Send Message
              </button>
            </div>
          </Form>
        </div>
      </Element>
    </>
  );
};

export default Contact;

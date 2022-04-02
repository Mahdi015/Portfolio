import React, { useState, useEffect } from "react";
import "./Contact.css";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { Element } from "react-scroll";
import toast from "react-hot-toast";

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
  };
  const sendMessage = async () => {
    const { name, email, message, subject } = formValues;
    let details = {
      name,
      email,
      message,
      subject,
    };
    let response = await fetch(
      "http://myprotfolios.herokuapp.com/api/contactme",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      }
    );

    return response;
  };
  useEffect(async () => {
    if (validated) {
      toast.promise(sendMessage(), {
        loading: "Loading",
        success: "Message Sent        ",
        error: "Error ",
      });
      setFormValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setValidated(false);
      // let result = await response.json();
      // alert(result.status);
    }
  }, [validated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
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
                  name="name"
                  value={formValues.name}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicEmail">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  className="custominputteext"
                  required
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formValues.email}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  className="custominputteext"
                  required
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formValues.subject}
                  onChange={(e) => handleChange(e)}
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
                  name="message"
                  value={formValues.message}
                  onChange={(e) => handleChange(e)}
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

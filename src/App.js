import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import "./App.css";
import Element from "./Element";

const searchStates = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
};

const App = () => {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [search, setSearch] = useState(searchStates.NOT_STARTED);
  const [isFound, setIsFound] = useState({ found: false, foundAt: -1 });

  const arrayUpdate = (event) => {
    const inputArr = event.target.value
      .trim()
      .split(" ")
      .map((value, index) => ({
        value,
        index,
        isMatch: null,
      }));
    setArray(inputArr);
  };

  const updateElement = (event) => {
    const temp = event.target.value;
    setTarget(temp.trim());
    setSearch(searchStates.NOT_STARTED);
    setIsFound({ found: false, foundAt: -1 });
  };

  const startSearch = () => {
    if (target !== "" && search === searchStates.NOT_STARTED) {
      setSearch(searchStates.IN_PROGRESS);
    }
  };

  return (
    <div className="App">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mt-2">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter values"
                onChange={arrayUpdate}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={6} className="mt-2">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter value to be searched"
                onChange={updateElement}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={3}>
            <Button className="btn btn-success" onClick={startSearch}>
              Search
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          {search === searchStates.FINISHED && (
            <div className="mt-2">
              {isFound.foundAt !== -1
                ? `${target} found at index: ${isFound.foundAt}`
                : `${target} not found`}
            </div>
          )}
        </Row>
        <Row className="d-flex justify-content-center mt-4">
          {array.map((element, index) => (
            <Col md={1} key={index}>
              <Element
                {...{
                  array,
                  element,
                  target,
                  search,
                  isFound,
                  setIsFound,
                  index,
                  setSearch,
                  searchStates,
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;

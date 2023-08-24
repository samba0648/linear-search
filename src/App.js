import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import "./App.css";
import Element from "./Element";

const App = () => {
  const [array, setArray] = useState(null);
  const [target, setTarget] = useState(); //Element to be search
  const [search, setSearch] = useState(false); // Whether search started or not
  const [isFound, setIsFound] = useState({found:false,foundAt:-1});

  //Updating array from user input
  const arrayUpdate = async (event) => {
    let inputArr = event.target.value.trim();
    inputArr = inputArr.split(" ");
    inputArr = await inputArr.reduce((dupArr, element, index) => {
      dupArr.push({ value: element, index, isMatch: null });
      return dupArr;
    }, []);
    setArray(inputArr);
  };

  //updating target value
  const updateElement = (event) => {
    const temp = event.target.value;
    if(temp!=="" && temp  !==" "){
      setTarget(event.target.value);
    }
    else{
      setSearch(false);
      setIsFound({found:false,foundAt:-1});
      setTarget(null);
    }
    
  };
  //starting search
  const startSearch = () => {
    if (![null, undefined, " "].includes(target)) {
      setSearch(true);
    }
  };
  useEffect(()=>{
    console.log(`search ${search}`);
  })
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
                placeholder="Enter value to be search"
                onChange={updateElement}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={3}>
            <button className="btn btn-success" onClick={startSearch}>
              Search
            </button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          {array &&
            array.map((element, index) => (
              <Col md={1} key={index}>
                <Element
                  {...{
                    element,
                    target,
                    search,
                    isFound,
                    setIsFound,
                    index,
                    setSearch 
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

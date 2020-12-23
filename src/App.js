import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import SessionInfoPane from "./components/stats/SessionInfoPane";
import ScramblePane from "./components/timer/ScramblePane";
import TimeInput from "./components/timer/TimeInput";

function App() {
  return (
    <Container fluid style={{ height: "100%" }}>
      <Row className="align-items-center h-100">
        <Col xs={4} className="h-100">
          <SessionInfoPane />
        </Col>
        <Col xs={8} className="h-100">
          <div style={{ height: "20%" }}>
            <ScramblePane scramble="R U R' U'"/>
          </div>
          <Container fluid style={{ height: "80%" }}>
            <Row className="align-items-center h-100">
              <TimeInput />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

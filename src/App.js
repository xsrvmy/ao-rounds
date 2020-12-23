import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import AverageInfoCard from "./components/stats/AverageInfoCard";
import ScramblePane from "./components/timer/ScramblePane";
import TimeInput from "./components/timer/TimeInput";

function App() {
  return (
    <Container fluid style={{ height: "100%" }}>
      <Row className="align-items-center h-100">
        <Col xs={4}>
          <div>
            <AverageInfoCard
              isBest
              average={100003}
              times={[100, 10, 6100, 61000, 99999]}
              isTrimmed
            />
            <AverageInfoCard
              isWorst
              average={Infinity}
              times={[-Infinity, -Infinity, -Infinity, -Infinity, -Infinity]}
            />
          </div>
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

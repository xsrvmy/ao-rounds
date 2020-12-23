import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import AverageInfoCard from "./components/stats/AverageInfoCard";
import TimeInput from "./components/timer/TimeInput";

function App() {
  return (
    <Container fluid style={{height: "100%"}}>
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
              times={[Infinity, -Infinity, 100003, 100004, 100005]}
            />
          </div>
        </Col>
        <Col xs={8}>
          <TimeInput />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

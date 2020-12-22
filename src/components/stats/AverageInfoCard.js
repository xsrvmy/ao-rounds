import React from "react";
import { Button, Card } from "react-bootstrap";
import { centiToDisplayTime } from "../../timeUtils";

export default class AverageInfoCard extends React.Component {
  render() {
    const { isBest, isWorst, average, times, isTrimmed } = this.props;
    let minIndex = 0;
    let maxIndex = 0;
    times.forEach((time, i) => {
      console.log(typeof i);
      if (time > times[maxIndex]) maxIndex = i;
      if (time < times[minIndex]) minIndex = i;
    });
    if (minIndex === maxIndex) maxIndex = 1;

    return (
      <Card>
        <Card.Body>
          <Card.Title>
            <a
              href="#123"
              className={
                isBest ? "text-success" : isWorst ? "text-danger" : undefined
              }
            >
              {isNaN(average) ? "Incomplete" : centiToDisplayTime(average)}
            </a>
          </Card.Title>
          {times.map((time, i) => {
            return (
              <Button
                className={
                  i === maxIndex
                    ? "text-success"
                    : i === minIndex
                    ? "text-danger"
                    : undefined
                }
                variant="link"
                size="sm"
              >
                {isTrimmed && (i === maxIndex || i === minIndex)
                  ? `(${centiToDisplayTime(time)})`
                  : centiToDisplayTime(time)}
              </Button>
            );
          })}
        </Card.Body>
      </Card>
    );
  }
}

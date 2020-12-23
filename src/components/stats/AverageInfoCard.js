import React from "react";
import { Button, Card } from "react-bootstrap";
import { centiToDisplayTime } from "../../timeUtils";

export default function AverageInfoCard(props) {
  const { isBest, isWorst, average, times, isTrimmed } = props;
  let minIndex = 0;
  let maxIndex = 0;
  times.forEach((time, i) => {
    if (
      times[maxIndex] !== -Infinity &&
      (time > times[maxIndex] || time === -Infinity)
    )
      maxIndex = i;
    if (
      time !== -Infinity &&
      (time < times[minIndex] || times[minIndex] === -Infinity)
    )
      minIndex = i;
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
              key={i}
              className={
                i === maxIndex
                  ? "text-danger"
                  : i === minIndex
                  ? "text-success"
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

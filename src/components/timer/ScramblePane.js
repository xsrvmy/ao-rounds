import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

export default function ScramblePane(props) {
  const [isLoadModalShown, setLoadModalShown] = useState(false);
  const [scrambleInput, setScrambleInput] = useState("");

  const onLoadClick = () => {
    setLoadModalShown(true);
    setScrambleInput("");
  };

  const loadScrambles = () => {
    console.log(scrambleInput);
    setLoadModalShown(false);
  };

  const { scramble } = props;
  return (
    <>
      <Card className="h-100">
        <Card.Body>
          <div className="text-monospace" style={{ fontSize: "14pt" }}>
            {scramble}
          </div>
          <div className="text-right">
            <Button
              variant="outline-primary"
              size="sm"
              className="mr-2"
              onClick={onLoadClick}
            >
              Load
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              className="mr-2"
              disabled
            >
              Previous
            </Button>
            <Button variant="outline-primary" size="sm">
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={isLoadModalShown} onHide={() => setLoadModalShown(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Paste scrambles here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={scrambleInput}
            onChange={(e) => setScrambleInput(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={loadScrambles}>Load</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

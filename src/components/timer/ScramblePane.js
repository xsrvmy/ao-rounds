import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadScramblesAction,
  nextScrambleAction,
  previousScrambleAction,
} from "../../actions/scramblesActions";

export default function ScramblePane(props) {
  const [isLoadModalShown, setLoadModalShown] = useState(false);
  const [scrambleInput, setScrambleInput] = useState("");

  const currentScramble = useSelector((state) => state.scrambles.queue[0]);
  const previousScramble = useSelector((state) => state.scrambles.previous);
  const dispatch = useDispatch();

  const onLoadClick = () => {
    setLoadModalShown(true);
    setScrambleInput("");
  };

  const onModalLoadClick = () => {
    dispatch(loadScramblesAction(scrambleInput.split("\n").filter((x) => x !== "")));
    setLoadModalShown(false);
  };

  const onNextClick = () => dispatch(nextScrambleAction());

  const onPreviousClick = () => dispatch(previousScrambleAction());

  return (
    <>
      <Card className="h-100">
        <Card.Body>
          <div className="text-monospace" style={{ fontSize: "14pt" }}>
            {currentScramble || "Please load scrambles"}
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
              onClick={onPreviousClick}
              disabled={!previousScramble}
            >
              Previous
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onNextClick}
              disabled={!currentScramble}
            >
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
          <Button onClick={onModalLoadClick}>Load</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

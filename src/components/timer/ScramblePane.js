import React from "react";
import { Button, Card, Modal } from "react-bootstrap";

export default class ScramblePane extends React.Component {
  state = {
    showLoadModal: false,
    scrambleInput: "",
  };

  onLoadClick = () => {
    this.setState({
      showLoadModal: true,
      scrambleInput: "",
    });
  };

  loadScrambles = () => {
    console.log(this.state.scrambleInput);
    this.setState({
      showLoadModal: false,
    });
  };

  render() {
    const { scramble } = this.props;
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
                onClick={this.onLoadClick}
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
        <Modal
          show={this.state.showLoadModal}
          onHide={() => this.setState({ showLoadModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Paste scrambles here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              value={this.state.scrambleInput}
              onChange={(e) => this.setState({ scrambleInput: e.target.value })}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.loadScrambles}>Load</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

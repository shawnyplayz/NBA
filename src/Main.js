import axios from "axios";
import React, { Component } from "react";
import { Col, Container, Modal, Pagination, Row, Table } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bigData: null,
      player: "",
      page: 0,
      perPage: 25,
      open: false,
      team: null,
    };
  }
  componentDidMount() {
    this.getDetails();
  }
  async getDetails() {
    let resp = await axios({
      method: "get",
      url: `https://www.balldontlie.io/api/v1/players?page=${this.state.page}&per_page=${this.state.perPage}&search=${this.state.player}`,
    }).then(function (response) {
      let data = response.data.data;
      console.log("data :>> ", data);
      return data;
    });
    this.setState({
      bigData: resp,
    });
  }
  async open(e, index, el) {
    debugger;
    this.setState({
      open: true,
      team: el,
    });
    let resp = await axios({
      method: "get",
      url: `https://www.balldontlie.io/api/v1/games`,
    }).then(function (response) {
      let data = response.data.data;
      console.log("data :>> ", data);
      return data;
    });
    this.setState({
      details: resp,
    });
    // console.log("index :>> ", index);
  }
  render() {
    return (
      <div className="table ">
        {/* For the NBA Text */}
        <Row className="my-2">
          <Col md={1}></Col>
          <Col md={7}>
            <h1 className="text-primary">NBA TEAMS</h1>
          </Col>
          <Col md={4}></Col>
        </Row>
        {/* For search bar */}
        <Row className="my-5">
          <Col md={1}></Col>
          <Col md={4}>
            <div className="input-group border border-primary">
              <input
                type="text"
                className="form-control"
                placeholder="Search your Player"
                onChange={(e) =>
                  this.setState(
                    {
                      player: e.target.value,
                    },
                    () =>
                      setTimeout(() => {
                        this.getDetails();
                      }, 500)
                  )
                }
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.getDetails()}
                >
                  <AiOutlineSearch />
                </button>
              </div>
            </div>
          </Col>
          <Col md={7}></Col>
        </Row>
        {/* For the Table  */}
        <Row className="my-5">
          <Col md={1}></Col>
          <Col md={10}>
            <Table bordered hover size="sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Team Name</th>
                  <th>City Name</th>
                  <th>Abbreviation</th>
                  <th>Conference</th>
                  <th>Division</th>
                </tr>
              </thead>
              <tbody>
                {this.state.bigData != null ? (
                  this.state.bigData.map((el, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          onClick={(e) => this.open(e, index, el)}
                        >
                          <td>{el.team.full_name}</td>
                          <td>{el.team.city}</td>
                          <td>{el.team.abbreviation}</td>
                          <td>{el.team.conference}</td>
                          <td>{el.team.division}</td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          </Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={12}>
            <Pagination>
              <Pagination.Prev
                onClick={() => {
                  this.state.page != 0
                    ? this.setState({
                        page: this.state.page - 1,
                      })
                    : this.setState({
                        page: 0,
                      });
                  this.getDetails();
                }}
              />
              <Pagination.Item
                onClick={() => {
                  this.setState(
                    {
                      page: 0,
                    },
                    () => this.getDetails()
                  );
                }}
              >
                {1}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => {
                  debugger;
                  this.setState(
                    {
                      page: 3,
                    },
                    () => this.getDetails()
                  );
                }}
              >
                {4}
              </Pagination.Item>
              <Pagination.Next
                onClick={() => {
                  this.state.page === 100
                    ? this.setState(
                        {
                          page: 100,
                        },
                        () => this.getDetails()
                      )
                    : this.setState(
                        {
                          page: this.state.page + 1,
                        },
                        () => this.getDetails()
                      );
                }}
              />
            </Pagination>
          </Col>
        </Row>
        <Modal
          show={this.state.open}
          onHide={() =>
            this.setState({
              open: false,
            })
          }
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {this.state.team != null ? this.state.team.team.name : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <Row>
                <Col md={6}>Team Full Name</Col>
                <Col md={6}>
                  {this.state.team != null
                    ? this.state.team.team.full_name
                    : "  "}
                </Col>
                <Col md={6}>Total Games in 2021</Col>
                <Col md={6}></Col>
              </Row>
            </p>
            <p>
              Random Game Details :
              <Row>
                <Col md={6}>
                  <b>Date</b>
                </Col>
                <Col md={6}>
                  <b></b>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <b>Home Team</b>
                </Col>
                <Col md={6}>
                  <b></b>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <b>Home Team Score</b>
                </Col>
                <Col md={6}>
                  <b></b>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <b>Visitor team</b>
                </Col>
                <Col md={6}>
                  <b></b>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <b>Visitor team Score</b>
                </Col>
                <Col md={6}>
                  <b></b>
                </Col>
              </Row>
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Main;

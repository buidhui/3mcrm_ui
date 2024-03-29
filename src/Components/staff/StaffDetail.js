import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import PopupFormUpdate from "./PopupFormUpdateStaff";
import BreadCrum from "../breadcums/BreadCrumStaffDetail";
import url from "../url";
import ChangePassword from "./ChangePassword";
class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffDetail: []
    };
  }
  onUpdateData = data => {
    this.setState({
      staffDetail: data
    });
  };
  componentDidMount() {
    axios({
      method: "get",
      url: `${url}/staffs/${this.props.id}`
    })
      .then(respone => {
        console.log(respone.data);
        this.setState({
          staffDetail: respone.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteStaff() {
    axios({
      method: "delete",
      url: `${url}/staffs/${this.props.id}`
    })
      .then(respone => {
        console.log(respone + "xóa được chưuaaaaaaaaaaa");
      })
      .catch(error => {
        console.log(error);
      });
  }
  onDelete = () => {
    const c = window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?");
    if (c === true) {
      console.log(c);
      this.deleteStaff();
      window.location.replace("/staffs");
    } else {
      return;
    }
  };
  render() {
    var moment = require("moment");
    const staffDetail = this.state.staffDetail;
    return (
      <div>
        <Row>
          <BreadCrum customer={staffDetail} />
        </Row>
        <Row>
          <Col xl={6}>
            <Card style={{ width: "100%", margin: "15px 15px 15px 0px" }}>
              <Row>
                <Col xl={6}>
                  <span>
                    <h5 className="debt">{staffDetail.name}</h5>
                  </span>
                </Col>
              </Row>
              <Card.Body>
                <Card.Title style={{ marginTop: "30px" }}>Ghi chú</Card.Title>
                <Card.Text className="cus-note">
                  {staffDetail.note
                    ? staffDetail.note
                    : "Hiện tại không có ghi chú nào"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="detail-card" style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Thông tin nhân viên</Card.Title>
                <Card.Text>
                  Mã nhân viên : {staffDetail.id}
                  <br />
                  Giới tính : {staffDetail.gender ? "Nam" : "Nữ"}
                  <br />
                  Ngày sinh :{" "}
                  {staffDetail.dob
                    ? moment(staffDetail.dob).format("DD/MM/YYYY")
                    : "Đang cập nhật"}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="detail-card" style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Liên hệ</Card.Title>
                <Card.Text>
                  Số điện thoại : {staffDetail.phone}
                  <br />
                  Chức vụ :{" "}
                  {staffDetail.jobTitle
                    ? staffDetail.jobTitle
                    : "Chưa cập nhật"}
                  <br />
                  Email : {staffDetail.email}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr className="form-line" />
        <button
          type="button"
          className=" btn btn-danger float-left"
          onClick={this.onDelete}
        >
          Xóa nhân viên
        </button>
        <PopupFormUpdate
          open={this.props.open}
          staff={staffDetail}
          onUpdateData={this.onUpdateData}
        />
        <ChangePassword
          open={this.props.open}
          staff={staffDetail}
          onUpdateData={this.onUpdateData}
        />
      </div>
    );
  }
}

export default StaffDetail;

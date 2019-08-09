import React, { Component } from "react";
import Axios from "axios";
import url from "../url";

class DashBoardTopNv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topCustomer: [],
      totalmonthlysold: []
    };
  }

  componentDidMount() {
    Axios({
      method: "get",
      url: `${url}/staffmonthly`
    })
      .then(res => {
        // console.log(res.data);
        this.setState({
          topCustomer: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });

    Axios({
      method: "get",
      url: `${url}/totalmonthlysold`
    })
      .then(res => {
        // console.log(res.data);
        this.setState({
          totalmonthlysold: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    var { topCustomer, totalmonthlysold } = this.state;
    function formatMoney(
      amount,
      decimalCount = 2,
      decimal = "",
      thousands = ","
    ) {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : "") +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(4)
            : "")
        );
      } catch (e) {
        console.log(e);
      }
    }

    return (
      <React.Fragment>
        <div className="col-lg-4 col-md-12 col-12 col-sm-12">
          <div className="card">
            <div>
              <div className="card-header bg-info text-light">
                <h4>Nhân viên xuất sắc tuần qua</h4>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr className="text-secondary">
                      <th scope="col">Top</th>
                      <th scope="col">Tên nhân viên</th>
                      <th scope="col">Doanh Thu (VNĐ)</th>
                    </tr>
                  </thead>
                  {topCustomer.map((topCustomer, index) => (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">
                          <span className="badge badge-pill badge-primary">
                            {" "}
                            {index + 1}
                          </span>
                        </th>
                        <td> {topCustomer.name}</td>
                        <td>{formatMoney(topCustomer.values)}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>

            <div>
              <div className="card-header bg-info text-light">
                <h4>Sản phẩm bán chạy tuần qua</h4>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr className="text-secondary">
                      <th scope="col">Top</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Số lượng</th>
                    </tr>
                  </thead>
                  {totalmonthlysold.map((totalmonthlysold, index) => (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">
                          <span className="badge badge-pill badge-primary">
                            {" "}
                            {index + 1}
                          </span>
                        </th>
                        <td> {totalmonthlysold.name}</td>
                        <td> {totalmonthlysold.quantity}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashBoardTopNv;

import React from "react";
import OrderDetail from "../customer/customerGroup/CustomerGroupDetail";
const GroupCusDetail = ({ match }) => {
  return (
    <React.Fragment>
      <section className="section">
        <h1 className="section-header">
          <div>Thông tin chi tiết nhóm khách hàng</div>
        </h1>
        <OrderDetail id={match.params.id} />
      </section>
    </React.Fragment>
  );
};
export default GroupCusDetail;

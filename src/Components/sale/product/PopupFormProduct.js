import React from 'react';
import {Modal} from 'react-bootstrap';
import CustomerAddForm from './ProductAddForm';


export default function PopupForm(props) {
    const [show, setShow] = React.useState(false);
    const style = {left: '135px'} 
    return (
      <>
        <button type="button" className=" btn btn-add-cus btn-primary float-right" onClick={() => setShow(true) }>
          Thêm sản phẩm 
        </button>
  
        <Modal
          className="modal-form"  
          size="xl"
          style={style}
          show={show}
          onHide={() => setShow(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="popup-form">
              <h4>Thêm mới sản phẩm</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-form-body">
            <CustomerAddForm onClick={() => setShow(false)} onUpdateData={props.onUpdateData}/>
          </Modal.Body>
        </Modal>
      </>
    );
  }
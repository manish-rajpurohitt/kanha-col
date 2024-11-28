/**
 *
 * OrderDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import OrderMeta from '../OrderMeta';
import OrderItems from '../OrderItems';
import OrderSummary from '../OrderSummary';

const OrderDetails = props => {
  const { order, user, cancelOrder, updateOrderItemStatus, onBack } = props;
  return (
    <div className='order-details'>
      <Row>
        <Col xs='12' md='12'>
          <OrderMeta order={order} cancelOrder={cancelOrder} onBack={onBack} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs='12' lg='8'>
          <OrderItems
            order={order}
            user={user}
            updateOrderItemStatus={updateOrderItemStatus}
          />
        </Col>
        <Col xs='12' lg='4' className='mt-5 mt-lg-0'>
          <OrderSummary order={order} />
          <Col className='order-summary pt-3 mt-3'>
            <h2>Shipping Details</h2>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>Full Name</p>
              <p className='summary-value ml-auto'>{order.address.fullName}</p>
            </div>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>Phone Number</p>
              <p className='summary-value ml-auto'>{order.address.phoneNumber}</p>
            </div>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>Address</p>
              <p className='summary-value ml-auto'>{order.address.address}</p>
            </div>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>Pincode</p>
              <p className='summary-value ml-auto'>{order.address.zipCode}</p>
            </div>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>City</p>
              <p className='summary-value ml-auto'>{order.address.city}</p>
            </div>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>State</p>
              <p className='summary-value ml-auto'>{order.address.state}</p>
            </div>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>Country</p>
              <p className='summary-value ml-auto'>{order.address.country}</p>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;

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
import { ROLES } from '../../../constants';
import Button from '../../Common/Button';
import Input from '../../Common/Input';

const OrderDetails = props => {
  const { order, user, cancelOrder, updateOrderItemStatus, onBack, addShippingInfoOrder } = props;

  const [shipppingData, setShippingData] = React.useState({
    show: false,
    data:{
      provider: "",
      track: ""
    }
  })
  const saveShipping = async () => {
    await addShippingInfoOrder(order._id, {track: shipppingData.data.track, provider: shipppingData.data.provider});
    setShippingData({show: false, data: {provider: "",track: ""}});
    window.location.reload();
  }

  return (
    <div className='order-details'>
      <Row>
        <Col xs='12' md='12'>
          <OrderMeta order={order} user={user} 
            updateOrderItemStatus={updateOrderItemStatus}
            cancelOrder={cancelOrder} onBack={onBack} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs='12' lg='8'>
          <OrderItems
            order={order}
            user={user}
          />
        </Col>
        <Col xs='12' lg='4' className='mt-5 mt-lg-0'>
          <OrderSummary order={order} />
          <Col className='order-summary pt-3 mt-3'>
            <h2>Address Details</h2>
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
          <Col className='order-summary pt-3 mt-3'>
            <h2>Shipping Details</h2>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>Shipping Provider</p>
              {shipppingData.show ?  <Input
              type={'text'}
              placeholder={'Enter Provider'}
              name={'provider'}
              value={shipppingData.data.provider}
              onInputChange={(name, value) => {
                setShippingData({...shipppingData, data: {...shipppingData.data, provider: value}})
              }}
            /> : 
            <p className='summary-value ml-auto'>{order.shipping.provider}</p>}
            </div>
            <div className='d-flex align-items-center summary-item'>
              <p className='summary-label'>Shipping/Tracking Id</p>
              {shipppingData.show ?  <Input
              type={'text'}
              placeholder={'Enter Tracking ID'}
              name={'track'}
              value={shipppingData.data.track}
              onInputChange={(name, value) => {
                setShippingData({...shipppingData, data: {...shipppingData.data, track: value}})
              }}
            /> :
            <p className='summary-value ml-auto'>{order.shipping.track}</p>}
            </div>
            {user.role === ROLES.Admin ? (<>{
              !shipppingData.show ? <Button
              variant='primary'
              size='sm'
              text='Add Shipping Details'
              role='menuitem'
              onClick={() => setShippingData({...shipppingData, show: true})}
          /> : <Button
                  variant='primary'
                  size='sm'
                  text='Save Shipping Details'
                  role='menuitem'
                  onClick={() => saveShipping()}
              /> 
            }</>): <></>}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;

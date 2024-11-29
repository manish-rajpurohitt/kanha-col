/**
 *
 * OrderMeta
 *
 */

import React from 'react';

import { Row, Col, DropdownItem } from 'reactstrap';

import { CART_ITEM_STATUS } from '../../../constants';
import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { ArrowBackIcon } from '../../Common/Icon';
import DropdownConfirm from '../../Common/DropdownConfirm';
import { ORDER_STATUS, ROLES } from '../../../../../server/constants';

const OrderMeta = props => {
  const { order, user, cancelOrder, onBack, updateOrderItemStatus} = props;

  const getOrderStatusText = status => {
    switch (status) {
      case ORDER_STATUS.Payment_Initiated:
        return "Make Payment";
      case ORDER_STATUS.Payment_Failed:
        return "Payment Failed";
      case ORDER_STATUS.Payment_Success:
        return "Payment Success";
      case ORDER_STATUS.Cancelled:
        return "Order Cancelled";
      case ORDER_STATUS.Processing:
        return "Order Processing";
      case ORDER_STATUS.Shipped:
        return "Order is Shipped";
      case ORDER_STATUS.Delivered:
        return "Order Delivered";
      default:
        return "Order is Processing";
    }
  }

  const isAdmin = user.role === ROLES.Admin;
  const statuses = Object.values(CART_ITEM_STATUS);

  const renderMetaAction = () => {
    const isAdmin = user.role === ROLES.Admin;

    if(isAdmin){
    }else if (order.status !== ORDER_STATUS.Cancelled) {
      //return <Button size='sm' text='Cancel Order' disabled={true} onClick={cancelOrder} />;
      return (<DropdownConfirm label='Cancel'>
        <div className='d-flex flex-column align-items-center justify-content-center p-2'>
          <p className='text-center mb-2'>{`Are you sure you want to cancel the order ? Please write us an email to cancel your order.`}</p>
          <Button
            variant='danger'
            id='CancelOrderItemPopover'
            size='sm'
            text='Send Email'
            role='menuitem'
            className='cancel-order-btn'
            onClick={() => window.open(`mailto:kanhacollections66@gmail.com?cc=kanhacollections66+cancelorder@gmail.com&subject=Cancel Order - ${order._id}&body=Hi, I would like to cancel my order.`)}
          />
        </div>
      </DropdownConfirm>);
    }
  };

  const makePayment = () => {
    console.log(order)
    const cashfree = Cashfree({
      mode: process.env.CASHFREE_ENV //or production
    });

    let checkoutOptions = {
      paymentSessionId: order.sessId,
      redirectTarget: "_self" //optional ( _self, _blank, or _top)
    }
    cashfree.checkout(checkoutOptions);
  }

  return (
    <div className='order-meta'>
      <div className='d-flex align-items-center justify-content-between mb-3 title'>
        <h2 className='mb-0'>Order Details</h2>
        <Button
          variant='link'
          icon={<ArrowBackIcon />}
          size='sm'
          text='Back to orders'
          onClick={onBack}
        ></Button>
      </div>

      <Row>
        <Col xs='12' md='8'>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order ID</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${order._id}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Date</p>
            </Col>
            <Col xs='8'>
              <span className='order-label one-line-ellipsis'>{` ${formatDate(
                order.created
              )}`}</span>
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <p className='one-line-ellipsis'>Order Status</p>
            </Col>
            <Col xs='8'>

            {!isAdmin ? <Button
                variant='secondary'
                id='CancelOrderItemPopover'
                size='sm'
                disabled={order.status !== ORDER_STATUS.Payment_Initiated}
                onClick={() => makePayment()}
                text={getOrderStatusText(order.status)}
                role='menuitem'
              />:
          <DropdownConfirm
            label={order.status}
            className={isAdmin ? 'admin' : ''}
          >
            {statuses.map((s, i) => (
                    <DropdownItem
                      key={`${s}-${i}`}
                      onClick={() => updateOrderItemStatus(order._id, s)}
                    >
                      {s}
                    </DropdownItem>
                  ))}
          </DropdownConfirm>
              }
            </Col>
          </Row>
        </Col>
        <Col xs='12' md='4' className='text-left text-md-right'>
          {renderMetaAction()}
        </Col>
      </Row>
    </div>
  );
};

export default OrderMeta;

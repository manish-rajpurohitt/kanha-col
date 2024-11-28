/**
 *
 * Edit Address
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { useDispatch } from 'react-redux';
import { ADDRESS_CHANGE } from '../../../containers/Address/constants';

const EditAddress = props => {
  const { address, addressChange, formErrors, updateAddress, deleteAddress } =
    props;
  const [pincode, setpincode] = React.useState(address.zipCode);


  const handleSubmit = event => {
    event.preventDefault();
    updateAddress();
  };

  const dispatch = useDispatch();

  const handlepincodechange = async (e) => {
    event.preventDefault();
    let pin = e.target.value;

    if (pin.length === 6) {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const response = await res.json();
      address['city'] = response[0].PostOffice[0].Name;
      address['state'] = response[0].PostOffice[0].State;
      address['country'] = response[0].PostOffice[0].Country;
      address['zipCode'] = pin;
      dispatch({
        type: ADDRESS_CHANGE,
        payload: address
      });
    }
    setpincode(pin);
  }

  return (
    <div className='edit-address'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['fullName']}
              label={'Full Name'}
              name={'fullName'}
              placeholder={'Enter Full Name'}
              value={address.fullName}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['phoneNumber']}
              label={'Phone Number'}
              name={'phoneNumber'}
              placeholder={'Enter your Phone Number'}
              value={address.phoneNumber}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'text'}
              error={formErrors['address']}
              label={'Address'}
              name={'address'}
              placeholder={'Address: Street, House No / Apartment No'}
              value={address.address}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <div className='input-box'>
              {<label>{'Pincode'}</label>}
              <div className='input-text-block'>
                <input
                  className={'input-text'}
                  type={'text'}
                  onChange={e => handlepincodechange(e)}
                  name={'Pincode'}
                  value={pincode}
                  placeholder={"Enter here Pincode"}
                />
              </div>
            </div>
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['city']}
              label={'City'}
              disabled={true}
              name={'city'}
              placeholder={'City'}
              value={address.city}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['state']}
              label={'State'}
              disabled={true}
              name={'state'}
              placeholder={'State'}
              value={address.state}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['country']}
              label={'Country'}
              name={'country'}
              disabled={true}
              placeholder={'Please Enter Your Country'}
              value={address.country}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Checkbox
              id={'default'}
              label={'As the Default'}
              name={'isDefault'}
              checked={address.isDefault}
              onChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteAddress(address._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditAddress;

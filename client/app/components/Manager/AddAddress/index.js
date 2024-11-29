/**
 *
 * AddAddress
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import { useDispatch } from 'react-redux';
import { ADDRESS_CHANGE } from '../../../containers/Address/constants';
import Loader from '../../Common/Loader';

const AddAddress = props => {
  const { addressFormData, formErrors, addressChange, addAddress } = props;
  const [pincode, setpincode] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);


  const handleSubmit = event => {
    event.preventDefault();
    addAddress();
  };

  const dispatch = useDispatch();

  const handlepincodechange = async (e) => {
    event.preventDefault();
    let pin = e.target.value;

    if (pin.length === 6) {
      try{
        setIsLoading(true);
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const response = await res.json();
        addressFormData['city'] = response[0].PostOffice[0].Name;
        addressFormData['state'] = response[0].PostOffice[0].State;
        addressFormData['country'] = response[0].PostOffice[0].Country;
        addressFormData['zipCode'] = pin;
        dispatch({
          type: ADDRESS_CHANGE,
          payload: addressFormData
        });
        setIsLoading(false);
      }
      catch(err){
        console.log("Pincode not found.");
        setIsLoading(false);
      }
    }else{
      addressFormData['city'] = "";
      addressFormData['state'] = "";
      addressFormData['country'] = "";
      addressFormData['zipCode'] = pin;
      dispatch({
        type: ADDRESS_CHANGE,
        payload: addressFormData
      });
    }
    setpincode(pin);
  }

  return (
    <div className='add-address'>
      <Loader isLoading={isLoading} />
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['fullName']}
              label={'Full Name'}
              name={'fullName'}
              placeholder={'Enter Full Name'}
              value={addressFormData.fullName}
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
              value={addressFormData.phoneNumber}
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
              value={addressFormData.address}
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
              name={'city'}
              disabled={true}
              placeholder={'City'}
              value={addressFormData.city}
              onInputChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6' md='12'>
            <Input
              type={'text'}
              error={formErrors['state']}
              label={'State'}
              disabled={true}
              name={'state'}
              placeholder={'State'}
              value={addressFormData.state}
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
              placeholder={'Please Enter Your country'}
              value={addressFormData.country}
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
              checked={addressFormData.isDefault}
              onChange={(name, value) => {
                addressChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-address-actions'>
          <Button type='submit' text='Add Address' />
        </div>
      </form>
    </div>
  );
};

export default AddAddress;

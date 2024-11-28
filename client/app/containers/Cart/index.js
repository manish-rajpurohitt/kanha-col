/*
 *
 * Cart
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import Checkout from '../../components/Store/Checkout';
import { BagIcon, CloseIcon } from '../../components/Common/Icon';
import Button from '../../components/Common/Button';
import SelectOption from '../../components/Common/SelectOption';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { handleAddressSelect } from '../Address/actions';
import Select from 'react-select';

class Cart extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      selectedAddress: ""
    }
  }

  componentDidMount() {
    try {
      let token = localStorage.getItem("token");

      if (token)
        this.props.fetchAddresses();
    }
    catch (err) {
      console.log(err);
    }
  }

  formattedAddress = (add) => {
    return add.fullName + ", " + add.phoneNumber + ", " + add.address + ", " + add.city + ", " + add.zipCode + ", " + add.state + ", " + add.country;
  }

  handleAddressSelect = (val) => {
    console.log(val);
    if (val.value === "Add address") {
      window.open("/dashboard/address/add", "_self");
    } else {
      this.setState({ selectedAddress: val });
    }
  }

  render() {
    const {
      isCartOpen,
      cartItems,
      cartTotal,
      toggleCart,
      handleShopping,
      handleCheckout,
      handleRemoveFromCart,
      placeOrder,
      authenticated,
      isLoading,
      addresses
    } = this.props;

    return (
      <div className='cart'>
        <div className='cart-header'>
          {isLoading && (
            <LoadingIndicator />
          )}
          {isCartOpen && (
            <Button
              borderless
              variant='empty'
              ariaLabel='close the cart'
              icon={<CloseIcon />}
              onClick={toggleCart}
            />
          )}
        </div>
        {cartItems.length > 0 ? (
          <div className='cart-body'>
            <CartList
              toggleCart={toggleCart}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </div>
        ) : (
          <div className='empty-cart'>
            <BagIcon />
            <p>Your shopping cart is empty</p>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className='cart-checkout'>
            <div style={{ padding: "2%" }}>
              {<label>{"Select Address"}</label>}
              <Select
                className='select-container'
                classNamePrefix='react-select'
                value={this.state.selectedAddress}
                options={[{ label: "Add address", value: "Add address" }, ...addresses.map(x => ({ label: this.formattedAddress(x), value: x._id }))]}
                onChange={value => this.handleAddressSelect(value)}
              />
            </div>
            <CartSummary cartTotal={cartTotal} />
            <Checkout
              handleShopping={handleShopping}
              handleCheckout={handleCheckout}
              placeOrder={placeOrder}
              authenticated={authenticated}
              selectedAddress={this.state.selectedAddress}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    authenticated: state.authentication.authenticated,
    addresses: state.address.addresses,
    isLoading: state.product.isLoading
  };
};

export default connect(mapStateToProps, actions)(Cart);

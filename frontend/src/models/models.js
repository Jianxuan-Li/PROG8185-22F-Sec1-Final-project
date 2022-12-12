class ShippingAddress {
  constructor() {
    this.fname = "";
    this.lname = "";
    this.address = "";
    this.city = "";
    this.state = "";
    this.zip = "";
    this.phone = "";
    this.email = "";
  }
}


class Payment {
  constructor() {
    this.cardNumber = "";
    this.expirationDate = "";
    this.securityCode = "";
  }
}


export { ShippingAddress, Payment };
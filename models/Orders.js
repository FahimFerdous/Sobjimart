class Order {
  constructor(
    id,
    items,
    totalAmount,
    userName,
    email,
    address,
    phone,
    date,
    orderId,
    isDelivered
  ) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.userName = userName;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.date = date;
    this.orderId = orderId;
    this.isDelivered = isDelivered;
  }
}

export default Order;

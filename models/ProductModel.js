class Products {
  constructor(
    id,
    category,
    name,
    unitPrice,
    totalQuantity,
    imageUrl,
    description,
    minOrder,
    storedDate
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.unitPrice = unitPrice;
    this.totalQuantity = totalQuantity;
    this.imageUrl = imageUrl;
    this.description = description;
    this.minOrder = minOrder;
    this.storedDate = storedDate;
  }
}

export default Products;

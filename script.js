// Массив товаров и цен
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];


class GoodsItem {
  constructor({ title = 'Shirt', price = 100 }) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
      </div>
    `
  }
}

class GoodsList {
  constructor() {
    this.goods = goods;
  }
  getSum() {
    return this.goods.reduce((prev, { price }) => prev + price, 0);
  }
  render() {
    const _goods = [...this.goods];
    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    })
    document.querySelector('.goods-list').innerHTML = _goodsItems.join('');
  }
}

class Basket {
  setVision() { }
  render() { }
}

class BasketItem {
  setCount() { }
  deleteItem() { }
  render() { }
}

onload = () => {
  const goodsList = new GoodsList();
  goodsList.render();
}
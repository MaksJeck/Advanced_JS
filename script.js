// Массив товаров и цен на них
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const reformData = (items) => {
  return items.map(({ product_name, ...rest }) => {
    return {
      ...rest,
      title: product_name
    }
  })
}

const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS_POSTFIX = "/catalogData.json";
const BASKET_GOODS_POSTFIX = "/getBasket.json";
const ADD_GOOD_TO_BASKET_POSTFIX = "/addToBasket.json";
const DELETE_GOOD_TO_BASKET_POSTFIX = "/deleteFromBasket.json";

const service = function (url, postfix, method = "GET") {
  return new Promise((resolve, reject) => {
    fetch(`${url}${postfix}`, {
      method
    }).then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data)
    })
  })
}

const data = JSON.stringify(goods);

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
  // constructor() {
  //   this.goods = goods;
  // }
  getSum() {
    return this.goods.reduce((prev, { price }) => prev + price, 0);
  }
  addGoodToBasket() {
    return service(URL, ADD_GOOD_TO_BASKET_POSTFIX, "POST").then((data) => {
      return reformData(data);
    });
  }

  setGoods() {
    return service(URL, GOODS_POSTFIX).then((data) => {
      return reformData(data);
    });
  }
  render() {
    this.setGoods().then((data) => {
      this.goods = data;
      const _goods = [...this.goods];
      const _goodsItems = _goods.map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      })
      document.querySelector('.goods-list').innerHTML = _goodsItems.join('');
    });
  }
}

class Basket {
  setGoods() {
    return service(URL, BASKET_GOODS_POSTFIX).then((data) => {
      this.goods = reformData(data.contents);
    });
  }

  deleteGoodToBasket(id) {
    return service(URL, `${DELETE_GOOD_TO_BASKET_POSTFIX}/${id}`, "DELETE").then((data) => {
      return reformData(data);
    });
  }
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

// const basket = new Basket();
// basket.setGoods().then(() => {
// });
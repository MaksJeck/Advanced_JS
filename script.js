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
    // setTimeout(() => {

    // }, 1000)
  })
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
  Vue.component('custom-button', {
    props: ['click'],
    template: `
      <button @click="$emit('click')">
      <slot></slot>
      </button>
    `
  });

  Vue.component('goods-item', {
    props: ['item'],
    template: `
    <div class="goods-item">
      <h3>{{item.title}}</h3>
      <div> {{item.price}} </div>
      <div>
      <custom-button>Добавть товар</custom-button>
      </div>
    </div>
    `
  });

  Vue.component('basket', {
    props: ['close'],
    data: function () {
      return {
        basketGoods: []
      }
    },
    template: `
    <div class="basket-box">
    <div class="box">
      <h1>Корзина</h1>
      <custom-button @click="$emit('close')">Закрыть</custom-button> 
      </div>
      <div>
      <basket-item v-for="item in basketGoods" :item="item"></basket-item>
      </div>             
    </div>
    `,
    mounted() {
      service(URL, BASKET_GOODS_POSTFIX).then((data) => {
        const result = reformData(data.contents);
        this.basketGoods = result;
      });
    },
  });

  Vue.component('basket-item', {
    props: ['item'],
    template: `
    <div class="basket-item">
      <h3>{{item.title}}</h3>
      <div> {{item.price}} </div>
    `
  });

  Vue.component('search', {
    props: ['searchQuery'],
    template: `
    <input type="text" v-model="searchQuery">
    `
  });

  const app = new Vue({
    el: '#app',
    data: {
      goods: [],
      filteredGoods: [],
      search: '',
      basketVision: false
    },
    mounted() {
      service(URL, GOODS_POSTFIX).then((data) => {
        const result = reformData(data);
        this.goods = result;
        this.filteredGoods = result;
      });
    },
    methods: {
      filter() {
        this.filteredGoods = this.goods.filter(({ title }) => {
          return new RegExp(this.search, 'i').test(title);
        });
      },
      showBasket() {
        this.basketVision = true;
      },
      closeBasket() {
        this.basketVision = false;
      }
    }
  });
}

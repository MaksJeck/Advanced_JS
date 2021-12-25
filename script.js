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

const URL = "http://localhost:8080";
const GOODS_POSTFIX = "/goods.json";
const BASKET_GOODS_POSTFIX = "/getBasket.json";
const ADD_GOOD_TO_BASKET_POSTFIX = "/addToBasket.json";
const DELETE_GOOD_TO_BASKET_POSTFIX = "/deleteFromBasket.json";

const fetchAddGood = (id) => {
  fetch(`${URL}/${id}`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    }
  })
}

const fetchAddBasketGoods = () => {
  return fetch(`${URL}/basketgoods`).then((res) => {
    return res.json()
  }).then((data) => {
    return data
  })
}

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
      <custom-button @click="addGood">Добавть товар</custom-button>
      </div>
    </div>
    `,
    methods: {
      addGood() {
        fetchAddGood(this.item.id);
      }
    }
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
      fetchAddBasketGoods().then((data) => {
        this.basketGoods = data;
      })
    },
  });

  Vue.component('basket-item', {
    props: ['item'],
    template: `
    <div class="basket-item">
      <div>{{item.title}}</div>
      <div> {{item.price}} </div>
      <div> {{item.count}} </div>
    `
  });

  // Vue.component('search', {
  //   props: [''],
  //   template: `
  //   <div>
  //   <input type="search" v-model="search" class="search" placeholder="Поиск...">
  //   <div>{{searchHandler}}</div>
  //   </div>
  //   `
  // });

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
        this.goods = data;
        this.filteredGoods = data;
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

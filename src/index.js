import { fetchAddGood, fetchAddBasketGoods, service } from './services';
import { URL, GOODS_POSTFIX, BASKET_GOODS_POSTFIX, DELETE_GOOD_TO_BASKET_POSTFIX } from './constants';
import * from './components/Basket';
import * from './components/goods-item';
import * from './components/basket-item';
import * from './components/custom-button';

const reformData = (items) => {
  return items.map(({ product_name, ...rest }) => {
    return {
      ...rest,
      title: product_name
    }
  })
}

onload = () => {
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

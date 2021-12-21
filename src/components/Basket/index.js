import {fetchAddBasketGoods} from '../../services';

export default Vue.component('basket', {
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
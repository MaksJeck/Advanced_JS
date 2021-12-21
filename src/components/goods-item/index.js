import {fetchAddGood} from '../../services';

export default Vue.component('goods-item', {
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
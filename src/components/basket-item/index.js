export default Vue.component('basket-item', {
    props: ['item'],
    template: `
  <div class="basket-item">
    <div>{{item.title}}</div>
    <div> {{item.price}} </div>
    <div> {{item.count}} </div>
  `
  });
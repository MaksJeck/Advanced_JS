// Массив товаров и цен на них
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

/**
 * Функция возвращает разметку в html со списком товаров и цен
 * @param {} param0 
 * @returns 
 */
const renderGoodsItem = ({ title = 'Shirt', price = 100 }) =>
  `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`

/**
 * Функция собирает все товары в один список и записывает в контейнер .goods-list
 * @param {*} list 
 */
const renderGoodsList = (list) => {
  // после каждого товара добавляется запятая - это происходит, потому-что
  // выводится список свойств, из массива, и они автоматом разделяются запятой
  // Чтобы избавиться от запятой, используем оператор соединения "join" с пустой
  // строкой (' ');
  let goodsList = list.map((item) => renderGoodsItem(item)).join('');
  document.querySelector('.goods-list').innerHTML = goodsList;
}

onload = () => {
  renderGoodsList(goods);
}
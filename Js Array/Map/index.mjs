// let array = [1,2,3,4,5];
// let doubleArr = array.map((item,index,arr) => {
//   console.log(item * 2)
// })
// console.log(doubleArr)

let products = [
  {
    name : 'laptop1',
    price : 1000,
    count : 3,
  },
  {
    name : 'laptop2',
    price : 2000,
    count : 3,
  },
  {
    name : 'laptop3',
    price : 3000,
    count : 3,
  },
]


let totalProducts = products.map(item => ({
  name : item.name,
  totalPrice : item.price * item.count
}));
console.log(totalProducts)


// let numbers = [1,3,5,6,29,30];

// let total = numbers.reduce(sum,0);
// function sum(acc,value){
//   console.log(value)
//    return acc += value;
// }
// console.log(total)


// let numbers = [1,3,5,96,29,30];

// let max = numbers.reduce(callback,0);
// function callback(acc,value){
//   if(acc < value){
//     return value;
//   }
//   else{
//     return acc;
//   }
// }
// console.log(max)



let products = [
  {
    price : 1000,
    count : 3
  },
  {
    price : 2000,
    count : 2
  },
  {
    price : 1000,
    count : 5
  },
]

let totalPrice = products.reduce((acc,val) => acc + (val.price * val.count) ,0);
console.log(totalPrice)
1️⃣ What is the difference between var, let, and const?


Var:-
Var(var) is function-scoped (or global), hoisted, re-declarable by which we can store a variable.


Let:-
The let keyword by which we can store a variables that declared with let must be write before variable name or declared before use , that are block scope , it cannot be redeclared in the same scope.


Const:-
The const keyword was introduced in ES6 (2015), variables defined with const cannot be redeclared, cannot reassigned and it is block scope.





2️⃣ What is the spread operator (...)?


The Spread Operator (...) is a feature of JavaScript that allows to expand (spread) the elements of an array, object, or iterable into individual elements.

It is written using three dots (...) notation.

For some example I will explain it:-

✡️It expands an array into individual elements-
const numbers = [1, 2, 3];
console.log(...numbers);
Output: 1 2 3


✡️Used to combine array-
const a = [1, 2];
const b = [3, 4];
const c = [...a, ...b];
console.log(c);
Output:- {name: "Diponkor", age: 20}


✡️Updating Object Values-
const user = {
  name: "Diponkor",
  age: 20
};
const updatedUser = {
  ...user,
  age: 21
};
Output:- {name: "Diponkor", age: 21}


✡️It can pass array values as function arguments-
function sum(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log(sum(...nums));
Output;-6





3️⃣ What is the difference between map(), filter(), and forEach()?
map()
The map() function receives a function as a parameter and will apply the code on each element and returns an entirely new array. It will not change the original array.
A map() function returns a new array and thus it should only be used if you are going to use the returned array else one should prefer forEach() function.
Syntax :
map((element) => { /* Coding Logic*/ })
map((element, index) => { /* Coding Logic */ })
map((element, index, mapArray) => { /* Coding Logic */ })


filter()
The filter() method receives function as a parameter. It runs the function for each element in the array. It will return the new array which satisfies the condition applied. It will not change the original array.
Syntax:
filter((element) => { /* … */ } )
filter((element, index) => { /* … */ } )
filter((element, index, array) => { /* … */ } )


forEach()
The forEach() function receives a function as an argument and it applies the same code to every element. It will not return anything, it just applies the conditions to every element. It will not change the original array.
The return value of forEach() method is undefined. The forEach() method does not wait until promises are resolved.




4️⃣ What is an arrow function?
An Arrow Function is a shorter way to write a function in JavaScript. It was introduced in ES6 (ECMAScript 2015) and uses the => (arrow) syntax.

For an example:-
const calculate = (a, b) => {
  let sum = a + b;
  let product = a * b;
  return `Sum: ${sum}, Product: ${product}`;
};





5️⃣ What are template literals?

Template literals (also known as template strings) are a flexible way to work with strings in JavaScript. Traditional strings that use single (') or double (") quotes but template literals are delimited by backtick (`) characters.

For an Example:-

let price = 10;
let VAT = 0.25;

let total = `Total: ${(price * (1 + VAT)).toFixed(2)}`;

Output:- Total: 12.25




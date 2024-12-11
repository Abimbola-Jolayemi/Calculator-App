const expression = "3 + 5 * 2"; // Example expression
const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g); // Tokenizing the expression
// tokens would be ["3", "+", "5", "*", "2"]

let result1 = parseFloat(tokens[0]);
let result2 = parseFloat(tokens[1]);
let result3 = parseFloat(tokens[2]);
let result4 = parseFloat(tokens[3]);
console.log(result1, result2, result3, result4);
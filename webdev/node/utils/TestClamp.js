const currency = require("./Clamp.js");

let value = 100;

console.log(`$${value} CAD = $${currency.canadianToUS(100)} US`);
console.log(`$${value} US = $${currency.UStoCanadian(100)} CAD`)
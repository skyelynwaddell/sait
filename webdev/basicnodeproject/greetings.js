//CPNT-262 Skye Waddell Node JS Day 8 to 13
//May 2024

function Greeting()
{
    let greeting = "Hello!"; //set default greeting 

    let number = Math.floor(Math.random() * 3);

    if (number === 0) greeting = "Good Morning!"
    if (number === 1) greeting = "Good Evening!"
    if (number === 2) greeting = "Good Afternoon!"

    return greeting;
}

module.exports = { Greeting }
const canadianDollar = 0.73;
function roundTwo(amt){
    return Math.round(amt * 100) / 100;
}

//two ways to export functions (arrows/normal)
//lambda/arrow functions automatically return the result.

exports.canadianToUS = (canadian) => roundTwo(canadian * canadianDollar);

exports.canadianToUS = canadian => roundTwo(canadian * canadianDollar);

exports.canadianToUS = (canadian) => 
    roundTwo(canadian * canadianDollar);

exports.UStoCanadian = function(us){
    return roundTwo(us / canadianDollar);
}




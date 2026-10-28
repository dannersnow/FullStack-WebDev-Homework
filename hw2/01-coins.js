/** Exercise 01 - Coins **/

// Add your function here
const calculateChange = function (amount) {
  // check if number
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return "Error: must be a valid number";
  }
  // check edge cases
  if (amount > 100) {
    return "Error: the number is too large";
  }
  if (amount < 0) {
    return "Error: the number cannot be less than 0";
  }
  if (amount === 0) {
    return "No change needed";
  }

  // convert dollars into cents first
  let cents = Math.round(amount * 100);

  // then we calculate each coin
  const dollars = Math.floor(cents / 100);
  cents = cents % 100;

  const quarters = Math.floor(cents / 25);
  cents = cents % 25;

  const dimes = Math.floor(cents / 10);
  cents = cents % 10;

  const nickels = Math.floor(cents / 5);
  cents = cents % 5;

  const pennies = cents;

  // output begins here: using backticks so variables are substituted
  let result = `$${amount.toFixed(2)} ==> `;

  // check if there is at least one of each, if there is 1 of any, use the appropriate word
  if (dollars > 0) {
    result += `${dollars} dollar${dollars !== 1 ? "s" : ""}, `;
  }
  if (quarters > 0) {
    result += `${quarters} quarter${quarters !== 1 ? "s" : ""}, `;
  }
  if (dimes > 0) {
    result += `${dimes} dime${dimes !== 1 ? "s" : ""}, `;
  }
  if (nickels > 0) {
    result += `${nickels} nickel${nickels !== 1 ? "s" : ""}, `;
  }
  if (pennies > 0) {
    result += `${pennies} penn${pennies !== 1 ? "ies" : "y"}`;
  }

  // remove junk from output
  result = result.replace(/, $/, "");

  return result;
};

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Add additional test cases here
console.log(calculateChange(0.0));
// $0.00 ==> No change needed
console.log(calculateChange(99.99));
// $99.99 ==> 99 dollars, 3 quarter, 2 dimes, 4 pennies
console.log(calculateChange("20"));
// Error: must be a valid number
// This is a string!!!
console.log(calculateChange(NaN));
// Error: must be a valid number
console.log(calculateChange(-5));
// Error: the number cannot be less than 0
console.log(calculateChange(1.2365));
// line 21 converts numbers with too many decimal places to the correct format
// $1.24 ==> 1 dollar, 2 dimes, 4 pennies

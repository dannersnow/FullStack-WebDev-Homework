/** Exercise 01 - Fizzbuzz

Problem: 

Given an integer n, return a string array answer (1-indexed) where:

answer[i] === "FizzBuzz" if i is divisible by 3 and 5.
answer[i] === "Fizz" if i is divisible by 3.
answer[i] === "Buzz" if i is divisible by 5.
answer[i] === i (as a string) if none of the above conditions are true.
 

Example 1:

Input: n = 3
Output: ["1","2","Fizz"]

Example 2:

Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]

Example 3:

Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

**/

// fizzbuzz takes number n as an argument
function fizzbuzz(n) {
  // empty array to store answer in
  const answer = [];

  // start at 1 and loop until we get to n
  for (let i = 1; i <= n; i++) {
    // each if block checks agains the divisibility requirements
    // it is important to check for this first, because the others need to be true in order for this condition to be true
    if (i % 3 === 0 && i % 5 === 0) {
      answer.push("FizzBuzz");
    } else if (i % 3 === 0) {
      answer.push("Fizz");
    } else if (i % 5 == 0) {
      answer.push("Buzz");
      // if none of the above are true, push the actual number
    } else {
      answer.push(String(i));
    }
  }

  // return the now filled in array
  return answer;
}

// TESTING OUTPUTS
console.log(fizzbuzz(3));
console.log(fizzbuzz(5));
console.log(fizzbuzz(15));

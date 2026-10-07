/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

// takes in an array of ints (nums) and a target num. Returns two array indices that add up to target
function twosum(nums, target) {
  // arrays begin at index 0 in javascript
  // i represents current number
  for (let i = 0; i < nums.length; i++) {
    // loop beginning at the number after i
    for (let j = i + 1; j < nums.length; j++) {
      // inside each outter and inner loop, we add those two together to check for condition
      if (nums[i] + nums[j] === target) {
        // if true, we return those two numbers and have our answer!
        return [i, j];
      }
    }
  }
}

// TESTING OUTPUT
console.log(twosum([2, 7, 11, 15], 9));
console.log(twosum([3, 2, 4], 6));
console.log(twosum([3, 3], 6));

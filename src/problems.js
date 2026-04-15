export const CATEGORIES = [
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Backtracking",
  "Intervals",
  "Math & Bit Manipulation",
];

export const PROBLEMS = [
  // ─── ARRAYS & HASHING ───────────────────────────────────────────────────────
  {
    id: 1, title: "Two Sum", cat: "Arrays & Hashing", diff: "Easy",
    pattern: "Hash Map", tags: ["hash map", "complement", "O(n)"],
    src: "LC", link: "https://leetcode.com/problems/two-sum/",
    desc: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume each input has exactly one solution.",
    hint: "Use a hash map to store each number → index as you iterate. For each element, check if (target - element) is already in the map before inserting the current element.",
    code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return []; // no solution found
}

// Test
console.log(twoSum([2,7,11,15], 9)); // [0,1]
console.log(twoSum([3,2,4], 6));     // [1,2]`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 2, title: "Contains Duplicate", cat: "Arrays & Hashing", diff: "Easy",
    pattern: "Hash Set", tags: ["set", "frequency"],
    src: "LC", link: "https://leetcode.com/problems/contains-duplicate/",
    desc: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    hint: "Use a Set. For each number, if it's already in the set return true; otherwise add it.",
    code: `function containsDuplicate(nums) {
  const seen = new Set();

  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }

  return false;
}

console.log(containsDuplicate([1,2,3,1])); // true
console.log(containsDuplicate([1,2,3,4])); // false`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 3, title: "Valid Anagram", cat: "Arrays & Hashing", diff: "Easy",
    pattern: "Frequency Count", tags: ["hash map", "string", "frequency"],
    src: "LC", link: "https://leetcode.com/problems/valid-anagram/",
    desc: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    hint: "Count character frequencies in s, then decrement for t. Any non-zero count means it's not an anagram.",
    code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }

  return true;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false`,
    complex: "Time: O(n) · Space: O(1) — only 26 letters",
  },
  {
    id: 4, title: "Group Anagrams", cat: "Arrays & Hashing", diff: "Medium",
    pattern: "Sorting + Hash Map", tags: ["hash map", "string", "sorting"],
    src: "LC", link: "https://leetcode.com/problems/group-anagrams/",
    desc: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    hint: "Sort each word alphabetically to get a canonical key. Words with the same key are anagrams.",
    code: `function groupAnagrams(strs) {
  const map = new Map();

  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }

  return [...map.values()];
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// [["eat","tea","ate"],["tan","nat"],["bat"]]`,
    complex: "Time: O(n·k log k) · Space: O(n·k)",
  },
  {
    id: 5, title: "Top K Frequent Elements", cat: "Arrays & Hashing", diff: "Medium",
    pattern: "Bucket Sort", tags: ["bucket sort", "frequency", "O(n)"],
    src: "LC", link: "https://leetcode.com/problems/top-k-frequent-elements/",
    desc: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    hint: "Count frequencies, then use bucket sort: create an array indexed by frequency (1 to n). Fill buckets, read top-k from the end.",
    code: `function topKFrequent(nums, k) {
  const count = new Map();
  const freq = Array.from({ length: nums.length + 1 }, () => []);

  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  for (const [n, c] of count) freq[c].push(n);

  const res = [];
  for (let i = freq.length - 1; i >= 0 && res.length < k; i--) {
    res.push(...freq[i]);
  }

  return res.slice(0, k);
}

console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1,2]`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 6, title: "Product of Array Except Self", cat: "Arrays & Hashing", diff: "Medium",
    pattern: "Prefix & Suffix Product", tags: ["prefix", "suffix", "no division"],
    src: "LC", link: "https://leetcode.com/problems/product-of-array-except-self/",
    desc: "Given an integer array nums, return an array answer such that answer[i] equals the product of all elements except nums[i]. Must run in O(n) without using division.",
    hint: "Two passes: first build prefix products left-to-right, then multiply suffix products right-to-left.",
    code: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = new Array(n).fill(1);

  // Pass 1: prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }

  // Pass 2: suffix products
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }

  return res;
}

console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]`,
    complex: "Time: O(n) · Space: O(1) output only",
  },
  {
    id: 7, title: "Longest Consecutive Sequence", cat: "Arrays & Hashing", diff: "Medium",
    pattern: "Hash Set + Sequence Start", tags: ["set", "sequence", "O(n)"],
    src: "LC", link: "https://leetcode.com/problems/longest-consecutive-sequence/",
    desc: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Must run in O(n).",
    hint: "Put all numbers in a Set. Only start counting a sequence if (n-1) is NOT in the set — that means n is the start.",
    code: `function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let best = 0;

  for (const n of numSet) {
    if (!numSet.has(n - 1)) { // n is the start of a sequence
      let cur = n;
      let streak = 1;
      while (numSet.has(cur + 1)) { cur++; streak++; }
      best = Math.max(best, streak);
    }
  }

  return best;
}

console.log(longestConsecutive([100,4,200,1,3,2])); // 4 → [1,2,3,4]`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 8, title: "Encode and Decode Strings", cat: "Arrays & Hashing", diff: "Medium",
    pattern: "Length-Prefix Encoding", tags: ["string", "design", "serialization"],
    src: "LC", link: "https://leetcode.com/problems/encode-and-decode-strings/",
    desc: "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and decoded back to the original list.",
    hint: "Prepend each string with its length followed by a delimiter like '#'. Decode by reading the length, skipping '#', then reading that many characters.",
    code: `function encode(strs) {
  return strs.map(s => s.length + '#' + s).join('');
}

function decode(s) {
  const res = [];
  let i = 0;

  while (i < s.length) {
    let j = i;
    while (s[j] !== '#') j++;       // find delimiter
    const len = parseInt(s.slice(i, j));
    res.push(s.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }

  return res;
}

const encoded = encode(["hello","world"]);
console.log(decode(encoded)); // ["hello","world"]`,
    complex: "Time: O(n) · Space: O(n)",
  },

  // ─── TWO POINTERS ────────────────────────────────────────────────────────────
  {
    id: 9, title: "Valid Palindrome", cat: "Two Pointers", diff: "Easy",
    pattern: "Two Pointers Inward", tags: ["two pointers", "string", "alphanumeric"],
    src: "LC", link: "https://leetcode.com/problems/valid-palindrome/",
    desc: "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.",
    hint: "Use two pointers from both ends. Skip non-alphanumeric characters. Compare characters case-insensitively.",
    code: `function isPalindrome(s) {
  let l = 0, r = s.length - 1;

  while (l < r) {
    while (l < r && !isAlphanumeric(s[l])) l++;
    while (l < r && !isAlphanumeric(s[r])) r--;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l++; r--;
  }

  return true;
}

function isAlphanumeric(c) {
  return /[a-zA-Z0-9]/.test(c);
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 10, title: "Two Sum II – Input Array Is Sorted", cat: "Two Pointers", diff: "Medium",
    pattern: "Two Pointers Inward", tags: ["two pointers", "sorted", "1-indexed"],
    src: "LC", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    desc: "Given a 1-indexed sorted array, return indices of two numbers that add up to the target. Use O(1) extra space.",
    hint: "Two pointers at both ends. If sum too small, move left pointer right. If too large, move right pointer left.",
    code: `function twoSumII(numbers, target) {
  let l = 0, r = numbers.length - 1;

  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1]; // 1-indexed
    else if (sum < target) l++;
    else r--;
  }

  return [];
}

console.log(twoSumII([2,7,11,15], 9)); // [1,2]`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 11, title: "3Sum", cat: "Two Pointers", diff: "Medium",
    pattern: "Sort + Two Pointers", tags: ["two pointers", "sorting", "dedup"],
    src: "LC", link: "https://leetcode.com/problems/3sum/",
    desc: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that they sum to zero and the indices are all different. The solution must not contain duplicate triplets.",
    hint: "Sort the array. For each element nums[i], use two pointers on the rest. Skip duplicates at every level.",
    code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip dup

    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }

  return res;
}

console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]`,
    complex: "Time: O(n²) · Space: O(1)",
  },
  {
    id: 12, title: "Container With Most Water", cat: "Two Pointers", diff: "Medium",
    pattern: "Greedy Two Pointers", tags: ["two pointers", "area", "greedy"],
    src: "LC", link: "https://leetcode.com/problems/container-with-most-water/",
    desc: "Given n vertical lines at positions i with heights height[i], find two lines that together form a container holding the most water.",
    hint: "Two pointers. Always move the pointer pointing to the shorter line, since moving the taller one can only decrease width without increasing height.",
    code: `function maxArea(height) {
  let l = 0, r = height.length - 1;
  let max = 0;

  while (l < r) {
    const water = Math.min(height[l], height[r]) * (r - l);
    max = Math.max(max, water);
    if (height[l] < height[r]) l++;
    else r--;
  }

  return max;
}

console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 13, title: "Trapping Rain Water", cat: "Two Pointers", diff: "Hard",
    pattern: "Two Pointers with Max Tracking", tags: ["two pointers", "prefix max", "water"],
    src: "LC", link: "https://leetcode.com/problems/trapping-rain-water/",
    desc: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    hint: "Two pointers tracking left_max and right_max. Water at position i = min(left_max, right_max) - height[i]. Process the side with the smaller max first.",
    code: `function trap(height) {
  let l = 0, r = height.length - 1;
  let lMax = 0, rMax = 0, res = 0;

  while (l < r) {
    if (height[l] <= height[r]) {
      lMax = Math.max(lMax, height[l]);
      res += lMax - height[l];
      l++;
    } else {
      rMax = Math.max(rMax, height[r]);
      res += rMax - height[r];
      r--;
    }
  }

  return res;
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6`,
    complex: "Time: O(n) · Space: O(1)",
  },

  // ─── SLIDING WINDOW ──────────────────────────────────────────────────────────
  {
    id: 14, title: "Best Time to Buy and Sell Stock", cat: "Sliding Window", diff: "Easy",
    pattern: "Track Min + Max Profit", tags: ["sliding window", "greedy", "min tracking"],
    src: "LC", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    desc: "Given prices array where prices[i] is the price on day i, return the maximum profit from one buy-sell transaction.",
    hint: "Scan left to right. Track the minimum price seen so far. At each day, profit = price - min_price. Update max profit.",
    code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
}

console.log(maxProfit([7,1,5,3,6,4])); // 5
console.log(maxProfit([7,6,4,3,1]));   // 0`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 15, title: "Longest Substring Without Repeating Characters", cat: "Sliding Window", diff: "Medium",
    pattern: "Variable Sliding Window", tags: ["sliding window", "set", "two pointers"],
    src: "LC", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    desc: "Given a string s, find the length of the longest substring without repeating characters.",
    hint: "Sliding window with a Set. Expand right pointer. When duplicate found, shrink from left until duplicate is removed.",
    code: `function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let l = 0, maxLen = 0;

  for (let r = 0; r < s.length; r++) {
    // Shrink window until no duplicate
    while (charSet.has(s[r])) {
      charSet.delete(s[l]);
      l++;
    }
    charSet.add(s[r]);
    maxLen = Math.max(maxLen, r - l + 1);
  }

  return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("pwwkew"));   // 3`,
    complex: "Time: O(n) · Space: O(min(n, 26))",
  },
  {
    id: 16, title: "Longest Repeating Character Replacement", cat: "Sliding Window", diff: "Medium",
    pattern: "Variable Sliding Window + Frequency", tags: ["sliding window", "frequency", "k replacements"],
    src: "LC", link: "https://leetcode.com/problems/longest-repeating-character-replacement/",
    desc: "Given a string s and integer k, you can change at most k characters. Return the length of the longest substring containing the same letter.",
    hint: "Window is valid when (window_length - max_frequency) ≤ k. Track the maximum frequency of any char in the window. When invalid, shrink from left.",
    code: `function characterReplacement(s, k) {
  const count = {};
  let l = 0, maxFreq = 0, res = 0;

  for (let r = 0; r < s.length; r++) {
    count[s[r]] = (count[s[r]] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[s[r]]);

    // Invalid: replacements needed > k
    while ((r - l + 1) - maxFreq > k) {
      count[s[l]]--;
      l++;
    }

    res = Math.max(res, r - l + 1);
  }

  return res;
}

console.log(characterReplacement("AABABBA", 1)); // 4`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 17, title: "Permutation in String", cat: "Sliding Window", diff: "Medium",
    pattern: "Fixed Sliding Window + Frequency Match", tags: ["sliding window", "anagram", "frequency"],
    src: "LC", link: "https://leetcode.com/problems/permutation-in-string/",
    desc: "Given strings s1 and s2, return true if s2 contains a permutation of s1. In other words, one of s1's permutations is a substring of s2.",
    hint: "Fixed window of size s1.length. Track frequency mismatch count. Slide window and update matches count.",
    code: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Array(26).fill(0);
  const have = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);

  for (const c of s1) need[c.charCodeAt(0) - a]++;

  let matches = 0;
  const required = s1.length;

  for (let r = 0; r < s2.length; r++) {
    const idx = s2[r].charCodeAt(0) - a;
    have[idx]++;
    if (have[idx] <= need[idx]) matches++;

    if (r >= required) {
      const leftIdx = s2[r - required].charCodeAt(0) - a;
      if (have[leftIdx] <= need[leftIdx]) matches--;
      have[leftIdx]--;
    }

    if (matches === required) return true;
  }

  return false;
}

console.log(checkInclusion("ab", "eidbaooo")); // true`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 18, title: "Minimum Window Substring", cat: "Sliding Window", diff: "Hard",
    pattern: "Variable Sliding Window + Two Maps", tags: ["sliding window", "two maps", "shrink left"],
    src: "LC", link: "https://leetcode.com/problems/minimum-window-substring/",
    desc: "Given strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
    hint: "Use two maps (need, have). Expand right until 'formed' = required. Then shrink from left to minimize, updating best. Repeat.",
    code: `function minWindow(s, t) {
  if (!t.length) return "";

  const need = {}, have = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  let formed = 0;
  const required = Object.keys(need).length;
  let l = 0;
  let res = [-1, 0, s.length]; // [found, l, r]

  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    have[c] = (have[c] || 0) + 1;
    if (need[c] && have[c] === need[c]) formed++;

    while (formed === required) {
      if (r - l < res[2] - res[1]) res = [1, l, r];
      have[s[l]]--;
      if (need[s[l]] && have[s[l]] < need[s[l]]) formed--;
      l++;
    }
  }

  return res[0] === -1 ? "" : s.slice(res[1], res[2] + 1);
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"`,
    complex: "Time: O(n+m) · Space: O(n+m)",
  },
  {
    id: 19, title: "Sliding Window Maximum", cat: "Sliding Window", diff: "Hard",
    pattern: "Monotonic Deque", tags: ["deque", "monotonic", "max in window"],
    src: "LC", link: "https://leetcode.com/problems/sliding-window-maximum/",
    desc: "Given an array nums and integer k, return an array of the maximum value of each sliding window of size k.",
    hint: "Use a monotonic deque storing indices. Front is always the max. Remove elements out of window from front. Remove smaller elements from back before adding.",
    code: `function maxSlidingWindow(nums, k) {
  const deque = []; // stores indices, decreasing values
  const res = [];

  for (let r = 0; r < nums.length; r++) {
    // Remove out-of-window indices from front
    while (deque.length && deque[0] < r - k + 1) deque.shift();

    // Remove indices with smaller values from back
    while (deque.length && nums[deque[deque.length - 1]] < nums[r]) {
      deque.pop();
    }

    deque.push(r);

    if (r >= k - 1) res.push(nums[deque[0]]);
  }

  return res;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]`,
    complex: "Time: O(n) · Space: O(k)",
  },

  // ─── STACK ───────────────────────────────────────────────────────────────────
  {
    id: 20, title: "Valid Parentheses", cat: "Stack", diff: "Easy",
    pattern: "Stack Matching", tags: ["stack", "brackets", "matching"],
    src: "LC", link: "https://leetcode.com/problems/valid-parentheses/",
    desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    hint: "Push open brackets onto stack. When a close bracket is encountered, check if top of stack is the matching open bracket.",
    code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };

  for (const c of s) {
    if ('([{'.includes(c)) {
      stack.push(c);
    } else {
      if (stack.pop() !== map[c]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 21, title: "Min Stack", cat: "Stack", diff: "Medium",
    pattern: "Auxiliary Min Stack", tags: ["stack", "design", "O(1) min"],
    src: "LC", link: "https://leetcode.com/problems/min-stack/",
    desc: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    hint: "Maintain a second 'minStack'. When pushing, also push the current min to minStack. When popping, pop both stacks.",
    code: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const currentMin = this.minStack.length
      ? Math.min(val, this.minStack.at(-1))
      : val;
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack.at(-1);
  }

  getMin() {
    return this.minStack.at(-1);
  }
}

const ms = new MinStack();
ms.push(-2); ms.push(0); ms.push(-3);
console.log(ms.getMin()); // -3
ms.pop();
console.log(ms.top());    // 0
console.log(ms.getMin()); // -2`,
    complex: "Time: O(1) all ops · Space: O(n)",
  },
  {
    id: 22, title: "Evaluate Reverse Polish Notation", cat: "Stack", diff: "Medium",
    pattern: "Stack Evaluation", tags: ["stack", "math", "postfix"],
    src: "LC", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    desc: "Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix).",
    hint: "Push numbers to stack. On encountering an operator, pop two numbers, apply operator, push result.",
    code: `function evalRPN(tokens) {
  const stack = [];
  const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };

  for (const t of tokens) {
    if (ops[t]) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(ops[t](a, b));
    } else {
      stack.push(Number(t));
    }
  }

  return stack[0];
}

console.log(evalRPN(["2","1","+","3","*"])); // 9
console.log(evalRPN(["4","13","5","/","+"])); // 6`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 23, title: "Generate Parentheses", cat: "Stack", diff: "Medium",
    pattern: "Backtracking with Stack", tags: ["backtracking", "recursion", "combinatorics"],
    src: "LC", link: "https://leetcode.com/problems/generate-parentheses/",
    desc: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    hint: "Recursively add '(' when open count < n, add ')' when close count < open count. When both counts equal n, add to result.",
    code: `function generateParenthesis(n) {
  const res = [];

  function bt(curr, open, close) {
    if (curr.length === 2 * n) {
      res.push(curr);
      return;
    }
    if (open < n) bt(curr + '(', open + 1, close);
    if (close < open) bt(curr + ')', open, close + 1);
  }

  bt('', 0, 0);
  return res;
}

console.log(generateParenthesis(3));
// ["((()))","(()())","(())()","()(())","()()()"]`,
    complex: "Time: O(4ⁿ/√n) · Space: O(n)",
  },
  {
    id: 24, title: "Daily Temperatures", cat: "Stack", diff: "Medium",
    pattern: "Monotonic Stack (Next Greater)", tags: ["monotonic stack", "next greater", "index"],
    src: "LC", link: "https://leetcode.com/problems/daily-temperatures/",
    desc: "Given an array of daily temperatures, return an array where answer[i] is the number of days until a warmer temperature. Return 0 if there's no future warmer day.",
    hint: "Monotonic decreasing stack storing indices. When current temp is warmer than stack top, pop and record the gap.",
    code: `function dailyTemperatures(temps) {
  const res = new Array(temps.length).fill(0);
  const stack = []; // indices, decreasing temps

  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack.at(-1)]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }

  return res;
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));
// [1,1,4,2,1,1,0,0]`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 25, title: "Car Fleet", cat: "Stack", diff: "Medium",
    pattern: "Monotonic Stack + Sorting", tags: ["stack", "sorting", "simulation"],
    src: "LC", link: "https://leetcode.com/problems/car-fleet/",
    desc: "n cars are going to the same destination. Find the number of car fleets that will arrive at the destination.",
    hint: "Sort by position descending. Compute time each car takes. If a car's time is ≤ the fleet ahead, it merges. Use a stack of arrival times.",
    code: `function carFleet(target, position, speed) {
  const pairs = position
    .map((p, i) => [p, speed[i]])
    .sort((a, b) => b[0] - a[0]); // sort by position desc

  const stack = []; // arrival times

  for (const [pos, spd] of pairs) {
    const time = (target - pos) / spd;
    // Only a new fleet if this car arrives later than the fleet ahead
    if (!stack.length || time > stack.at(-1)) {
      stack.push(time);
    }
  }

  return stack.length;
}

console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // 3`,
    complex: "Time: O(n log n) · Space: O(n)",
  },
  {
    id: 26, title: "Largest Rectangle in Histogram", cat: "Stack", diff: "Hard",
    pattern: "Monotonic Stack (Max Area)", tags: ["monotonic stack", "area", "heights"],
    src: "LC", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    desc: "Given an array of integers heights representing the histogram's bar heights, return the area of the largest rectangle in the histogram.",
    hint: "Monotonic increasing stack. When popping a bar, its height is the rectangle height. Width extends from current index to the new stack top.",
    code: `function largestRectangleArea(heights) {
  const stack = []; // indices, increasing heights
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];

    while (stack.length && h < heights[stack.at(-1)]) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack.at(-1) - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}

console.log(largestRectangleArea([2,1,5,6,2,3])); // 10`,
    complex: "Time: O(n) · Space: O(n)",
  },

  // ─── BINARY SEARCH ───────────────────────────────────────────────────────────
  {
    id: 27, title: "Binary Search", cat: "Binary Search", diff: "Easy",
    pattern: "Standard Binary Search", tags: ["binary search", "sorted", "O(log n)"],
    src: "LC", link: "https://leetcode.com/problems/binary-search/",
    desc: "Given a sorted array of distinct integers and a target, return the index of the target or -1 if not found.",
    hint: "Classic binary search. Maintain lo and hi. Compute mid = (lo + hi) >> 1. Compare and halve the search space.",
    code: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return -1;
}

console.log(search([-1,0,3,5,9,12], 9)); // 4
console.log(search([-1,0,3,5,9,12], 2)); // -1`,
    complex: "Time: O(log n) · Space: O(1)",
  },
  {
    id: 28, title: "Search a 2D Matrix", cat: "Binary Search", diff: "Medium",
    pattern: "Flatten Matrix Binary Search", tags: ["binary search", "matrix", "row/col"],
    src: "LC", link: "https://leetcode.com/problems/search-a-2d-matrix/",
    desc: "Search a target in an m×n matrix where each row is sorted and the first integer of each row is greater than the last of the previous row.",
    hint: "Treat the matrix as a flat sorted array of size m*n. Map mid index to row = mid/n, col = mid%n.",
    code: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / n)][mid % n];

    if (val === target) return true;
    else if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }

  return false;
}

console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // true`,
    complex: "Time: O(log(m·n)) · Space: O(1)",
  },
  {
    id: 29, title: "Koko Eating Bananas", cat: "Binary Search", diff: "Medium",
    pattern: "Binary Search on Answer Space", tags: ["binary search", "answer space", "monotonic check"],
    src: "LC", link: "https://leetcode.com/problems/koko-eating-bananas/",
    desc: "Koko can eat k bananas per hour. She wants to eat all bananas within h hours. Find the minimum k.",
    hint: "Binary search on k (from 1 to max pile). For a given k, check if total hours ≤ h. The check function is monotonic — if k works, k+1 works too.",
    code: `function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles);

  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);

    if (hours <= h) hi = mid; // mid works, try smaller
    else lo = mid + 1;        // mid too slow
  }

  return lo;
}

console.log(minEatingSpeed([3,6,7,11], 8)); // 4`,
    complex: "Time: O(n log m) · Space: O(1)",
  },
  {
    id: 30, title: "Find Minimum in Rotated Sorted Array", cat: "Binary Search", diff: "Medium",
    pattern: "Binary Search on Rotated Array", tags: ["binary search", "rotated", "pivot"],
    src: "LC", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    desc: "Given a rotated sorted array, find the minimum element.",
    hint: "If nums[mid] > nums[right], minimum is in right half (lo = mid+1). Otherwise it's in left half including mid (hi = mid).",
    code: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }

  return nums[lo];
}

console.log(findMin([3,4,5,1,2])); // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0`,
    complex: "Time: O(log n) · Space: O(1)",
  },
  {
    id: 31, title: "Search in Rotated Sorted Array", cat: "Binary Search", diff: "Medium",
    pattern: "Binary Search on Rotated Array", tags: ["binary search", "rotated", "which half sorted"],
    src: "LC", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    desc: "Search a target value in a rotated sorted array (no duplicates). Return its index or -1.",
    hint: "Determine which half is sorted. If target is in the sorted half, search there. Otherwise search the other half.",
    code: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else { // Right half is sorted
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }

  return -1;
}

console.log(search([4,5,6,7,0,1,2], 0)); // 4`,
    complex: "Time: O(log n) · Space: O(1)",
  },
  {
    id: 32, title: "Time Based Key-Value Store", cat: "Binary Search", diff: "Medium",
    pattern: "Binary Search on Sorted Values", tags: ["binary search", "design", "timestamp"],
    src: "LC", link: "https://leetcode.com/problems/time-based-key-value-store/",
    desc: "Design a time-based key-value data structure that stores multiple values for the same key at different timestamps and retrieves the value for the largest timestamp ≤ given timestamp.",
    hint: "Map each key to a sorted list of [timestamp, value] pairs. Binary search for largest timestamp ≤ query time.",
    code: `class TimeMap {
  constructor() {
    this.store = new Map(); // key → [[timestamp, value]]
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key).push([timestamp, value]);
  }

  get(key, timestamp) {
    const pairs = this.store.get(key) || [];
    let lo = 0, hi = pairs.length - 1, res = '';

    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (pairs[mid][0] <= timestamp) {
        res = pairs[mid][1]; // best candidate so far
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    return res;
  }
}`,
    complex: "Time: O(log n) get / O(1) set · Space: O(n)",
  },
  {
    id: 33, title: "Median of Two Sorted Arrays", cat: "Binary Search", diff: "Hard",
    pattern: "Binary Search Partition", tags: ["binary search", "partition", "median", "O(log min)"],
    src: "LC", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    desc: "Find the median of two sorted arrays in O(log(m+n)) time.",
    hint: "Binary search on the smaller array to find a partition point such that the left halves together form the lower half of the merged array.",
    code: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length)
    return findMedianSortedArrays(nums2, nums1);

  const m = nums1.length, n = nums2.length;
  let lo = 0, hi = m;

  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = ((m + n + 1) >> 1) - i;

    const l1 = i > 0 ? nums1[i - 1] : -Infinity;
    const r1 = i < m ? nums1[i] : Infinity;
    const l2 = j > 0 ? nums2[j - 1] : -Infinity;
    const r2 = j < n ? nums2[j] : Infinity;

    if (l1 <= r2 && l2 <= r1) {
      if ((m + n) % 2 === 0)
        return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
      return Math.max(l1, l2);
    } else if (l1 > r2) hi = i - 1;
    else lo = i + 1;
  }
}`,
    complex: "Time: O(log min(m,n)) · Space: O(1)",
  },

  // ─── LINKED LIST ─────────────────────────────────────────────────────────────
  {
    id: 34, title: "Reverse Linked List", cat: "Linked List", diff: "Easy",
    pattern: "Iterative 3-Pointer Reversal", tags: ["linked list", "reversal", "prev/curr/next"],
    src: "LC", link: "https://leetcode.com/problems/reverse-linked-list/",
    desc: "Given the head of a singly linked list, reverse the list and return the new head.",
    hint: "Use three pointers: prev, curr, next. In each step, reverse the link (curr.next = prev), advance all three forward.",
    code: `// ListNode: { val, next }
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save next
    curr.next = prev;       // reverse
    prev = curr;            // advance prev
    curr = next;            // advance curr
  }

  return prev; // new head
}`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 35, title: "Merge Two Sorted Lists", cat: "Linked List", diff: "Easy",
    pattern: "Dummy Node + Two Pointer Merge", tags: ["linked list", "merge", "dummy node"],
    src: "LC", link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    desc: "Merge two sorted linked lists and return the head of the merged sorted list.",
    hint: "Use a dummy node to simplify edge cases. Compare heads of both lists, attach the smaller node, advance that pointer.",
    code: `function mergeTwoLists(l1, l2) {
  const dummy = { next: null };
  let cur = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }

  cur.next = l1 || l2; // attach remaining
  return dummy.next;
}`,
    complex: "Time: O(n+m) · Space: O(1)",
  },
  {
    id: 36, title: "Reorder List", cat: "Linked List", diff: "Medium",
    pattern: "Find Middle + Reverse + Merge", tags: ["slow-fast pointer", "reversal", "merge"],
    src: "LC", link: "https://leetcode.com/problems/reorder-list/",
    desc: "Reorder list L0→L1→…→Ln-1→Ln to L0→Ln→L1→Ln-1→L2→Ln-2→…",
    hint: "Three steps: 1) Find middle with slow/fast pointers. 2) Reverse second half. 3) Merge two halves alternately.",
    code: `function reorderList(head) {
  // Step 1: Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: Merge two halves
  let first = head, second = prev;
  while (second) {
    const t1 = first.next, t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1;
    second = t2;
  }
}`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 37, title: "Remove Nth Node From End", cat: "Linked List", diff: "Medium",
    pattern: "Two Pointers with Gap", tags: ["two pointers", "gap", "dummy node"],
    src: "LC", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    desc: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    hint: "Use fast and slow pointers. Advance fast n+1 steps ahead. Move both until fast is null. Slow is now one before the target.",
    code: `function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let slow = dummy, fast = dummy;

  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) fast = fast.next;

  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next; // remove nth from end
  return dummy.next;
}`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 38, title: "Linked List Cycle", cat: "Linked List", diff: "Easy",
    pattern: "Floyd's Cycle Detection", tags: ["slow-fast pointer", "cycle", "Floyd"],
    src: "LC", link: "https://leetcode.com/problems/linked-list-cycle/",
    desc: "Given head of a linked list, determine if the list has a cycle.",
    hint: "Floyd's algorithm: slow moves 1 step, fast moves 2. If they ever meet, there's a cycle.",
    code: `function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 39, title: "Find the Duplicate Number", cat: "Linked List", diff: "Medium",
    pattern: "Floyd's Cycle Detection on Array", tags: ["cycle", "Floyd", "no extra space"],
    src: "LC", link: "https://leetcode.com/problems/find-the-duplicate-number/",
    desc: "Given an array nums of n+1 integers where each integer is between 1 and n, find the one duplicate number. O(1) space, can't modify array.",
    hint: "Treat array as a linked list where index i points to nums[i]. The duplicate creates a cycle. Use Floyd's algorithm to find cycle entry.",
    code: `function findDuplicate(nums) {
  // Phase 1: Find intersection inside cycle
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find cycle entry (duplicate)
  let slow2 = nums[0];
  while (slow !== slow2) {
    slow = nums[slow];
    slow2 = nums[slow2];
  }

  return slow;
}

console.log(findDuplicate([1,3,4,2,2])); // 2`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 40, title: "LRU Cache", cat: "Linked List", diff: "Medium",
    pattern: "Doubly Linked List + Hash Map", tags: ["design", "DLL", "hash map", "O(1)"],
    src: "LC", link: "https://leetcode.com/problems/lru-cache/",
    desc: "Design a data structure that follows the LRU (Least Recently Used) cache constraint with O(1) get and put.",
    hint: "HashMap for O(1) access + doubly linked list to track recency. Most recently used at tail, LRU at head. On access/insert, move node to tail.",
    code: `class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.cache = new Map();
    // Dummy head and tail
    this.head = { key: 0, val: 0, prev: null, next: null };
    this.tail = { key: 0, val: 0, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _insertAtTail(node) {
    const prev = this.tail.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail;
    this.tail.prev = node;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this._remove(node);
    this._insertAtTail(node);
    return node.val;
  }

  put(key, val) {
    if (this.cache.has(key)) this._remove(this.cache.get(key));
    const node = { key, val };
    this._insertAtTail(node);
    this.cache.set(key, node);
    if (this.cache.size > this.cap) {
      const lru = this.head.next;
      this._remove(lru);
      this.cache.delete(lru.key);
    }
  }
}`,
    complex: "Time: O(1) get/put · Space: O(capacity)",
  },

  // ─── TREES ───────────────────────────────────────────────────────────────────
  {
    id: 41, title: "Invert Binary Tree", cat: "Trees", diff: "Easy",
    pattern: "DFS Recursive", tags: ["DFS", "recursion", "tree"],
    src: "LC", link: "https://leetcode.com/problems/invert-binary-tree/",
    desc: "Given the root of a binary tree, invert the tree and return its root.",
    hint: "Swap left and right children at every node recursively.",
    code: `function invertTree(root) {
  if (!root) return null;

  // Swap children
  [root.left, root.right] = [root.right, root.left];

  invertTree(root.left);
  invertTree(root.right);

  return root;
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 42, title: "Maximum Depth of Binary Tree", cat: "Trees", diff: "Easy",
    pattern: "DFS Postorder", tags: ["DFS", "recursion", "height"],
    src: "LC", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    desc: "Given the root of a binary tree, return its maximum depth.",
    hint: "max_depth(node) = 1 + max(max_depth(left), max_depth(right)). Base case: null node → 0.",
    code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// BFS iterative alternative:
function maxDepthBFS(root) {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;

  while (queue.length) {
    depth++;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return depth;
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 43, title: "Diameter of Binary Tree", cat: "Trees", diff: "Easy",
    pattern: "DFS with Global Max", tags: ["DFS", "diameter", "postorder"],
    src: "LC", link: "https://leetcode.com/problems/diameter-of-binary-tree/",
    desc: "Return the length of the diameter of a binary tree (longest path between any two nodes, in edges).",
    hint: "At each node, diameter through it = left_height + right_height. Track global max while computing heights.",
    code: `function diameterOfBinaryTree(root) {
  let maxDiam = 0;

  function height(node) {
    if (!node) return 0;
    const l = height(node.left);
    const r = height(node.right);
    maxDiam = Math.max(maxDiam, l + r); // path through this node
    return 1 + Math.max(l, r);
  }

  height(root);
  return maxDiam;
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 44, title: "Balanced Binary Tree", cat: "Trees", diff: "Easy",
    pattern: "DFS Height Check", tags: ["DFS", "height", "early exit"],
    src: "LC", link: "https://leetcode.com/problems/balanced-binary-tree/",
    desc: "Given a binary tree, determine if it is height-balanced (depth of two subtrees never differs by more than 1).",
    hint: "Return -1 from height function to signal 'unbalanced'. Check early and propagate -1 upward.",
    code: `function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    const l = height(node.left);
    const r = height(node.right);
    if (l === -1 || r === -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  }

  return height(root) !== -1;
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 45, title: "Same Tree", cat: "Trees", diff: "Easy",
    pattern: "DFS Parallel Traversal", tags: ["DFS", "recursion", "comparison"],
    src: "LC", link: "https://leetcode.com/problems/same-tree/",
    desc: "Given the roots of two binary trees p and q, check whether they are structurally identical and have the same node values.",
    hint: "Recursively check: both null → true; one null → false; different values → false; recurse left and right.",
    code: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 46, title: "Subtree of Another Tree", cat: "Trees", diff: "Easy",
    pattern: "DFS + Same Tree", tags: ["DFS", "subtree", "recursion"],
    src: "LC", link: "https://leetcode.com/problems/subtree-of-another-tree/",
    desc: "Given roots of two binary trees root and subRoot, return true if subRoot is a subtree of root.",
    hint: "At each node of root, check if it's the same tree as subRoot using the isSameTree helper.",
    code: `function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    complex: "Time: O(m·n) · Space: O(h)",
  },
  {
    id: 47, title: "LCA of Binary Tree", cat: "Trees", diff: "Medium",
    pattern: "DFS Postorder LCA", tags: ["DFS", "LCA", "postorder"],
    src: "LC", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    desc: "Find the lowest common ancestor (LCA) of two nodes in a binary tree.",
    hint: "If current node is p or q, return it. Recurse left and right. If both return non-null, current node is LCA. Otherwise return the non-null child.",
    code: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root; // p and q in different subtrees
  return left || right;
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 48, title: "Binary Tree Level Order Traversal", cat: "Trees", diff: "Medium",
    pattern: "BFS Queue", tags: ["BFS", "queue", "level order"],
    src: "LC", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    desc: "Return the level-order traversal of a binary tree's values (i.e., from left to right, level by level).",
    hint: "Use a queue. Process nodes level-by-level using the queue size as the boundary for each level.",
    code: `function levelOrder(root) {
  if (!root) return [];

  const queue = [root], res = [];

  while (queue.length) {
    const level = [];
    const size = queue.length; // current level size

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    res.push(level);
  }

  return res;
}`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 49, title: "Binary Tree Right Side View", cat: "Trees", diff: "Medium",
    pattern: "BFS + Last Node per Level", tags: ["BFS", "right side", "level order"],
    src: "LC", link: "https://leetcode.com/problems/binary-tree-right-side-view/",
    desc: "Given the root of a binary tree, imagine standing on the right side of it. Return the values of the nodes you can see from top to bottom.",
    hint: "BFS level order traversal. The last node in each level is visible from the right side.",
    code: `function rightSideView(root) {
  if (!root) return [];

  const queue = [root], res = [];

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) res.push(node.val); // last in level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return res;
}`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 50, title: "Count Good Nodes in Binary Tree", cat: "Trees", diff: "Medium",
    pattern: "DFS with Max So Far", tags: ["DFS", "preorder", "max tracking"],
    src: "LC", link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
    desc: "Count nodes in a binary tree where the path from root to that node has no value greater than the node's value.",
    hint: "DFS passing the max value seen so far along the path. A node is 'good' if node.val >= max_so_far.",
    code: `function goodNodes(root) {
  function dfs(node, maxSoFar) {
    if (!node) return 0;

    const isGood = node.val >= maxSoFar ? 1 : 0;
    const newMax = Math.max(maxSoFar, node.val);

    return isGood + dfs(node.left, newMax) + dfs(node.right, newMax);
  }

  return dfs(root, -Infinity);
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 51, title: "Validate BST", cat: "Trees", diff: "Medium",
    pattern: "DFS with Min/Max Bounds", tags: ["BST", "DFS", "min/max bounds"],
    src: "LC", link: "https://leetcode.com/problems/validate-binary-search-tree/",
    desc: "Given root of a binary tree, determine if it is a valid binary search tree.",
    hint: "Pass min and max bounds down the recursion. Each node's value must be strictly within (min, max).",
    code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 52, title: "Kth Smallest in BST", cat: "Trees", diff: "Medium",
    pattern: "Inorder Traversal", tags: ["BST", "inorder", "DFS"],
    src: "LC", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    desc: "Given root of a BST and integer k, return the kth smallest value.",
    hint: "Inorder traversal of a BST visits nodes in sorted order. The kth visited node is the answer.",
    code: `function kthSmallest(root, k) {
  let count = 0, result = null;

  function inorder(node) {
    if (!node || count >= k) return;
    inorder(node.left);
    if (++count === k) { result = node.val; return; }
    inorder(node.right);
  }

  inorder(root);
  return result;
}`,
    complex: "Time: O(h+k) · Space: O(h)",
  },
  {
    id: 53, title: "Construct Binary Tree from Preorder & Inorder", cat: "Trees", diff: "Medium",
    pattern: "Divide & Conquer", tags: ["preorder", "inorder", "recursion", "build tree"],
    src: "LC", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    desc: "Build a binary tree from preorder and inorder traversal arrays.",
    hint: "First element of preorder is root. Find root in inorder to split left/right subtrees. Use a hash map for O(1) lookups.",
    code: `function buildTree(preorder, inorder) {
  const inMap = new Map();
  inorder.forEach((v, i) => inMap.set(v, i));

  function build(preL, preR, inL, inR) {
    if (preL > preR) return null;

    const rootVal = preorder[preL];
    const mid = inMap.get(rootVal);
    const leftSize = mid - inL;

    return {
      val: rootVal,
      left: build(preL + 1, preL + leftSize, inL, mid - 1),
      right: build(preL + leftSize + 1, preR, mid + 1, inR),
    };
  }

  return build(0, preorder.length - 1, 0, inorder.length - 1);
}`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 54, title: "Binary Tree Maximum Path Sum", cat: "Trees", diff: "Hard",
    pattern: "DFS Postorder + Global Max", tags: ["DFS", "path sum", "postorder", "global max"],
    src: "LC", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    desc: "Find the maximum path sum in a binary tree. The path may start and end at any node.",
    hint: "At each node: gain from left = max(0, dfs(left)), gain from right = max(0, dfs(right)). Update global max with node.val + l + r. Return node.val + max(l, r) to parent.",
    code: `function maxPathSum(root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (!node) return 0;

    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));

    // Path through this node (can't go both directions to parent)
    maxSum = Math.max(maxSum, node.val + left + right);

    // Return max single-direction gain for parent
    return node.val + Math.max(left, right);
  }

  dfs(root);
  return maxSum;
}`,
    complex: "Time: O(n) · Space: O(h)",
  },
  {
    id: 55, title: "Serialize and Deserialize Binary Tree", cat: "Trees", diff: "Hard",
    pattern: "BFS/DFS Serialization", tags: ["BFS", "DFS", "serialization", "design"],
    src: "LC", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    desc: "Design an algorithm to serialize a binary tree to a string and deserialize the string back to the tree.",
    hint: "Use BFS (level order). Serialize null nodes as 'null'. Deserialize by reconstructing the queue-based BFS.",
    code: `function serialize(root) {
  if (!root) return 'null';
  const res = [], queue = [root];

  while (queue.length) {
    const node = queue.shift();
    if (node) {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push('null');
    }
  }

  return res.join(',');
}

function deserialize(data) {
  const vals = data.split(',');
  if (vals[0] === 'null') return null;

  const root = { val: +vals[0] };
  const queue = [root];
  let i = 1;

  while (queue.length) {
    const node = queue.shift();
    if (vals[i] !== 'null') { node.left = { val: +vals[i] }; queue.push(node.left); }
    i++;
    if (vals[i] !== 'null') { node.right = { val: +vals[i] }; queue.push(node.right); }
    i++;
  }

  return root;
}`,
    complex: "Time: O(n) · Space: O(n)",
  },

  // ─── TRIES ───────────────────────────────────────────────────────────────────
  {
    id: 56, title: "Implement Trie (Prefix Tree)", cat: "Tries", diff: "Medium",
    pattern: "Trie Insert/Search/StartsWith", tags: ["trie", "prefix tree", "insert", "search"],
    src: "LC", link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    desc: "Implement a Trie with insert, search, and startsWith methods.",
    hint: "Each node has a children map and an isEnd flag. Insert char-by-char creating nodes. Search traverses the path; startsWith just checks if path exists.",
    code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) node.children[c] = new TrieNode();
      node = node.children[c];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) return false;
      node = node.children[c];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const c of prefix) {
      if (!node.children[c]) return false;
      node = node.children[c];
    }
    return true;
  }
}`,
    complex: "Time: O(m) per op · Space: O(m·n)",
  },
  {
    id: 57, title: "Design Add and Search Words DS", cat: "Tries", diff: "Medium",
    pattern: "Trie + DFS for Wildcard", tags: ["trie", "DFS", "wildcard", "regex"],
    src: "LC", link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    desc: "Design a data structure that supports addWord and search with '.' as a wildcard matching any letter.",
    hint: "Trie with DFS for search. When '.' is encountered, recursively try all children nodes.",
    code: `class WordDictionary {
  constructor() {
    this.root = {};
  }

  addWord(word) {
    let node = this.root;
    for (const c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.isEnd = true;
  }

  search(word, node = this.root, i = 0) {
    if (i === word.length) return !!node.isEnd;

    const c = word[i];
    if (c === '.') {
      // Try all children
      for (const key of Object.keys(node)) {
        if (key !== 'isEnd' && this.search(word, node[key], i + 1))
          return true;
      }
      return false;
    }

    if (!node[c]) return false;
    return this.search(word, node[c], i + 1);
  }
}`,
    complex: "Time: O(m) add / O(26^m) search worst · Space: O(n·m)",
  },
  {
    id: 58, title: "Word Search II", cat: "Tries", diff: "Hard",
    pattern: "Trie + Backtracking DFS", tags: ["trie", "DFS", "backtracking", "multi-word"],
    src: "LC", link: "https://leetcode.com/problems/word-search-ii/",
    desc: "Given an m×n board of characters and a list of strings words, return all words on the board.",
    hint: "Build a Trie from all words. DFS from each cell, traverse Trie simultaneously. When node.isEnd is reached, add word to result and null it to avoid duplicates.",
    code: `function findWords(board, words) {
  // Build Trie
  const root = {};
  for (const word of words) {
    let node = root;
    for (const c of word) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.word = word;
  }

  const m = board.length, n = board[0].length;
  const res = [];

  function dfs(r, c, node) {
    if (r < 0 || c < 0 || r >= m || c >= n) return;
    const ch = board[r][c];
    if (ch === '#' || !node[ch]) return;

    node = node[ch];
    if (node.word) { res.push(node.word); node.word = null; } // avoid dup

    board[r][c] = '#'; // mark visited
    dfs(r + 1, c, node); dfs(r - 1, c, node);
    dfs(r, c + 1, node); dfs(r, c - 1, node);
    board[r][c] = ch; // restore
  }

  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      dfs(r, c, root);

  return res;
}`,
    complex: "Time: O(m·n·4·3^(L-1)) · Space: O(n·L)",
  },

  // ─── HEAP / PRIORITY QUEUE ───────────────────────────────────────────────────
  {
    id: 59, title: "Kth Largest Element in Array", cat: "Heap / Priority Queue", diff: "Medium",
    pattern: "Min Heap of Size K", tags: ["heap", "K largest", "quickselect"],
    src: "LC", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    desc: "Find the kth largest element in an unsorted array.",
    hint: "Maintain a min-heap of size k. After processing all elements, the heap top is the kth largest. Alternatively use QuickSelect for O(n) avg.",
    code: `// Simple sort approach (O(n log n)) — for heap simulation, see below
function findKthLargest(nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
}

// QuickSelect O(n) average:
function findKthLargestQS(nums, k) {
  const target = nums.length - k;

  function partition(lo, hi) {
    const pivot = nums[hi];
    let p = lo;
    for (let i = lo; i < hi; i++) {
      if (nums[i] <= pivot) [nums[p++], nums[i]] = [nums[i], nums[p - 1]];
    }
    [nums[p], nums[hi]] = [nums[hi], nums[p]];
    return p;
  }

  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const p = partition(lo, hi);
    if (p < target) lo = p + 1;
    else if (p > target) hi = p - 1;
    else break;
  }

  return nums[target];
}

console.log(findKthLargestQS([3,2,1,5,6,4], 2)); // 5`,
    complex: "Time: O(n log k) heap / O(n avg) quickselect · Space: O(k)",
  },
  {
    id: 60, title: "Last Stone Weight", cat: "Heap / Priority Queue", diff: "Easy",
    pattern: "Max Heap Simulation", tags: ["heap", "greedy", "simulation"],
    src: "LC", link: "https://leetcode.com/problems/last-stone-weight/",
    desc: "Smash the two heaviest stones. If they're equal, both are destroyed. Otherwise the difference remains. Return the last stone's weight or 0.",
    hint: "Use a max-heap. Repeatedly pop two largest, compute difference, push back if > 0.",
    code: `// JS doesn't have a built-in heap; simulate with sort for small inputs
function lastStoneWeight(stones) {
  stones.sort((a, b) => a - b);

  while (stones.length > 1) {
    const y = stones.pop(); // largest
    const x = stones.pop(); // second largest
    if (x !== y) {
      // Insert (y - x) in sorted position
      const diff = y - x;
      const pos = stones.findIndex(s => s >= diff);
      stones.splice(pos === -1 ? stones.length : pos, 0, diff);
    }
  }

  return stones[0] || 0;
}

console.log(lastStoneWeight([2,7,4,1,8,1])); // 1`,
    complex: "Time: O(n²) with sort / O(n log n) with heap · Space: O(1)",
  },
  {
    id: 61, title: "K Closest Points to Origin", cat: "Heap / Priority Queue", diff: "Medium",
    pattern: "Max Heap of Size K", tags: ["heap", "distance", "K closest"],
    src: "LC", link: "https://leetcode.com/problems/k-closest-points-to-origin/",
    desc: "Given an array of points, return the k closest to the origin (Euclidean distance).",
    hint: "Sort by x²+y² or maintain a max-heap of size k. When heap > k, remove the farthest point.",
    code: `function kClosest(points, k) {
  return points
    .sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2))
    .slice(0, k);
}

console.log(kClosest([[1,3],[-2,2]], 1)); // [[-2,2]]`,
    complex: "Time: O(n log n) sort / O(n log k) heap · Space: O(k)",
  },
  {
    id: 62, title: "Task Scheduler", cat: "Heap / Priority Queue", diff: "Medium",
    pattern: "Greedy + Frequency Count", tags: ["greedy", "frequency", "cooldown", "math"],
    src: "LC", link: "https://leetcode.com/problems/task-scheduler/",
    desc: "Given tasks with a cooldown period n between same tasks, find the minimum number of CPU intervals needed.",
    hint: "The most frequent task determines the minimum time. Place other tasks or idles in the gaps. Formula: max(tasks.length, (maxFreq-1)*(n+1)+maxCount).",
    code: `function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;

  const maxFreq = Math.max(...freq);
  const maxCount = freq.filter(f => f === maxFreq).length;

  // Either fill all gaps perfectly, or just run all tasks
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}

console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 63, title: "Find Median from Data Stream", cat: "Heap / Priority Queue", diff: "Hard",
    pattern: "Two Heaps (Max + Min)", tags: ["two heaps", "max heap", "min heap", "streaming"],
    src: "LC", link: "https://leetcode.com/problems/find-median-from-data-stream/",
    desc: "Design a data structure that supports addNum and findMedian with efficient operations.",
    hint: "Two heaps: max-heap for lower half, min-heap for upper half. Keep sizes balanced (lo can be +1 of hi). Median is lo.top or average of both tops.",
    code: `// Note: JS has no built-in heap. Using sorted array for illustration.
// In real code, implement MinHeap and MaxHeap classes.
class MedianFinder {
  constructor() {
    // lo = max-heap (lower half), hi = min-heap (upper half)
    this.lo = []; // sorted desc — lo[0] is max
    this.hi = []; // sorted asc — hi[0] is min
  }

  addNum(num) {
    // Push to max-heap, balance
    this.lo.push(num);
    this.lo.sort((a, b) => b - a);

    // Ensure max of lo <= min of hi
    if (this.hi.length && this.lo[0] > this.hi[0]) {
      this.hi.push(this.lo.shift());
      this.hi.sort((a, b) => a - b);
    }

    // Balance sizes: lo can have at most 1 extra
    if (this.lo.length > this.hi.length + 1) {
      this.hi.push(this.lo.shift());
      this.hi.sort((a, b) => a - b);
    } else if (this.hi.length > this.lo.length) {
      this.lo.push(this.hi.shift());
      this.lo.sort((a, b) => b - a);
    }
  }

  findMedian() {
    if (this.lo.length > this.hi.length) return this.lo[0];
    return (this.lo[0] + this.hi[0]) / 2;
  }
}`,
    complex: "Time: O(log n) add / O(1) median · Space: O(n)",
  },
  {
    id: 64, title: "Merge K Sorted Lists", cat: "Heap / Priority Queue", diff: "Hard",
    pattern: "Divide & Conquer / Min Heap", tags: ["heap", "divide & conquer", "merge", "linked list"],
    src: "LC", link: "https://leetcode.com/problems/merge-k-sorted-lists/",
    desc: "Merge k sorted linked lists and return one sorted list.",
    hint: "Divide and conquer: recursively merge pairs of lists. Or use a min-heap of k elements to always pick the smallest.",
    code: `function mergeKLists(lists) {
  if (!lists.length) return null;
  if (lists.length === 1) return lists[0];

  const mid = lists.length >> 1;
  const left = mergeKLists(lists.slice(0, mid));
  const right = mergeKLists(lists.slice(mid));

  return mergeTwoLists(left, right);
}

function mergeTwoLists(l1, l2) {
  const dummy = {};
  let cur = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
    else { cur.next = l2; l2 = l2.next; }
    cur = cur.next;
  }
  cur.next = l1 || l2;
  return dummy.next;
}`,
    complex: "Time: O(n log k) · Space: O(log k)",
  },

  // ─── GRAPHS ──────────────────────────────────────────────────────────────────
  {
    id: 65, title: "Number of Islands", cat: "Graphs", diff: "Medium",
    pattern: "DFS Grid Flood Fill", tags: ["DFS", "BFS", "grid", "flood fill"],
    src: "LC", link: "https://leetcode.com/problems/number-of-islands/",
    desc: "Count the number of islands in a grid of '1's (land) and '0's (water). Islands are surrounded by water and connected horizontally/vertically.",
    hint: "For each unvisited '1', DFS/BFS to mark all connected land as visited (set to '0'). Count how many times you start a new DFS.",
    code: `function numIslands(grid) {
  const m = grid.length, n = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        dfs(r, c);
        count++;
      }
    }
  }

  return count;
}

// Mutates grid; clone if needed`,
    complex: "Time: O(m·n) · Space: O(m·n)",
  },
  {
    id: 66, title: "Max Area of Island", cat: "Graphs", diff: "Medium",
    pattern: "DFS Grid with Count", tags: ["DFS", "grid", "area"],
    src: "LC", link: "https://leetcode.com/problems/max-area-of-island/",
    desc: "Find the maximum area of an island in the given binary grid.",
    hint: "DFS from each unvisited '1'. Return the count of cells visited in each DFS call. Track global max.",
    code: `function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length;
  let maxArea = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
  }

  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (grid[r][c] === 1)
        maxArea = Math.max(maxArea, dfs(r, c));

  return maxArea;
}`,
    complex: "Time: O(m·n) · Space: O(m·n)",
  },
  {
    id: 67, title: "Clone Graph", cat: "Graphs", diff: "Medium",
    pattern: "DFS with Visited Map", tags: ["DFS", "BFS", "clone", "visited map"],
    src: "LC", link: "https://leetcode.com/problems/clone-graph/",
    desc: "Deep clone a connected undirected graph where each node has a val and a list of neighbors.",
    hint: "Use a hash map from original node to its clone. For each node, create a clone and recursively clone all neighbors.",
    code: `function cloneGraph(node, visited = new Map()) {
  if (!node) return null;
  if (visited.has(node)) return visited.get(node);

  const clone = { val: node.val, neighbors: [] };
  visited.set(node, clone);

  for (const neighbor of node.neighbors) {
    clone.neighbors.push(cloneGraph(neighbor, visited));
  }

  return clone;
}`,
    complex: "Time: O(V+E) · Space: O(V)",
  },
  {
    id: 68, title: "Walls and Gates", cat: "Graphs", diff: "Medium",
    pattern: "Multi-Source BFS", tags: ["BFS", "multi-source", "grid", "shortest path"],
    src: "LC", link: "https://leetcode.com/problems/walls-and-gates/",
    desc: "Fill each empty room with the distance to its nearest gate. INF = empty room, -1 = wall, 0 = gate.",
    hint: "Multi-source BFS starting from all gates simultaneously. Update distances of empty rooms as BFS expands.",
    code: `function wallsAndGates(rooms) {
  const m = rooms.length, n = rooms[0].length;
  const INF = 2147483647;
  const queue = [];

  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (rooms[r][c] === 0) queue.push([r, c]);

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  while (queue.length) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < m && nc < n && rooms[nr][nc] === INF) {
        rooms[nr][nc] = rooms[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
}`,
    complex: "Time: O(m·n) · Space: O(m·n)",
  },
  {
    id: 69, title: "Rotting Oranges", cat: "Graphs", diff: "Medium",
    pattern: "Multi-Source BFS with Time Tracking", tags: ["BFS", "multi-source", "time", "grid"],
    src: "LC", link: "https://leetcode.com/problems/rotting-oranges/",
    desc: "Find the minimum number of minutes for all fresh oranges to become rotten, given that rotten oranges spread each minute. Return -1 if impossible.",
    hint: "Multi-source BFS from all rotten oranges. Track minutes (BFS level = 1 minute). Check if any fresh remain.",
    code: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;

  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c, 0]);
      if (grid[r][c] === 1) fresh++;
    }

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let minutes = 0;

  while (queue.length) {
    const [r, c, time] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;
        fresh--;
        minutes = Math.max(minutes, time + 1);
        queue.push([nr, nc, time + 1]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}`,
    complex: "Time: O(m·n) · Space: O(m·n)",
  },
  {
    id: 70, title: "Course Schedule", cat: "Graphs", diff: "Medium",
    pattern: "Topological Sort (Cycle Detection)", tags: ["topological sort", "DFS", "cycle", "DAG"],
    src: "LC", link: "https://leetcode.com/problems/course-schedule/",
    desc: "Determine if you can finish all courses given prerequisite pairs (detect cycle in directed graph).",
    hint: "DFS with 3 states: 0=unvisited, 1=visiting (in current DFS path), 2=visited. A cycle exists if we reach a node in state 1.",
    code: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) adj[b].push(a);

  const state = new Array(numCourses).fill(0);

  function dfs(node) {
    if (state[node] === 1) return false; // cycle!
    if (state[node] === 2) return true;  // already processed

    state[node] = 1; // visiting
    for (const nei of adj[node]) {
      if (!dfs(nei)) return false;
    }
    state[node] = 2; // visited
    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }

  return true;
}`,
    complex: "Time: O(V+E) · Space: O(V+E)",
  },
  {
    id: 71, title: "Course Schedule II", cat: "Graphs", diff: "Medium",
    pattern: "Topological Sort (Kahn's BFS)", tags: ["topological sort", "BFS", "in-degree", "ordering"],
    src: "LC", link: "https://leetcode.com/problems/course-schedule-ii/",
    desc: "Return a valid ordering of courses to finish all courses, or empty array if impossible.",
    hint: "Kahn's algorithm: compute in-degree for each node. Start BFS from all 0-in-degree nodes. Each time we visit a node, decrement neighbor in-degrees, add new 0s to queue.",
    code: `function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++)
    if (inDegree[i] === 0) queue.push(i);

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const nei of adj[node]) {
      inDegree[nei]--;
      if (inDegree[nei] === 0) queue.push(nei);
    }
  }

  return order.length === numCourses ? order : [];
}`,
    complex: "Time: O(V+E) · Space: O(V+E)",
  },
  {
    id: 72, title: "Pacific Atlantic Water Flow", cat: "Graphs", diff: "Medium",
    pattern: "Multi-Source BFS from Borders", tags: ["BFS", "DFS", "multi-source", "grid"],
    src: "LC", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    desc: "Return cells from which water can flow to both the Pacific and Atlantic oceans.",
    hint: "Reverse the problem: BFS inward from both ocean borders. Find cells reachable from both.",
    code: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;

  function bfs(starts) {
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));
    const queue = [...starts];
    for (const [r, c] of starts) visited[r][c] = true;

    while (queue.length) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < m && nc < n &&
            !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    return visited;
  }

  const pacBorders = [...Array.from({length:m},(_,r)=>[r,0]),...Array.from({length:n},(_,c)=>[0,c])];
  const atlBorders = [...Array.from({length:m},(_,r)=>[r,n-1]),...Array.from({length:n},(_,c)=>[m-1,c])];

  const pac = bfs(pacBorders), atl = bfs(atlBorders);
  const res = [];
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
  return res;
}`,
    complex: "Time: O(m·n) · Space: O(m·n)",
  },
  {
    id: 73, title: "Surrounded Regions", cat: "Graphs", diff: "Medium",
    pattern: "DFS from Border", tags: ["DFS", "BFS", "border protection", "flood fill"],
    src: "LC", link: "https://leetcode.com/problems/surrounded-regions/",
    desc: "Capture all regions surrounded by 'X'. A region is captured if it cannot reach the border.",
    hint: "Mark all 'O's connected to the border as safe (DFS). Then flip remaining 'O' to 'X' and safe back to 'O'.",
    code: `function solve(board) {
  const m = board.length, n = board[0].length;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== 'O') return;
    board[r][c] = 'S'; // safe
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }

  // DFS from border O's
  for (let r = 0; r < m; r++) { dfs(r, 0); dfs(r, n-1); }
  for (let c = 0; c < n; c++) { dfs(0, c); dfs(m-1, c); }

  // Flip: O→X (captured), S→O (safe)
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      else if (board[r][c] === 'S') board[r][c] = 'O';
    }
}`,
    complex: "Time: O(m·n) · Space: O(m·n)",
  },
  {
    id: 74, title: "Number of Connected Components", cat: "Graphs", diff: "Medium",
    pattern: "Union Find / DFS", tags: ["union find", "DFS", "connected components"],
    src: "LC", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    desc: "Count the number of connected components in an undirected graph.",
    hint: "Union-Find: initialize each node as its own parent. For each edge, union the two nodes. Count distinct roots.",
    code: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]); // path compression
    return parent[x];
  }

  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return 0;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return 1;
  }

  let components = n;
  for (const [a, b] of edges) components -= union(a, b);
  return components;
}`,
    complex: "Time: O(n·α(n)) · Space: O(n)",
  },
  {
    id: 75, title: "Redundant Connection", cat: "Graphs", diff: "Medium",
    pattern: "Union Find Cycle Detection", tags: ["union find", "cycle", "directed graph"],
    src: "LC", link: "https://leetcode.com/problems/redundant-connection/",
    desc: "In a tree with one extra edge, find the redundant connection that can be removed.",
    hint: "Union-Find: iterate edges. If both endpoints have the same root (already connected), this edge is the redundant one.",
    code: `function findRedundantConnection(edges) {
  const n = edges.length;
  const parent = Array.from({ length: n + 1 }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  for (const [a, b] of edges) {
    const pa = find(a), pb = find(b);
    if (pa === pb) return [a, b]; // redundant!
    parent[pa] = pb;
  }
}`,
    complex: "Time: O(n·α(n)) · Space: O(n)",
  },
  {
    id: 76, title: "Word Ladder", cat: "Graphs", diff: "Hard",
    pattern: "BFS Shortest Path (Word Transformation)", tags: ["BFS", "word transform", "shortest path"],
    src: "LC", link: "https://leetcode.com/problems/word-ladder/",
    desc: "Find the shortest transformation sequence from beginWord to endWord, changing one letter at a time using only words from wordList.",
    hint: "BFS where each node is a word, edges connect words differing by one letter. Level = transformation steps.",
    code: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];

  while (queue.length) {
    const [word, steps] = queue.shift();

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (newWord === endWord) return steps + 1;
        if (wordSet.has(newWord)) {
          wordSet.delete(newWord); // don't revisit
          queue.push([newWord, steps + 1]);
        }
      }
    }
  }

  return 0;
}`,
    complex: "Time: O(n·m·26) · Space: O(n·m)",
  },

  // ─── DYNAMIC PROGRAMMING ─────────────────────────────────────────────────────
  {
    id: 77, title: "Climbing Stairs", cat: "Dynamic Programming", diff: "Easy",
    pattern: "1D DP (Fibonacci)", tags: ["DP", "fibonacci", "bottom-up"],
    src: "LC", link: "https://leetcode.com/problems/climbing-stairs/",
    desc: "You can climb 1 or 2 steps. In how many distinct ways can you reach the top of n stairs?",
    hint: "dp[i] = dp[i-1] + dp[i-2]. It's Fibonacci! dp[1]=1, dp[2]=2.",
    code: `function climbStairs(n) {
  if (n <= 2) return n;

  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }

  return curr;
}

console.log(climbStairs(5)); // 8`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 78, title: "Min Cost Climbing Stairs", cat: "Dynamic Programming", diff: "Easy",
    pattern: "1D DP", tags: ["DP", "minimum cost", "step choice"],
    src: "LC", link: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    desc: "Given cost array, find the minimum cost to reach the top. You can start at index 0 or 1, and take 1 or 2 steps.",
    hint: "dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Answer is min(dp[n-1], dp[n-2]).",
    code: `function minCostClimbingStairs(cost) {
  const n = cost.length;
  const dp = [...cost];

  for (let i = 2; i < n; i++) {
    dp[i] += Math.min(dp[i-1], dp[i-2]);
  }

  return Math.min(dp[n-1], dp[n-2]);
}

console.log(minCostClimbingStairs([10,15,20])); // 15`,
    complex: "Time: O(n) · Space: O(n) → O(1) with vars",
  },
  {
    id: 79, title: "House Robber", cat: "Dynamic Programming", diff: "Medium",
    pattern: "1D DP (Skip Adjacent)", tags: ["DP", "no adjacent", "decision"],
    src: "LC", link: "https://leetcode.com/problems/house-robber/",
    desc: "Rob houses to maximize money. Cannot rob adjacent houses.",
    hint: "At each house: max(rob_current + dp[i-2], skip = dp[i-1]). Use two rolling variables.",
    code: `function rob(nums) {
  let prev = 0, curr = 0;

  for (const n of nums) {
    const newCurr = Math.max(curr, prev + n);
    prev = curr;
    curr = newCurr;
  }

  return curr;
}

console.log(rob([2,7,9,3,1])); // 12`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 80, title: "House Robber II", cat: "Dynamic Programming", diff: "Medium",
    pattern: "1D DP on Circular Array", tags: ["DP", "circular", "two passes"],
    src: "LC", link: "https://leetcode.com/problems/house-robber-ii/",
    desc: "Houses arranged in a circle. Rob to maximize, but cannot rob adjacent or both first and last.",
    hint: "Run House Robber on [0..n-2] and [1..n-1] separately. Take max of both results.",
    code: `function rob(nums) {
  function robLine(arr) {
    let prev = 0, curr = 0;
    for (const n of arr) {
      [prev, curr] = [curr, Math.max(curr, prev + n)];
    }
    return curr;
  }

  if (nums.length === 1) return nums[0];

  return Math.max(
    robLine(nums.slice(0, -1)),  // skip last
    robLine(nums.slice(1))       // skip first
  );
}

console.log(rob([2,3,2])); // 3`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 81, title: "Longest Palindromic Substring", cat: "Dynamic Programming", diff: "Medium",
    pattern: "Expand Around Center", tags: ["DP", "palindrome", "expand center"],
    src: "LC", link: "https://leetcode.com/problems/longest-palindromic-substring/",
    desc: "Find the longest palindromic substring in a string.",
    hint: "For each center (odd length: single char; even: between chars), expand outward while palindrome. Track the longest.",
    code: `function longestPalindrome(s) {
  let res = '';

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > res.length) res = s.slice(l + 1, r);
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd length
    expand(i, i + 1); // even length
  }

  return res;
}

console.log(longestPalindrome("babad")); // "bab"`,
    complex: "Time: O(n²) · Space: O(1)",
  },
  {
    id: 82, title: "Palindromic Substrings", cat: "Dynamic Programming", diff: "Medium",
    pattern: "Expand Around Center", tags: ["DP", "palindrome", "count"],
    src: "LC", link: "https://leetcode.com/problems/palindromic-substrings/",
    desc: "Given a string s, return the number of palindromic substrings.",
    hint: "Expand around each center (single char and between chars). Count palindromes as you expand.",
    code: `function countSubstrings(s) {
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--; r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd
    expand(i, i + 1); // even
  }

  return count;
}

console.log(countSubstrings("aaa")); // 6`,
    complex: "Time: O(n²) · Space: O(1)",
  },
  {
    id: 83, title: "Decode Ways", cat: "Dynamic Programming", diff: "Medium",
    pattern: "1D DP with Constraints", tags: ["DP", "string decode", "1-26 range"],
    src: "LC", link: "https://leetcode.com/problems/decode-ways/",
    desc: "Count the number of ways to decode a digit string (A=1, B=2, ..., Z=26).",
    hint: "dp[i] = ways to decode s[0..i-1]. Take 1 digit (if non-zero): dp[i] += dp[i-1]. Take 2 digits (if 10-26): dp[i] += dp[i-2].",
    code: `function numDecodings(s) {
  if (!s || s[0] === '0') return 0;

  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    const oneDigit = parseInt(s[i - 1]);
    const twoDigit = parseInt(s.slice(i - 2, i));

    if (oneDigit !== 0) dp[i] += dp[i - 1];
    if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i - 2];
  }

  return dp[n];
}

console.log(numDecodings("226")); // 3`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 84, title: "Coin Change", cat: "Dynamic Programming", diff: "Medium",
    pattern: "Unbounded Knapsack", tags: ["DP", "BFS", "unbounded knapsack", "min coins"],
    src: "LC", link: "https://leetcode.com/problems/coin-change/",
    desc: "Find the minimum number of coins to make up the given amount. Return -1 if impossible.",
    hint: "dp[i] = min coins to make amount i. For each coin, dp[i] = min(dp[i], dp[i-coin]+1). Init dp[0]=0, rest=Infinity.",
    code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i >= coin && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1,5,6,9], 11)); // 2`,
    complex: "Time: O(amount·n) · Space: O(amount)",
  },
  {
    id: 85, title: "Maximum Product Subarray", cat: "Dynamic Programming", diff: "Medium",
    pattern: "Track Min and Max", tags: ["DP", "max product", "negative numbers"],
    src: "LC", link: "https://leetcode.com/problems/maximum-product-subarray/",
    desc: "Find the contiguous subarray with the largest product.",
    hint: "Track both min and max product ending at current position (negative × negative = positive). At each step, new max = max(n, n*maxProd, n*minProd).",
    code: `function maxProduct(nums) {
  let maxProd = nums[0], minProd = nums[0], res = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    const candidates = [n, n * maxProd, n * minProd];
    maxProd = Math.max(...candidates);
    minProd = Math.min(...candidates);
    res = Math.max(res, maxProd);
  }

  return res;
}

console.log(maxProduct([2,3,-2,4])); // 6`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 86, title: "Word Break", cat: "Dynamic Programming", diff: "Medium",
    pattern: "DP + Hash Set", tags: ["DP", "string", "word dict"],
    src: "LC", link: "https://leetcode.com/problems/word-break/",
    desc: "Return true if string s can be segmented into a space-separated sequence of words from wordDict.",
    hint: "dp[i] = can s[0..i-1] be segmented. For each i, check all j < i: if dp[j] is true and s[j..i] is in dict, dp[i]=true.",
    code: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

console.log(wordBreak("leetcode", ["leet","code"])); // true`,
    complex: "Time: O(n³) · Space: O(n)",
  },
  {
    id: 87, title: "Longest Increasing Subsequence", cat: "Dynamic Programming", diff: "Medium",
    pattern: "Binary Search (Patience Sort)", tags: ["DP", "LIS", "binary search", "O(n log n)"],
    src: "LC", link: "https://leetcode.com/problems/longest-increasing-subsequence/",
    desc: "Return the length of the longest strictly increasing subsequence.",
    hint: "Maintain a 'tails' array. For each number, binary search for the position in tails to place/replace. Length of tails = LIS length.",
    code: `function lengthOfLIS(nums) {
  const tails = [];

  for (const n of nums) {
    let lo = 0, hi = tails.length;

    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1;
      else hi = mid;
    }

    tails[lo] = n; // extend or replace
  }

  return tails.length;
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4`,
    complex: "Time: O(n log n) · Space: O(n)",
  },
  {
    id: 88, title: "Partition Equal Subset Sum", cat: "Dynamic Programming", diff: "Medium",
    pattern: "0/1 Knapsack", tags: ["DP", "knapsack", "subset sum"],
    src: "LC", link: "https://leetcode.com/problems/partition-equal-subset-sum/",
    desc: "Determine if an array can be partitioned into two subsets with equal sum.",
    hint: "Reduce to: can we pick a subset summing to total/2? 0/1 Knapsack DP with a boolean set.",
    code: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const n of nums) {
    // Traverse backwards to avoid using same element twice
    for (let j = target; j >= n; j--) {
      dp[j] = dp[j] || dp[j - n];
    }
  }

  return dp[target];
}

console.log(canPartition([1,5,11,5])); // true`,
    complex: "Time: O(n·target) · Space: O(target)",
  },
  {
    id: 89, title: "Unique Paths", cat: "Dynamic Programming", diff: "Medium",
    pattern: "2D DP", tags: ["DP", "grid", "combinatorics"],
    src: "LC", link: "https://leetcode.com/problems/unique-paths/",
    desc: "Count distinct paths from top-left to bottom-right in m×n grid, moving only right or down.",
    hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]. First row and column are all 1s.",
    code: `function uniquePaths(m, n) {
  // Space-optimized: only need one row
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}

console.log(uniquePaths(3, 7)); // 28`,
    complex: "Time: O(m·n) · Space: O(n)",
  },
  {
    id: 90, title: "Jump Game", cat: "Dynamic Programming", diff: "Medium",
    pattern: "Greedy", tags: ["greedy", "reach", "max jump"],
    src: "LC", link: "https://leetcode.com/problems/jump-game/",
    desc: "Given array where nums[i] is the max jump from position i, determine if you can reach the last index.",
    hint: "Track the max reachable index. If current index ever exceeds max reachable, return false.",
    code: `function canJump(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }

  return true;
}

console.log(canJump([2,3,1,1,4])); // true
console.log(canJump([3,2,1,0,4])); // false`,
    complex: "Time: O(n) · Space: O(1)",
  },

  // ─── GREEDY ──────────────────────────────────────────────────────────────────
  {
    id: 91, title: "Maximum Subarray", cat: "Greedy", diff: "Medium",
    pattern: "Kadane's Algorithm", tags: ["Kadane", "greedy", "subarray sum"],
    src: "LC", link: "https://leetcode.com/problems/maximum-subarray/",
    desc: "Find the contiguous subarray with the largest sum.",
    hint: "Kadane's: at each position, either extend the previous subarray or start fresh. curr = max(n, curr + n). Update global max.",
    code: `function maxSubArray(nums) {
  let curr = nums[0], maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]); // extend or restart
    maxSum = Math.max(maxSum, curr);
  }

  return maxSum;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 92, title: "Jump Game II", cat: "Greedy", diff: "Medium",
    pattern: "Greedy BFS (Level by Level)", tags: ["greedy", "BFS", "min jumps"],
    src: "LC", link: "https://leetcode.com/problems/jump-game-ii/",
    desc: "Return the minimum number of jumps to reach the last index.",
    hint: "Greedy: track current range end and farthest reachable. When you exhaust current range, increment jumps and set new range to farthest.",
    code: `function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === curEnd) { // exhausted current jump range
      jumps++;
      curEnd = farthest;
    }
  }

  return jumps;
}

console.log(jump([2,3,1,1,4])); // 2`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 93, title: "Gas Station", cat: "Greedy", diff: "Medium",
    pattern: "Greedy Start Point", tags: ["greedy", "circular", "accumulation"],
    src: "LC", link: "https://leetcode.com/problems/gas-station/",
    desc: "Find the starting gas station index from which you can complete a circuit, or return -1.",
    hint: "If total gas < total cost → impossible. Otherwise a solution exists. Start from 0; if tank drops negative, set new start at next station.",
    code: `function canCompleteCircuit(gas, cost) {
  const n = gas.length;
  let total = 0, tank = 0, start = 0;

  for (let i = 0; i < n; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;

    if (tank < 0) {
      start = i + 1; // current start can't work, try next
      tank = 0;
    }
  }

  return total >= 0 ? start : -1;
}

console.log(canCompleteCircuit([1,2,3,4,5],[3,4,5,1,2])); // 3`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 94, title: "Hand of Straights", cat: "Greedy", diff: "Medium",
    pattern: "Greedy + Sorted Map", tags: ["greedy", "sorted map", "consecutive groups"],
    src: "LC", link: "https://leetcode.com/problems/hand-of-straights/",
    desc: "Given a hand of cards and group size W, determine if you can rearrange them into groups of W consecutive cards.",
    hint: "Sort and use a frequency map. Process the smallest card available each time, consuming W consecutive cards.",
    code: `function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;

  const count = new Map();
  for (const card of hand) count.set(card, (count.get(card) || 0) + 1);

  const sorted = [...count.keys()].sort((a, b) => a - b);

  for (const card of sorted) {
    const freq = count.get(card);
    if (freq === 0) continue;

    for (let i = 0; i < groupSize; i++) {
      const c = count.get(card + i) || 0;
      if (c < freq) return false;
      count.set(card + i, c - freq);
    }
  }

  return true;
}`,
    complex: "Time: O(n log n) · Space: O(n)",
  },
  {
    id: 95, title: "Merge Intervals", cat: "Greedy", diff: "Medium",
    pattern: "Sort + Greedy Merge", tags: ["sorting", "intervals", "merge"],
    src: "LC", link: "https://leetcode.com/problems/merge-intervals/",
    desc: "Given an array of intervals, merge all overlapping intervals.",
    hint: "Sort by start. Iterate: if current interval overlaps last merged (start ≤ last.end), extend last's end. Otherwise push new interval.",
    code: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = res[res.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end); // extend
    } else {
      res.push([start, end]); // no overlap
    }
  }

  return res;
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
// [[1,6],[8,10],[15,18]]`,
    complex: "Time: O(n log n) · Space: O(n)",
  },

  // ─── BACKTRACKING ─────────────────────────────────────────────────────────────
  {
    id: 96, title: "Subsets", cat: "Backtracking", diff: "Medium",
    pattern: "Backtracking (Include/Exclude)", tags: ["backtracking", "power set", "recursion"],
    src: "LC", link: "https://leetcode.com/problems/subsets/",
    desc: "Return all possible subsets (the power set) of nums. The solution set must not contain duplicate subsets.",
    hint: "At each index, either include or exclude the element. Add current path to result at every recursive call.",
    code: `function subsets(nums) {
  const res = [];

  function bt(start, curr) {
    res.push([...curr]); // add at every level

    for (let i = start; i < nums.length; i++) {
      curr.push(nums[i]);
      bt(i + 1, curr);
      curr.pop(); // backtrack
    }
  }

  bt(0, []);
  return res;
}

console.log(subsets([1,2,3]));
// [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]`,
    complex: "Time: O(n·2ⁿ) · Space: O(n)",
  },
  {
    id: 97, title: "Combination Sum", cat: "Backtracking", diff: "Medium",
    pattern: "Backtracking (Unlimited Reuse)", tags: ["backtracking", "combinations", "unlimited"],
    src: "LC", link: "https://leetcode.com/problems/combination-sum/",
    desc: "Find all combinations of candidates that sum to target. Each number may be used unlimited times.",
    hint: "Backtrack: at each step, try each candidate from 'start' index. Reuse by passing same index. Stop when sum exceeds target.",
    code: `function combinationSum(candidates, target) {
  const res = [];

  function bt(start, curr, remaining) {
    if (remaining === 0) { res.push([...curr]); return; }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      curr.push(candidates[i]);
      bt(i, curr, remaining - candidates[i]); // i (not i+1) → can reuse
      curr.pop();
    }
  }

  bt(0, [], target);
  return res;
}

console.log(combinationSum([2,3,6,7], 7)); // [[2,2,3],[7]]`,
    complex: "Time: O(2^(t/min)) · Space: O(t/min)",
  },
  {
    id: 98, title: "Permutations", cat: "Backtracking", diff: "Medium",
    pattern: "Backtracking with Visited Array", tags: ["backtracking", "permutations", "visited"],
    src: "LC", link: "https://leetcode.com/problems/permutations/",
    desc: "Return all permutations of distinct integers.",
    hint: "Use a visited/used array. At each step, try all unvisited numbers. Mark as used before recursing, unmark after (backtrack).",
    code: `function permute(nums) {
  const res = [];
  const used = new Array(nums.length).fill(false);

  function bt(curr) {
    if (curr.length === nums.length) {
      res.push([...curr]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      curr.push(nums[i]);
      bt(curr);
      curr.pop();
      used[i] = false;
    }
  }

  bt([]);
  return res;
}

console.log(permute([1,2,3]).length); // 6`,
    complex: "Time: O(n·n!) · Space: O(n)",
  },
  {
    id: 99, title: "Subsets II", cat: "Backtracking", diff: "Medium",
    pattern: "Backtracking with Dedup", tags: ["backtracking", "duplicates", "sorting"],
    src: "LC", link: "https://leetcode.com/problems/subsets-ii/",
    desc: "Given an integer array that may contain duplicates, return all possible subsets. No duplicate subsets.",
    hint: "Sort first. In the loop, skip nums[i] if it equals nums[i-1] and i > start (same level duplicate).",
    code: `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  function bt(start, curr) {
    res.push([...curr]);

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue; // skip dup at same level
      curr.push(nums[i]);
      bt(i + 1, curr);
      curr.pop();
    }
  }

  bt(0, []);
  return res;
}`,
    complex: "Time: O(n·2ⁿ) · Space: O(n)",
  },
  {
    id: 100, title: "Combination Sum II", cat: "Backtracking", diff: "Medium",
    pattern: "Backtracking with Dedup (No Reuse)", tags: ["backtracking", "duplicates", "no reuse"],
    src: "LC", link: "https://leetcode.com/problems/combination-sum-ii/",
    desc: "Find all unique combinations summing to target. Each number used at most once.",
    hint: "Sort. Use i+1 to prevent reuse. Skip same value at same level (i > start && nums[i] === nums[i-1]).",
    code: `function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];

  function bt(start, curr, remaining) {
    if (remaining === 0) { res.push([...curr]); return; }

    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;
      if (i > start && candidates[i] === candidates[i - 1]) continue; // skip dup

      curr.push(candidates[i]);
      bt(i + 1, curr, remaining - candidates[i]);
      curr.pop();
    }
  }

  bt(0, [], target);
  return res;
}`,
    complex: "Time: O(2ⁿ) · Space: O(n)",
  },
  {
    id: 101, title: "N-Queens", cat: "Backtracking", diff: "Hard",
    pattern: "Constraint Backtracking", tags: ["backtracking", "N-Queens", "set tracking"],
    src: "LC", link: "https://leetcode.com/problems/n-queens/",
    desc: "Place N queens on N×N board such that no two queens attack each other.",
    hint: "Use sets to track occupied columns, left diagonals (row-col), and right diagonals (row+col). Backtrack row by row.",
    code: `function solveNQueens(n) {
  const res = [];
  const cols = new Set(), d1 = new Set(), d2 = new Set(); // diag1: r-c, diag2: r+c
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  function bt(row) {
    if (row === n) {
      res.push(board.map(r => r.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || d1.has(row - col) || d2.has(row + col)) continue;

      cols.add(col); d1.add(row - col); d2.add(row + col);
      board[row][col] = 'Q';

      bt(row + 1);

      cols.delete(col); d1.delete(row - col); d2.delete(row + col);
      board[row][col] = '.';
    }
  }

  bt(0);
  return res;
}`,
    complex: "Time: O(n!) · Space: O(n²)",
  },
  {
    id: 102, title: "Word Search", cat: "Backtracking", diff: "Medium",
    pattern: "DFS Backtracking on Grid", tags: ["DFS", "backtracking", "grid", "path"],
    src: "LC", link: "https://leetcode.com/problems/word-search/",
    desc: "Given a 2D board of characters, find if the word exists in the grid using adjacent cells.",
    hint: "DFS from each cell. Mark cell as '#' before recursing, restore after. Check all 4 directions.",
    code: `function exist(board, word) {
  const m = board.length, n = board[0].length;

  function dfs(r, c, i) {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[i]) return false;

    const temp = board[r][c];
    board[r][c] = '#'; // visited

    const found = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);

    board[r][c] = temp; // backtrack
    return found;
  }

  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      if (dfs(r, c, 0)) return true;

  return false;
}`,
    complex: "Time: O(m·n·4^L) · Space: O(L)",
  },
  {
    id: 103, title: "Palindrome Partitioning", cat: "Backtracking", diff: "Medium",
    pattern: "Backtracking + Palindrome Check", tags: ["backtracking", "palindrome", "partition"],
    src: "LC", link: "https://leetcode.com/problems/palindrome-partitioning/",
    desc: "Partition string s such that every substring of the partition is a palindrome. Return all possible partitions.",
    hint: "At each position, try all palindromic substrings starting here. Backtrack when reaching end of string.",
    code: `function partition(s) {
  const res = [];

  function isPalin(str) {
    let l = 0, r = str.length - 1;
    while (l < r) { if (str[l++] !== str[r--]) return false; }
    return true;
  }

  function bt(start, curr) {
    if (start === s.length) { res.push([...curr]); return; }

    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.slice(start, end);
      if (isPalin(sub)) {
        curr.push(sub);
        bt(end, curr);
        curr.pop();
      }
    }
  }

  bt(0, []);
  return res;
}`,
    complex: "Time: O(n·2ⁿ) · Space: O(n)",
  },
  {
    id: 104, title: "Letter Combinations of a Phone Number", cat: "Backtracking", diff: "Medium",
    pattern: "Backtracking on Character Map", tags: ["backtracking", "recursion", "phone digits"],
    src: "LC", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    desc: "Return all possible letter combinations from a digit string (phone keypad mapping).",
    hint: "Build a map of digit → letters. Backtrack through each digit, appending each letter choice.",
    code: `function letterCombinations(digits) {
  if (!digits.length) return [];

  const map = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  const res = [];

  function bt(i, curr) {
    if (i === digits.length) { res.push(curr); return; }
    for (const c of map[digits[i]]) bt(i + 1, curr + c);
  }

  bt(0, '');
  return res;
}

console.log(letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]`,
    complex: "Time: O(4^n·n) · Space: O(n)",
  },

  // ─── INTERVALS ───────────────────────────────────────────────────────────────
  {
    id: 105, title: "Insert Interval", cat: "Intervals", diff: "Medium",
    pattern: "Merge Sorted Intervals", tags: ["intervals", "merge", "sorted"],
    src: "LC", link: "https://leetcode.com/problems/insert-interval/",
    desc: "Insert a new interval into a sorted list of non-overlapping intervals and merge if necessary.",
    hint: "Add all intervals that end before newInterval.start. Merge overlapping intervals. Add all remaining.",
    code: `function insert(intervals, newInterval) {
  const res = [];
  let i = 0, n = intervals.length;

  // Add all intervals before new interval
  while (i < n && intervals[i][1] < newInterval[0]) {
    res.push(intervals[i++]);
  }

  // Merge overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval);

  // Add remaining
  while (i < n) res.push(intervals[i++]);

  return res;
}

console.log(insert([[1,3],[6,9]], [2,5])); // [[1,5],[6,9]]`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 106, title: "Non-Overlapping Intervals", cat: "Intervals", diff: "Medium",
    pattern: "Greedy Interval Scheduling", tags: ["greedy", "intervals", "min removals"],
    src: "LC", link: "https://leetcode.com/problems/non-overlapping-intervals/",
    desc: "Find the minimum number of intervals to remove to make the rest non-overlapping.",
    hint: "Sort by end time. Greedily keep intervals with earliest end. Count overlapping ones as removals.",
    code: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]); // sort by end
  let removals = 0, prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end; // keep this interval
    } else {
      removals++; // remove this interval (it overlaps with prev)
    }
  }

  return removals;
}

console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1`,
    complex: "Time: O(n log n) · Space: O(1)",
  },
  {
    id: 107, title: "Meeting Rooms", cat: "Intervals", diff: "Easy",
    pattern: "Sort + Check Overlap", tags: ["intervals", "sorting", "overlap check"],
    src: "LC", link: "https://leetcode.com/problems/meeting-rooms/",
    desc: "Given an array of meeting time intervals, determine if a person could attend all meetings.",
    hint: "Sort by start time. If any meeting starts before the previous one ends, return false.",
    code: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }

  return true;
}

console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false`,
    complex: "Time: O(n log n) · Space: O(1)",
  },
  {
    id: 108, title: "Meeting Rooms II", cat: "Intervals", diff: "Medium",
    pattern: "Min Heap / Sorted Events", tags: ["heap", "intervals", "min rooms"],
    src: "LC", link: "https://leetcode.com/problems/meeting-rooms-ii/",
    desc: "Find the minimum number of conference rooms required.",
    hint: "Sort by start. Use a min-heap of end times. If earliest end ≤ new start, reuse room (pop and push new end). Otherwise add new room.",
    code: `function minMeetingRooms(intervals) {
  if (!intervals.length) return 0;

  intervals.sort((a, b) => a[0] - b[0]);

  // Min-heap simulation: sorted end times
  const ends = [intervals[0][1]];

  for (let i = 1; i < intervals.length; i++) {
    ends.sort((a, b) => a - b); // keep sorted (min-heap simulation)
    if (intervals[i][0] >= ends[0]) {
      ends.shift(); // reuse room
    }
    ends.push(intervals[i][1]);
  }

  return ends.length;
}

console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2`,
    complex: "Time: O(n log n) · Space: O(n)",
  },

  // ─── MATH & BIT MANIPULATION ─────────────────────────────────────────────────
  {
    id: 109, title: "Single Number", cat: "Math & Bit Manipulation", diff: "Easy",
    pattern: "XOR All Elements", tags: ["XOR", "bit manipulation", "O(1) space"],
    src: "LC", link: "https://leetcode.com/problems/single-number/",
    desc: "Every element in the array appears twice except for one. Find that single one in O(n) and O(1) space.",
    hint: "XOR of two same numbers = 0. XOR of a number with 0 = the number. XOR all elements, pairs cancel out.",
    code: `function singleNumber(nums) {
  return nums.reduce((acc, n) => acc ^ n, 0);
}

console.log(singleNumber([4,1,2,1,2])); // 4`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 110, title: "Number of 1 Bits", cat: "Math & Bit Manipulation", diff: "Easy",
    pattern: "Bit Counting", tags: ["bit manipulation", "Hamming weight", "Brian Kernighan"],
    src: "LC", link: "https://leetcode.com/problems/number-of-1-bits/",
    desc: "Return the number of '1' bits in the binary representation of a positive integer (Hamming weight).",
    hint: "Brian Kernighan trick: n & (n-1) removes the lowest set bit. Count how many times until n = 0.",
    code: `function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1; // remove lowest set bit
    count++;
  }
  return count;
}

console.log(hammingWeight(11)); // 3 (1011 has three 1s)`,
    complex: "Time: O(k) where k = # of 1s · Space: O(1)",
  },
  {
    id: 111, title: "Counting Bits", cat: "Math & Bit Manipulation", diff: "Easy",
    pattern: "DP with Bit Trick", tags: ["bit manipulation", "DP", "popcount"],
    src: "LC", link: "https://leetcode.com/problems/counting-bits/",
    desc: "Return an array ans of length n+1 where ans[i] = number of 1s in binary representation of i.",
    hint: "dp[i] = dp[i >> 1] + (i & 1). Right shift removes lowest bit; add 1 if lowest bit was 1.",
    code: `function countBits(n) {
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }

  return dp;
}

console.log(countBits(5)); // [0,1,1,2,1,2]`,
    complex: "Time: O(n) · Space: O(n)",
  },
  {
    id: 112, title: "Reverse Bits", cat: "Math & Bit Manipulation", diff: "Easy",
    pattern: "Bit Reversal", tags: ["bit manipulation", "bit reversal", "unsigned"],
    src: "LC", link: "https://leetcode.com/problems/reverse-bits/",
    desc: "Reverse bits of a 32-bit unsigned integer.",
    hint: "Extract bits from right (n & 1), build result by left-shifting and OR-ing. Repeat 32 times.",
    code: `function reverseBits(n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1; // unsigned right shift
  }

  return result >>> 0; // return as unsigned 32-bit
}`,
    complex: "Time: O(1) — 32 iterations · Space: O(1)",
  },
  {
    id: 113, title: "Missing Number", cat: "Math & Bit Manipulation", diff: "Easy",
    pattern: "XOR or Gauss Sum", tags: ["XOR", "math", "sum formula"],
    src: "LC", link: "https://leetcode.com/problems/missing-number/",
    desc: "Given array containing n distinct numbers in range [0, n], find the one missing number.",
    hint: "Expected sum = n*(n+1)/2. Actual sum = sum of array. Difference is the missing number.",
    code: `function missingNumber(nums) {
  const n = nums.length;
  const expected = n * (n + 1) / 2;
  const actual = nums.reduce((a, b) => a + b, 0);
  return expected - actual;
}

// XOR approach:
function missingNumberXOR(nums) {
  let result = nums.length;
  for (let i = 0; i < nums.length; i++) result ^= i ^ nums[i];
  return result;
}

console.log(missingNumber([3,0,1])); // 2`,
    complex: "Time: O(n) · Space: O(1)",
  },
  {
    id: 114, title: "Sum of Two Integers", cat: "Math & Bit Manipulation", diff: "Medium",
    pattern: "Bit Addition (No + operator)", tags: ["bit manipulation", "XOR", "carry"],
    src: "LC", link: "https://leetcode.com/problems/sum-of-two-integers/",
    desc: "Calculate sum of two integers without using the operators + and -.",
    hint: "XOR gives sum without carry. AND with left shift gives carries. Repeat until no carry.",
    code: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;   // sum without carry
    b = carry;   // process carry
  }
  return a;
}

console.log(getSum(1, 2)); // 3
console.log(getSum(-2, 3)); // 1`,
    complex: "Time: O(1) — max 32 bits · Space: O(1)",
  },
  {
    id: 115, title: "Reverse Integer", cat: "Math & Bit Manipulation", diff: "Medium",
    pattern: "Math Digit Extraction", tags: ["math", "overflow check", "digits"],
    src: "LC", link: "https://leetcode.com/problems/reverse-integer/",
    desc: "Given a 32-bit signed integer, reverse its digits. Return 0 if outside 32-bit signed int range.",
    hint: "Extract digits using % 10. Build reversed number using * 10. Check bounds at each step.",
    code: `function reverse(x) {
  const MAX = 2 ** 31 - 1, MIN = -(2 ** 31);
  let res = 0;

  while (x !== 0) {
    const digit = x % 10;
    x = Math.trunc(x / 10);
    res = res * 10 + digit;
    if (res > MAX || res < MIN) return 0;
  }

  return res;
}

console.log(reverse(123));  // 321
console.log(reverse(-123)); // -321`,
    complex: "Time: O(log n) · Space: O(1)",
  },
  {
    id: 116, title: "Power of Two", cat: "Math & Bit Manipulation", diff: "Easy",
    pattern: "Bit Trick", tags: ["bit manipulation", "power of two", "n & n-1"],
    src: "LC", link: "https://leetcode.com/problems/power-of-two/",
    desc: "Given an integer n, return true if it is a power of two.",
    hint: "A power of two has exactly one '1' bit. n & (n-1) == 0 if n is a power of 2. Also n > 0.",
    code: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(6));  // false`,
    complex: "Time: O(1) · Space: O(1)",
  },
];

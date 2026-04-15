export const GUIDES = {
  "Arrays & Hashing": {
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: "⚡",
    tagline: "The most fundamental category — most problems reduce to a clever mapping.",
    overview: `Arrays and hash maps are the bread and butter of DSA. A hash map gives you O(1) average-case lookup, insertion, and deletion — turning O(n²) brute-force solutions into O(n).

The core insight: instead of searching for something, store it in a hash map so you can check its existence in O(1).`,
    whenToUse: [
      "You need to track frequencies or counts",
      "You need O(1) lookup by value (not by index)",
      "The problem says 'find two elements that sum to X'",
      "You need to group or categorize elements",
    ],
    keyPatterns: [
      {
        name: "Complement Map (Two Sum pattern)",
        desc: "For each element, store it in a map. Check if 'target - element' already exists.",
        code: `const map = new Map();
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (map.has(complement)) return [map.get(complement), i];
  map.set(nums[i], i);
}`,
      },
      {
        name: "Frequency Count",
        desc: "Count occurrences of each element. Then reason about the frequency distribution.",
        code: `const freq = new Map();
for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
// Now freq.get(x) = how many times x appears`,
      },
      {
        name: "Bucket Sort by Frequency",
        desc: "Create an array indexed by frequency (0 to n). Fill buckets. Read top-k from the end. O(n) time!",
        code: `const bucket = Array.from({length: n + 1}, () => []);
for (const [val, cnt] of freq) bucket[cnt].push(val);
// bucket[i] = all elements appearing exactly i times`,
      },
      {
        name: "Prefix/Suffix Products",
        desc: "Two passes: first store prefix products left-to-right, then multiply suffix products right-to-left.",
        code: `// Pass 1: prefix
let prefix = 1;
for (let i = 0; i < n; i++) { res[i] = prefix; prefix *= nums[i]; }
// Pass 2: suffix  
let suffix = 1;
for (let i = n-1; i >= 0; i--) { res[i] *= suffix; suffix *= nums[i]; }`,
      },
    ],
    complexity: "Time: O(n) with hash map · Space: O(n) for the map",
    tips: [
      "Use Map() over object {} for cleaner code and non-string keys",
      "For 26 lowercase letters, a 26-element array is faster than a map",
      "In anagram problems, sorting the string as a key is classic",
      "Bucket sort turns 'top-k frequent' from O(n log n) to O(n)",
    ],
  },

  "Two Pointers": {
    color: "#0F6E56",
    bg: "#E1F5EE",
    icon: "↔",
    tagline: "Two references moving through the same data — eliminating the need for nested loops.",
    overview: `Two pointers is a technique where you use two indices that traverse the data structure simultaneously. The key insight: by moving pointers intelligently (not just iterating linearly), you reduce O(n²) brute force to O(n).

It works on sorted arrays, strings, and linked lists. The pointers can start at both ends and move toward each other, or both start at the beginning moving at different speeds.`,
    whenToUse: [
      "Array is sorted or you sort it first",
      "You need pairs/triplets summing to a target",
      "You need to check palindromes or reverse-related problems",
      "You need to partition in-place",
      "Removing duplicates from sorted array",
    ],
    keyPatterns: [
      {
        name: "Opposite Ends (Inward)",
        desc: "Start at both ends, move inward. Great for pair-sum problems on sorted arrays.",
        code: `let l = 0, r = nums.length - 1;
while (l < r) {
  const sum = nums[l] + nums[r];
  if (sum === target) return [l, r];
  else if (sum < target) l++;  // need larger
  else r--;                    // need smaller
}`,
      },
      {
        name: "Same Direction (Fast/Slow)",
        desc: "Both pointers start at left. Slow pointer tracks valid position, fast pointer scans ahead.",
        code: `let slow = 0;
for (let fast = 0; fast < arr.length; fast++) {
  if (condition(arr[fast])) {
    arr[slow] = arr[fast];
    slow++;
  }
}
return slow; // length of valid part`,
      },
      {
        name: "Three Pointers (3Sum)",
        desc: "Fix one pointer with a loop. Use two-pointer on the rest. Sort first, skip duplicates.",
        code: `nums.sort((a, b) => a - b);
for (let i = 0; i < nums.length - 2; i++) {
  if (i > 0 && nums[i] === nums[i-1]) continue; // dedup
  let l = i+1, r = nums.length-1;
  // ... two pointer on [l..r]
}`,
      },
    ],
    complexity: "Time: O(n) or O(n²) for triplet · Space: O(1)",
    tips: [
      "Sort first if needed — sorting costs O(n log n) which is still efficient",
      "Always handle duplicates in 3Sum by skipping same values",
      "The 'move the smaller pointer' insight for Container With Most Water is key",
      "Two pointers only works when you can guarantee what moving a pointer does",
    ],
  },

  "Sliding Window": {
    color: "#854F0B",
    bg: "#FAEEDA",
    icon: "▭",
    tagline: "A subarray/substring that slides through the data — O(n) instead of O(n²) brute force.",
    overview: `A sliding window is a contiguous subarray or substring that you expand and shrink. Instead of re-computing from scratch for every possible window (O(n²)), you maintain state as the window slides, giving O(n).

Two variants:
• Fixed size: window is always k elements wide. Add right, remove left.
• Variable size: expand until a condition breaks, shrink from left until valid again.`,
    whenToUse: [
      "Problem involves a contiguous subarray or substring",
      "You need maximum/minimum of all subarrays of size k",
      "You need the longest/shortest subarray satisfying some condition",
      "Frequency of characters inside a window matters",
    ],
    keyPatterns: [
      {
        name: "Fixed Window",
        desc: "Window size is always k. Add the new element, remove the element that fell off the left side.",
        code: `// Example: sum of every window of size k
let windowSum = 0;
for (let i = 0; i < k; i++) windowSum += nums[i];
let maxSum = windowSum;

for (let i = k; i < nums.length; i++) {
  windowSum += nums[i] - nums[i - k]; // slide!
  maxSum = Math.max(maxSum, windowSum);
}`,
      },
      {
        name: "Variable Window — Expand & Shrink",
        desc: "Expand right pointer. When window becomes invalid, shrink from left until valid again.",
        code: `let l = 0;
const window = new Set();

for (let r = 0; r < s.length; r++) {
  // Shrink until window is valid
  while (window.has(s[r])) {
    window.delete(s[l]);
    l++;
  }
  window.add(s[r]);
  // window [l..r] is now valid
  maxLen = Math.max(maxLen, r - l + 1);
}`,
      },
      {
        name: "Two-Map Window (Minimum Window)",
        desc: "Track 'need' and 'have' maps. Count 'formed' characters that meet their required frequency.",
        code: `const need = {}, have = {};
for (const c of t) need[c] = (need[c] || 0) + 1;
let formed = 0, required = Object.keys(need).length;
let l = 0;

for (let r = 0; r < s.length; r++) {
  have[s[r]] = (have[s[r]] || 0) + 1;
  if (need[s[r]] && have[s[r]] === need[s[r]]) formed++;
  
  while (formed === required) {
    // window is valid — try to shrink
    have[s[l]]--;
    if (need[s[l]] && have[s[l]] < need[s[l]]) formed--;
    l++;
  }
}`,
      },
      {
        name: "Validity Trick (Character Replacement)",
        desc: "Window is valid when (window_size - max_freq_char) ≤ k. You only need to track max frequency.",
        code: `let l = 0, maxFreq = 0;
const count = {};

for (let r = 0; r < s.length; r++) {
  count[s[r]] = (count[s[r]] || 0) + 1;
  maxFreq = Math.max(maxFreq, count[s[r]]);
  
  // If replacements needed > k, shrink
  if ((r - l + 1) - maxFreq > k) {
    count[s[l]]--;
    l++;
  }
}`,
      },
    ],
    complexity: "Time: O(n) — each element enters and exits window at most once · Space: O(k) or O(alphabet)",
    tips: [
      "Think of the window as [l, r] inclusive. Size = r - l + 1.",
      "In variable windows, the outer for-loop expands r; inner while-loop shrinks l.",
      "For character windows, use a 26-element array instead of a map for speed.",
      "The 'formed' variable trick avoids iterating the entire need map each time.",
    ],
  },

  "Stack": {
    color: "#533AB7",
    bg: "#EEEDFE",
    icon: "≡",
    tagline: "Last-In-First-Out — perfect for tracking 'what came before' and 'next greater element' problems.",
    overview: `A stack is a LIFO (Last In First Out) data structure. Push to add, pop to remove from the top. The critical insight for many problems: a stack lets you efficiently track previous elements in a way that maintains a specific invariant.

Monotonic stacks are the most powerful variant — they maintain a stack that is always sorted (increasing or decreasing). This enables O(n) solutions for 'next greater element', 'largest rectangle', and similar problems.`,
    whenToUse: [
      "Matching brackets, tags, or nested structures",
      "Undo operations or call stack simulation",
      "Next greater/smaller element problems",
      "Calculating areas (histograms, rainwater)",
      "Evaluating postfix expressions",
    ],
    keyPatterns: [
      {
        name: "Bracket Matching",
        desc: "Push open brackets. On close bracket, pop and verify it matches.",
        code: `const stack = [];
const match = {')':'(', ']':'[', '}':'{'};

for (const c of s) {
  if ('([{'.includes(c)) stack.push(c);
  else if (stack.pop() !== match[c]) return false;
}
return stack.length === 0;`,
      },
      {
        name: "Monotonic Decreasing Stack (Next Greater)",
        desc: "Keep a stack of indices with decreasing values. When current element is bigger, pop and record.",
        code: `const result = new Array(n).fill(0);
const stack = []; // indices, monotonic decreasing

for (let i = 0; i < n; i++) {
  // Pop while current is greater than stack top
  while (stack.length && nums[i] > nums[stack.at(-1)]) {
    const j = stack.pop();
    result[j] = nums[i]; // next greater for j is nums[i]
  }
  stack.push(i);
}`,
      },
      {
        name: "Monotonic Increasing Stack (Largest Rectangle)",
        desc: "Keep indices with increasing heights. When height drops, pop and compute area.",
        code: `const stack = []; // indices, increasing heights

for (let i = 0; i <= n; i++) {
  const h = i === n ? 0 : heights[i];
  while (stack.length && h < heights[stack.at(-1)]) {
    const height = heights[stack.pop()];
    const width = stack.length ? i - stack.at(-1) - 1 : i;
    maxArea = Math.max(maxArea, height * width);
  }
  stack.push(i);
}`,
      },
      {
        name: "Min Stack (Auxiliary Stack)",
        desc: "Maintain a second stack that tracks the running minimum. Each slot stores 'min so far'.",
        code: `class MinStack {
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length
      ? Math.min(val, this.minStack.at(-1))
      : val;
    this.minStack.push(min);
  }
  getMin() { return this.minStack.at(-1); }
}`,
      },
    ],
    complexity: "Time: O(n) — each element pushed/popped at most once · Space: O(n)",
    tips: [
      "Think of a monotonic stack as maintaining a 'candidates' list",
      "Decreasing stack → 'next greater' problems. Increasing stack → 'previous smaller' problems.",
      "Add a sentinel value (0 or -infinity) to flush remaining stack elements at the end",
      "The 'width' in rectangle problems uses the previous stack top as the left boundary",
    ],
  },

  "Binary Search": {
    color: "#3B6D11",
    bg: "#EAF3DE",
    icon: "⟡",
    tagline: "Halve the search space at every step — turns O(n) into O(log n).",
    overview: `Binary search works on any monotonic function — not just sorted arrays. The key: you need a property such that all values on one side satisfy it and all values on the other side don't.

The classic mistake: getting the loop condition (lo < hi vs lo <= hi) and pointer updates wrong. There are two clean templates depending on whether you're searching for an exact value or the first/last valid position.`,
    whenToUse: [
      "The array is sorted (or rotated sorted)",
      "You're searching for a value with O(log n) requirement",
      "You can binary search on the answer (min/max speed, capacity, etc.)",
      "The problem has a monotonic check function",
    ],
    keyPatterns: [
      {
        name: "Exact Match Template",
        desc: "Find exact value. Loop while lo <= hi. Return mid if found, or -1 at the end.",
        code: `let lo = 0, hi = nums.length - 1;

while (lo <= hi) {
  const mid = (lo + hi) >> 1; // or Math.floor((lo+hi)/2)
  if (nums[mid] === target) return mid;
  else if (nums[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}
return -1;`,
      },
      {
        name: "Find First / Lower Bound",
        desc: "Find first position satisfying a condition. Loop while lo < hi. hi converges to answer.",
        code: `let lo = 0, hi = nums.length; // hi = one past end

while (lo < hi) {
  const mid = (lo + hi) >> 1;
  if (condition(mid)) hi = mid;  // could be answer, search left
  else lo = mid + 1;             // not valid, search right
}
return lo; // lo === hi = first valid position`,
      },
      {
        name: "Binary Search on Answer Space",
        desc: "Not searching an array — searching for the optimal value. Check if a given value works.",
        code: `let lo = MIN_POSSIBLE, hi = MAX_POSSIBLE;

while (lo < hi) {
  const mid = (lo + hi) >> 1;
  if (canAchieve(mid)) hi = mid; // mid works, try smaller
  else lo = mid + 1;             // mid too small
}
return lo;

// canAchieve(k) = true/false check function`,
      },
      {
        name: "Rotated Array",
        desc: "One half is always sorted. Determine which half, check if target is in that half.",
        code: `while (lo <= hi) {
  const mid = (lo + hi) >> 1;
  if (nums[mid] === target) return mid;
  
  if (nums[lo] <= nums[mid]) { // left half sorted
    if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
    else lo = mid + 1;
  } else { // right half sorted
    if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
    else hi = mid - 1;
  }
}`,
      },
    ],
    complexity: "Time: O(log n) · Space: O(1)",
    tips: [
      "Use (lo + hi) >> 1 instead of (lo + hi) / 2 to avoid integer overflow",
      "Choose lo < hi (converge) vs lo <= hi (exact match) based on whether you return from loop body or after",
      "For 'binary search on answer': the check function must be monotonic — if k works, k+1 works (or vice versa)",
      "Rotated array: always one half is sorted. Check nums[lo] <= nums[mid].",
    ],
  },

  "Linked List": {
    color: "#993556",
    bg: "#FBEAF0",
    icon: "⬡",
    tagline: "Sequential nodes with pointers — mastering pointer manipulation is the key.",
    overview: `Linked lists require careful pointer management. Unlike arrays, there's no random access — you traverse sequentially. Most problems require in-place manipulation with O(1) extra space.

Key techniques: dummy nodes, two pointers (fast/slow), reversal in-place, and the merge pattern. The dummy node is your best friend — it eliminates edge cases for the head node.`,
    whenToUse: [
      "You need to reverse, merge, or split a linked list",
      "Detecting or finding the entry point of a cycle",
      "Finding the middle or kth from end",
      "Implementing LRU cache or other designs",
    ],
    keyPatterns: [
      {
        name: "Dummy Head Node",
        desc: "Prepend a dummy node to avoid special-casing the head. Return dummy.next at the end.",
        code: `const dummy = { next: null };
let cur = dummy;

// Build the list normally
while (condition) {
  cur.next = someNode;
  cur = cur.next;
}

return dummy.next; // actual head`,
      },
      {
        name: "In-place Reversal",
        desc: "Three pointers: prev (null), curr, next. Reverse links one at a time.",
        code: `let prev = null, curr = head;

while (curr) {
  const next = curr.next; // 1. save next
  curr.next = prev;       // 2. reverse link
  prev = curr;            // 3. advance prev
  curr = next;            // 4. advance curr
}

return prev; // new head`,
      },
      {
        name: "Fast/Slow Pointers (Floyd's)",
        desc: "Slow moves 1 step, fast moves 2. They meet inside cycle, or fast reaches end (no cycle).",
        code: `let slow = head, fast = head;

while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true; // cycle detected
}

return false; // no cycle`,
      },
      {
        name: "Find Middle of List",
        desc: "Fast moves 2x. When fast reaches end, slow is at middle.",
        code: `let slow = head, fast = head;

while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
}

return slow; // middle node`,
      },
      {
        name: "Gap Trick (Nth from End)",
        desc: "Move fast pointer n+1 steps ahead. Then move both until fast is null. Slow is one before target.",
        code: `const dummy = { next: head };
let slow = dummy, fast = dummy;

for (let i = 0; i <= n; i++) fast = fast.next;

while (fast) { slow = slow.next; fast = fast.next; }

slow.next = slow.next.next; // remove nth from end`,
      },
    ],
    complexity: "Time: O(n) · Space: O(1)",
    tips: [
      "Always use a dummy node for any problem that might modify the head",
      "Draw the pointer manipulations on paper for reversal problems — it's easy to lose track",
      "For cycle detection: Phase 1 finds meeting point. Phase 2 finds cycle entry (reset one pointer to head).",
      "Reorder List = find middle + reverse second half + merge interleaved",
    ],
  },

  "Trees": {
    color: "#3B6D11",
    bg: "#EAF3DE",
    icon: "🌲",
    tagline: "Hierarchical structure — recursive thinking is the key to elegance.",
    overview: `Binary trees are naturally recursive — each node is the root of a subtree. This makes recursive DFS (depth-first search) the go-to approach. For level-based problems, BFS with a queue shines.

Three DFS orderings:
• Preorder (root, left, right) — building, copying
• Inorder (left, root, right) — BST sorted order
• Postorder (left, right, root) — deleting, height

The mental model: trust the recursion. Define what your function returns, handle the base case, then combine left and right results.`,
    whenToUse: [
      "Traversal (inorder, preorder, level order)",
      "Path sums, heights, diameters",
      "BST operations (validate, search, kth smallest)",
      "LCA (Lowest Common Ancestor)",
      "Constructing trees from traversal arrays",
    ],
    keyPatterns: [
      {
        name: "DFS Recursive Template",
        desc: "Base case handles null. Return combined result from left and right subtrees.",
        code: `function dfs(node) {
  if (!node) return BASE_CASE;
  
  const left = dfs(node.left);
  const right = dfs(node.right);
  
  // Combine left, right, and current node
  return COMBINE(left, right, node.val);
}`,
      },
      {
        name: "DFS with Global State",
        desc: "Track a global variable (max, count, result). Update it inside DFS, return local contribution.",
        code: `let globalMax = -Infinity;

function dfs(node) {
  if (!node) return 0;
  const l = Math.max(0, dfs(node.left));
  const r = Math.max(0, dfs(node.right));
  
  globalMax = Math.max(globalMax, node.val + l + r); // update global
  return node.val + Math.max(l, r); // return to parent
}`,
      },
      {
        name: "BFS Level Order",
        desc: "Queue-based traversal. Process level-by-level by snapshotting queue size at start of each level.",
        code: `const queue = [root];

while (queue.length) {
  const size = queue.length; // current level size
  const level = [];
  
  for (let i = 0; i < size; i++) {
    const node = queue.shift();
    level.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  result.push(level);
}`,
      },
      {
        name: "BST Traversal with Bounds",
        desc: "Pass min/max bounds down the tree. Used for validation, search, and insertion.",
        code: `function isValidBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  
  return (
    isValidBST(node.left, min, node.val) &&  // left: max = node.val
    isValidBST(node.right, node.val, max)     // right: min = node.val
  );
}`,
      },
    ],
    complexity: "Time: O(n) · Space: O(h) where h = height (O(log n) balanced, O(n) skewed)",
    tips: [
      "For postorder problems: compute children first, then combine at current node",
      "Inorder of BST = sorted sequence — use this for kth smallest",
      "LCA: if both p and q are in different subtrees, current node is the LCA",
      "When DFS returns -1 to signal 'invalid state', it's called 'early exit' and saves time",
    ],
  },

  "Tries": {
    color: "#533AB7",
    bg: "#EEEDFE",
    icon: "T",
    tagline: "Prefix trees — lightning-fast prefix searches that hash maps can't match.",
    overview: `A trie (prefix tree) is a tree where each path from root to a node represents a prefix. It enables O(m) insert, search, and prefix-search where m is the word length — regardless of how many words are stored.

A hash set can tell you if a word exists in O(1). A trie can also tell you if any word starts with a given prefix in O(m). That's the key advantage.`,
    whenToUse: [
      "Multiple string searches with common prefixes",
      "Auto-complete / spell-check systems",
      "IP routing tables",
      "Multi-word board searches (Word Search II)",
      "Wildcard pattern matching",
    ],
    keyPatterns: [
      {
        name: "Basic Trie Node",
        desc: "Each node has a children map (or 26-length array) and an isEnd flag.",
        code: `class TrieNode {
  constructor() {
    this.children = {}; // char → TrieNode
    this.isEnd = false;
  }
}

// Insert a word:
function insert(word) {
  let node = this.root;
  for (const c of word) {
    if (!node.children[c]) node.children[c] = new TrieNode();
    node = node.children[c];
  }
  node.isEnd = true;
}`,
      },
      {
        name: "Search with Wildcard (DFS)",
        desc: "When '.' wildcard is encountered, recurse into all children nodes.",
        code: `function search(word, node = this.root, i = 0) {
  if (i === word.length) return node.isEnd;
  const c = word[i];
  
  if (c === '.') {
    // Try every child
    for (const child of Object.values(node.children)) {
      if (this.search(word, child, i + 1)) return true;
    }
    return false;
  }
  
  if (!node.children[c]) return false;
  return this.search(word, node.children[c], i + 1);
}`,
      },
      {
        name: "Trie + DFS on Board (Word Search II)",
        desc: "Build trie from all words. DFS from each cell, traverse trie simultaneously.",
        code: `function dfs(r, c, node, board) {
  const ch = board[r][c];
  if (ch === '#' || !node[ch]) return;
  
  node = node[ch];
  if (node.word) { results.push(node.word); node.word = null; }
  
  board[r][c] = '#'; // mark visited
  // recurse 4 directions
  board[r][c] = ch;  // restore (backtrack)
}`,
      },
    ],
    complexity: "Time: O(m) per word op, m = word length · Space: O(n·m) total",
    tips: [
      "For 26 lowercase letters, use an array of size 26 instead of a map for better cache performance",
      "Set node.word = null after finding it to avoid duplicates in Word Search II",
      "Trie is better than a set when you need prefix queries; set is better for pure existence checks",
      "You can store the full word at the end node (node.word = word) instead of tracing path back",
    ],
  },

  "Heap / Priority Queue": {
    color: "#BA7517",
    bg: "#FAEEDA",
    icon: "△",
    tagline: "Always access the min or max efficiently — O(log n) insert, O(1) peek.",
    overview: `A heap is a binary tree that maintains heap property: min-heap means parent ≤ children (root is minimum). Max-heap means parent ≥ children.

Key operations: insert O(log n), peek min/max O(1), remove min/max O(log n).

JavaScript doesn't have a built-in heap, but many problems can be solved by thinking about the heap concept and using sorting as a proxy. For interviews, understanding the heap pattern is what matters.`,
    whenToUse: [
      "You always need the current minimum or maximum",
      "Top-K elements (k largest, k smallest)",
      "Merge K sorted lists/arrays",
      "Running median from a data stream",
      "Scheduling with priority",
    ],
    keyPatterns: [
      {
        name: "K Largest Elements (Min-Heap of size K)",
        desc: "Keep a min-heap of K elements. When size > K, remove minimum. At the end, heap contains K largest.",
        code: `// Conceptual (JS has no built-in heap):
// Use array sorted ascending as min-heap simulation
const heap = [];

for (const n of nums) {
  heap.push(n);
  heap.sort((a, b) => a - b); // maintain sorted order
  if (heap.length > k) heap.shift(); // remove min
}

return heap[0]; // kth largest = min of heap`,
      },
      {
        name: "Two Heaps (Running Median)",
        desc: "Max-heap for lower half, min-heap for upper half. Balance sizes. Median = top(s) or average.",
        code: `// lo = max-heap (lower half)
// hi = min-heap (upper half)

function addNum(num) {
  lo.push(num);
  // Balance: ensure max(lo) <= min(hi)
  if (hi.length && lo.top() > hi.top()) {
    hi.push(lo.pop());
  }
  // Balance sizes
  if (lo.size() > hi.size() + 1) hi.push(lo.pop());
  else if (hi.size() > lo.size()) lo.push(hi.pop());
}

function findMedian() {
  if (lo.size() > hi.size()) return lo.top();
  return (lo.top() + hi.top()) / 2;
}`,
      },
      {
        name: "Merge K Sorted Lists (Divide & Conquer)",
        desc: "Recursively split K lists into pairs, merge pairs. Equivalent to a tree of merges.",
        code: `function mergeKLists(lists) {
  if (lists.length <= 1) return lists[0] || null;
  const mid = lists.length >> 1;
  const left = mergeKLists(lists.slice(0, mid));
  const right = mergeKLists(lists.slice(mid));
  return mergeTwoLists(left, right);
}`,
      },
    ],
    complexity: "Time: O(log n) push/pop · Space: O(n)",
    tips: [
      "In JS interviews, you can use .sort() and treat a sorted array as a heap for small inputs",
      "For K closest / K largest: min-heap of size K (remove min when K exceeded)",
      "Two heaps pattern: lo can have at most 1 more element than hi",
      "Think of a heap as a 'partially sorted' structure — you only need the min or max, not full sort",
    ],
  },

  "Graphs": {
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: "◎",
    tagline: "Nodes and edges — the most versatile data structure for modeling real-world problems.",
    overview: `Graphs are everywhere: social networks, maps, dependency trees, state machines. The two fundamental traversals are BFS (level by level, shortest path in unweighted graphs) and DFS (explore deep before backtracking, cycle detection, topological sort).

Key representations:
• Adjacency list (most common): Map/array where adj[node] = [neighbors]
• Adjacency matrix: matrix[i][j] = 1 if edge exists
• Implicit graph: grid cells are nodes, adjacent cells are edges`,
    whenToUse: [
      "Shortest path (BFS for unweighted)",
      "Connected components (DFS/Union-Find)",
      "Cycle detection (DFS with states)",
      "Topological sort (Kahn's or DFS)",
      "Grid traversal (flood fill, island counting)",
    ],
    keyPatterns: [
      {
        name: "DFS on Grid",
        desc: "Each cell is a node. Neighbors are adjacent cells. Mark visited by modifying grid.",
        code: `function dfs(r, c) {
  if (r < 0 || c < 0 || r >= m || c >= n) return; // out of bounds
  if (grid[r][c] !== '1') return;                  // not land or visited
  
  grid[r][c] = '0'; // mark visited (in-place)
  dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
}`,
      },
      {
        name: "BFS Shortest Path",
        desc: "Queue-based. Each level = one more step. First time reaching a node = shortest path.",
        code: `const queue = [start];
const visited = new Set([start]);
let steps = 0;

while (queue.length) {
  const size = queue.length;
  for (let i = 0; i < size; i++) {
    const node = queue.shift();
    if (node === end) return steps;
    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  steps++;
}`,
      },
      {
        name: "DFS Cycle Detection (3 States)",
        desc: "0=unvisited, 1=visiting (in current path), 2=done. Cycle = reach a node with state 1.",
        code: `const state = new Array(n).fill(0);

function dfs(node) {
  if (state[node] === 1) return false; // cycle!
  if (state[node] === 2) return true;  // already processed
  
  state[node] = 1; // mark visiting
  for (const nei of adj[node]) {
    if (!dfs(nei)) return false;
  }
  state[node] = 2; // mark done
  return true;
}`,
      },
      {
        name: "Union-Find (Connected Components)",
        desc: "Each node points to its root/parent. Union: merge two trees. Find: get root (with path compression).",
        code: `const parent = Array.from({length: n}, (_, i) => i);

function find(x) {
  if (parent[x] !== x) parent[x] = find(parent[x]); // path compression
  return parent[x];
}

function union(x, y) {
  const px = find(x), py = find(y);
  if (px === py) return false; // already connected
  parent[px] = py;
  return true;
}`,
      },
      {
        name: "Topological Sort (Kahn's BFS)",
        desc: "Process nodes with in-degree 0 first. Decrement in-degree of neighbors as you process.",
        code: `// Kahn's Algorithm
const inDeg = new Array(n).fill(0);
const adj = Array.from({length:n}, () => []);
for (const [a, b] of edges) { adj[b].push(a); inDeg[a]++; }

const queue = [];
for (let i = 0; i < n; i++) if (inDeg[i] === 0) queue.push(i);

const order = [];
while (queue.length) {
  const node = queue.shift();
  order.push(node);
  for (const nei of adj[node]) {
    if (--inDeg[nei] === 0) queue.push(nei);
  }
}`,
      },
    ],
    complexity: "DFS/BFS: O(V+E) · Union-Find: O(α(n)) ≈ O(1) per op",
    tips: [
      "For grid problems, treat the grid as an adjacency list — no need to build explicit graph",
      "Multi-source BFS: add all sources to the queue at once before starting",
      "Union-Find is ideal for 'number of connected components' and 'redundant connection'",
      "Topological sort only works on DAGs (directed acyclic graphs) — cycle = no valid order",
    ],
  },

  "Dynamic Programming": {
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: "◈",
    tagline: "Break big problems into overlapping subproblems — memoize or tabulate to avoid recomputation.",
    overview: `Dynamic programming = recursion + memoization. Or equivalently, bottom-up tabulation.

The key insight: the problem has overlapping subproblems (same sub-problem computed multiple times) and optimal substructure (optimal solution built from optimal sub-solutions).

Two approaches:
• Top-down (memoization): Write natural recursion, cache results
• Bottom-up (tabulation): Fill a table from base case upward (often more efficient)`,
    whenToUse: [
      "Optimization: min/max of some quantity",
      "Counting: how many ways to do X",
      "Feasibility: is it possible to do X",
      "Problem can be broken into smaller overlapping versions of itself",
    ],
    keyPatterns: [
      {
        name: "1D DP (Linear Sequences)",
        desc: "dp[i] depends on dp[i-1] and/or dp[i-2]. Often can reduce to 2 variables.",
        code: `// Fibonacci pattern
let prev = 0, curr = 1;
for (let i = 2; i <= n; i++) {
  [prev, curr] = [curr, prev + curr];
}

// House Robber pattern
let a = 0, b = 0;
for (const n of nums) {
  [a, b] = [b, Math.max(b, a + n)];
}`,
      },
      {
        name: "2D DP (Grid / Interval)",
        desc: "dp[i][j] represents answer for some subproblem involving indices i and j.",
        code: `// Unique paths
const dp = Array.from({length: m}, () => new Array(n).fill(1));
for (let i = 1; i < m; i++)
  for (let j = 1; j < n; j++)
    dp[i][j] = dp[i-1][j] + dp[i][j-1];
return dp[m-1][n-1];`,
      },
      {
        name: "0/1 Knapsack",
        desc: "Each item either taken or not. Process items, for each iterate capacity backwards to prevent reuse.",
        code: `const dp = new Array(target + 1).fill(false);
dp[0] = true;

for (const item of items) {
  // Backwards to avoid using item twice!
  for (let j = target; j >= item; j--) {
    dp[j] = dp[j] || dp[j - item];
  }
}`,
      },
      {
        name: "Unbounded Knapsack (Coin Change)",
        desc: "Items can be used unlimited times. Iterate capacity forwards.",
        code: `const dp = new Array(amount + 1).fill(Infinity);
dp[0] = 0;

for (let i = 1; i <= amount; i++) {
  for (const coin of coins) {
    if (i >= coin && dp[i - coin] !== Infinity)
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  }
}`,
      },
      {
        name: "LIS Pattern (Subsequences)",
        desc: "Find optimal subsequence. dp[i] = answer for subproblem ending at index i.",
        code: `// O(n²) LIS
const dp = new Array(n).fill(1);
for (let i = 1; i < n; i++)
  for (let j = 0; j < i; j++)
    if (nums[j] < nums[i])
      dp[i] = Math.max(dp[i], dp[j] + 1);
return Math.max(...dp);`,
      },
    ],
    complexity: "Varies: O(n) to O(n²) or O(n·W) for knapsack",
    tips: [
      "Start with a recursive solution, then memoize (top-down), then convert to bottom-up",
      "The DP state must fully describe the remaining problem — no hidden state",
      "0/1 knapsack: backwards iteration prevents reuse. Unbounded: forwards allows reuse.",
      "Space optimization: if dp[i] only depends on dp[i-1], you only need 2 variables",
    ],
  },

  "Greedy": {
    color: "#639922",
    bg: "#EAF3DE",
    icon: "→",
    tagline: "Make the locally optimal choice at each step — and trust it leads to a global optimum.",
    overview: `Greedy algorithms make the best choice at each step without reconsidering. They work when the problem has a "greedy choice property" — a locally optimal choice leads to a globally optimal solution.

Unlike DP, greedy doesn't explore all possibilities. It commits to a choice. The hard part is proving your greedy strategy is correct — an exchange argument is often used: assume a non-greedy solution is optimal, show you can swap to greedy choice without making it worse.`,
    whenToUse: [
      "Interval scheduling / activity selection",
      "Sorting-based optimization problems",
      "Problems where the 'best available' choice is clearly defined",
      "Jump game, gas station, task scheduler",
    ],
    keyPatterns: [
      {
        name: "Kadane's (Maximum Subarray)",
        desc: "At each step: extend current subarray or start fresh. Whichever is larger.",
        code: `let curr = nums[0], best = nums[0];

for (let i = 1; i < nums.length; i++) {
  curr = Math.max(nums[i], curr + nums[i]); // extend or restart
  best = Math.max(best, curr);
}`,
      },
      {
        name: "Interval Scheduling (Sort by End Time)",
        desc: "Sort by end time. Greedily keep the interval that ends earliest. Classic activity selection.",
        code: `intervals.sort((a, b) => a[1] - b[1]); // sort by end
let count = 0, prevEnd = -Infinity;

for (const [start, end] of intervals) {
  if (start >= prevEnd) {
    count++;     // can attend this meeting
    prevEnd = end;
  }
}`,
      },
      {
        name: "Jump Game (Track Reach)",
        desc: "Track the maximum index reachable from all positions seen so far.",
        code: `let maxReach = 0;

for (let i = 0; i < nums.length; i++) {
  if (i > maxReach) return false; // can't reach i
  maxReach = Math.max(maxReach, i + nums[i]);
}

return true;`,
      },
    ],
    complexity: "Usually O(n log n) due to sorting, or O(n) if sorting not needed",
    tips: [
      "Greedy correctness is non-trivial — think about why locally optimal = globally optimal",
      "Often you need to sort first (by start, end, size, etc.) to make greedy work",
      "If greedy doesn't work, try DP — it explores all possibilities",
      "Interval problems almost always require sorting; usually by end time for scheduling",
    ],
  },

  "Backtracking": {
    color: "#993556",
    bg: "#FBEAF0",
    icon: "↩",
    tagline: "Explore all possibilities by building incrementally and undoing choices that fail.",
    overview: `Backtracking is a refined brute force. You build solutions incrementally — making a choice, exploring all consequences, then undoing the choice (backtracking) and trying the next option.

The key is the "undo" step — after each recursive call returns, you remove the last element added. This restores state, allowing the next iteration to make a different choice.

Think of it as a depth-first search over a decision tree.`,
    whenToUse: [
      "Generate all valid combinations, permutations, or subsets",
      "Constraint satisfaction (N-Queens, Sudoku)",
      "Path finding on a grid with constraints",
      "When you need all solutions, not just one",
    ],
    keyPatterns: [
      {
        name: "Basic Backtracking Template",
        desc: "Choose → Explore → Unchoose. The 'unchoose' (backtrack) is the defining step.",
        code: `function backtrack(start, currentPath) {
  // Base case: valid solution found
  if (isSolution(currentPath)) {
    result.push([...currentPath]); // snapshot
    return;
  }
  
  for (let i = start; i < choices.length; i++) {
    if (!isValid(choices[i])) continue;
    
    currentPath.push(choices[i]);  // choose
    backtrack(i + 1, currentPath); // explore
    currentPath.pop();             // unchoose (backtrack!)
  }
}`,
      },
      {
        name: "Deduplication",
        desc: "Sort first. Skip same value at same recursion level (i > start && same as previous).",
        code: `candidates.sort((a, b) => a - b);

for (let i = start; i < candidates.length; i++) {
  // Skip duplicate at same recursion level
  if (i > start && candidates[i] === candidates[i - 1]) continue;
  
  path.push(candidates[i]);
  backtrack(i + 1, path, remaining - candidates[i]);
  path.pop();
}`,
      },
      {
        name: "Constraint Tracking (N-Queens)",
        desc: "Use sets to track used columns and diagonals. O(1) conflict check instead of scanning.",
        code: `const cols = new Set();
const diag1 = new Set(); // row - col (top-left to bottom-right)
const diag2 = new Set(); // row + col (top-right to bottom-left)

function bt(row) {
  for (let col = 0; col < n; col++) {
    if (cols.has(col) || diag1.has(row-col) || diag2.has(row+col)) continue;
    
    cols.add(col); diag1.add(row-col); diag2.add(row+col);
    bt(row + 1);
    cols.delete(col); diag1.delete(row-col); diag2.delete(row+col);
  }
}`,
      },
    ],
    complexity: "Exponential: O(2ⁿ) subsets, O(n!) permutations",
    tips: [
      "Always spread the array when adding to result: res.push([...curr]) not res.push(curr)",
      "The 'start' parameter in the loop prevents revisiting earlier elements (for combinations)",
      "For permutations: use a 'used' boolean array instead of 'start' index",
      "Deduplication requires sorting first; skip condition is i > start (not i > 0)",
    ],
  },

  "Intervals": {
    color: "#5F5E5A",
    bg: "#F1EFE8",
    icon: "═",
    tagline: "Ranges that may overlap — sorting by start or end unlocks elegant O(n log n) solutions.",
    overview: `Interval problems involve ranges [start, end]. The fundamental operation is detecting overlap. Two intervals [a,b] and [c,d] overlap when a ≤ d AND c ≤ b.

Most interval problems require sorting by start or end time first. After sorting, you can process them left-to-right with a greedy approach or a simple linear scan.`,
    whenToUse: [
      "Merging overlapping intervals",
      "Inserting a new interval",
      "Scheduling meetings / conference rooms",
      "Finding gaps or coverage",
    ],
    keyPatterns: [
      {
        name: "Overlap Check",
        desc: "Two intervals overlap iff they share any common point.",
        code: `function overlaps(a, b) {
  // [a[0], a[1]] and [b[0], b[1]]
  return a[0] <= b[1] && b[0] <= a[1];
}

// After sorting by start:
// Overlap with last merged: newStart <= lastEnd`,
      },
      {
        name: "Merge Intervals",
        desc: "Sort by start. Extend last merged interval if overlap, else push new.",
        code: `intervals.sort((a, b) => a[0] - b[0]);
const res = [intervals[0]];

for (let i = 1; i < intervals.length; i++) {
  const last = res[res.length - 1];
  if (intervals[i][0] <= last[1]) {
    last[1] = Math.max(last[1], intervals[i][1]); // extend
  } else {
    res.push(intervals[i]); // no overlap, new interval
  }
}`,
      },
      {
        name: "Min Rooms (Two Sorted Arrays)",
        desc: "Separate start and end times. Two pointers: increment rooms on start event, decrement on end event.",
        code: `const starts = intervals.map(i => i[0]).sort((a,b) => a-b);
const ends   = intervals.map(i => i[1]).sort((a,b) => a-b);

let rooms = 0, maxRooms = 0, j = 0;

for (let i = 0; i < starts.length; i++) {
  if (starts[i] < ends[j]) {
    rooms++;   // new meeting started
    maxRooms = Math.max(maxRooms, rooms);
  } else {
    rooms--;   // a meeting ended
    j++;
  }
}
return maxRooms;`,
      },
    ],
    complexity: "Time: O(n log n) due to sorting · Space: O(n)",
    tips: [
      "Sort by start time for merge/insert. Sort by end time for scheduling/removal.",
      "Overlap condition: newStart ≤ prevEnd (after sorting by start)",
      "Meeting Rooms II: think of it as tracking concurrent events",
      "The 'two sorted arrays' trick for meeting rooms avoids needing an actual heap",
    ],
  },

  "Math & Bit Manipulation": {
    color: "#A32D2D",
    bg: "#FCEBEB",
    icon: "&",
    tagline: "Leverage binary representation and number theory for O(1) space tricks.",
    overview: `Bit manipulation operates directly on binary representations. Common operations:
• AND (&) — both bits must be 1
• OR (|) — either bit is 1  
• XOR (^) — exactly one bit is 1 (a ^ a = 0, a ^ 0 = a)
• Left shift (<<) — multiply by 2
• Right shift (>>) — divide by 2
• n & (n-1) — remove lowest set bit
• n & (-n) — isolate lowest set bit`,
    whenToUse: [
      "Finding duplicates or missing numbers with O(1) space",
      "Computing parity or Hamming weight",
      "Operations without arithmetic operators",
      "Checking powers of 2",
    ],
    keyPatterns: [
      {
        name: "XOR Tricks",
        desc: "a ^ a = 0 (same values cancel). a ^ 0 = a. XOR all elements — pairs cancel, single remains.",
        code: `// Find single non-duplicate
let result = 0;
for (const n of nums) result ^= n;
return result; // all duplicates cancelled out

// Check if two values are different sign
function oppositeSigns(a, b) { return (a ^ b) < 0; }`,
      },
      {
        name: "Brian Kernighan's Bit Count",
        desc: "n & (n-1) removes the lowest set bit. Count iterations until n = 0.",
        code: `function countOnes(n) {
  let count = 0;
  while (n !== 0) {
    n &= (n - 1); // remove lowest set bit
    count++;
  }
  return count;
}`,
      },
      {
        name: "Power of Two Check",
        desc: "Powers of two have exactly one '1' bit. n & (n-1) removes it → 0.",
        code: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

// Generalize: count bits = 1
function hasOneBit(n) { return n > 0 && (n & (n-1)) === 0; }`,
      },
      {
        name: "Addition Without +",
        desc: "XOR = sum without carry. AND left-shifted = carry. Repeat until no carry.",
        code: `function add(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;   // partial sum
    b = carry;   // process carry
  }
  return a;
}`,
      },
    ],
    complexity: "Usually O(1) for fixed-width integers (32/64 bit)",
    tips: [
      "XOR is the most useful bit operator — memorize: a^a=0, a^0=a",
      "n & (n-1) removes lowest set bit — useful for counting 1s",
      "Use >>> (unsigned right shift) in JS to handle negative numbers as unsigned",
      "Gauss sum formula: sum(1..n) = n*(n+1)/2 — useful for missing number",
    ],
  },
};

#!/usr/bin/env node
// build.js — Combines all data + React app into a single HTML file

const fs = require('fs');
const path = require('path');

// Read data files
const problemsRaw = fs.readFileSync(path.join(__dirname, 'src', 'problems.js'), 'utf8');
const guidesRaw = fs.readFileSync(path.join(__dirname, 'src', 'guides.js'), 'utf8');
const extraRaw = fs.readFileSync(path.join(__dirname, 'src', 'additional_problems.js'), 'utf8');

// Extract PROBLEMS array from problems.js (remove export)
const problemsCode = problemsRaw
  .replace(/^export\s+const\s+CATEGORIES\s*=[\s\S]*?;\s*/m, '')
  .replace(/^export\s+const\s+/m, 'const ');

// Extract GUIDES from guides.js
const guidesCode = guidesRaw.replace(/^export\s+const\s+/m, 'const ');

// Extract EXTRA_PROBLEMS from additional
const extraCode = extraRaw.replace(/^export\s+const\s+/m, 'const ');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>DSA Mastery — Complete Study Guide & Problem Tracker</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"><\/script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"><\/script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.9/babel.min.js"><\/script>
<style>
:root {
  --bg:#0a0d12;--bg2:#111620;--bg3:#171d2a;--bg4:#1d2535;
  --border:#1e2738;--border2:#2a3548;
  --text:#e4e9f2;--text2:#8899b0;--text3:#556378;
  --accent:#4f8ff7;--accent2:#3b7ae8;
  --green:#22c55e;--green-bg:rgba(34,197,94,.08);--green-b:rgba(34,197,94,.25);
  --yellow:#eab308;--yellow-bg:rgba(234,179,8,.08);--yellow-b:rgba(234,179,8,.25);
  --red:#ef4444;--red-bg:rgba(239,68,68,.08);--red-b:rgba(239,68,68,.25);
  --purple:#a855f7;--orange:#f97316;--teal:#14b8a6;--pink:#ec4899;
  --font:'DM Sans',system-ui,sans-serif;
  --font-display:'Outfit',system-ui,sans-serif;
  --mono:'JetBrains Mono',monospace;
  --radius:8px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{font-size:14px;scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--text);min-height:100vh;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}
::selection{background:var(--accent);color:#fff}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(79,143,247,.15)}50%{box-shadow:0 0 40px rgba(79,143,247,.25)}}
</style>
</head>
<body>
<div id="root"></div>

<script>
// ═══════ DATA ═══════
${problemsCode}

${guidesCode}

${extraCode}

// Merge problems
const ALL_PROBLEMS = [...PROBLEMS, ...EXTRA_PROBLEMS];

// All categories  
const ALL_CATEGORIES = [...new Set(ALL_PROBLEMS.map(p => p.cat))];

// Add guides for new categories
GUIDES["String"] = {
  color:"#EC4899",bg:"#FDE8F0",icon:"✎",
  tagline:"Mastering string manipulation — from simple parsing to advanced pattern matching.",
  overview:"String problems are everywhere in interviews. They test your ability to work with characters, substrings, and patterns efficiently. Many string problems reduce to arrays, sliding windows, or hash maps — the key is recognizing the pattern.\\n\\nCommon themes: palindromes, anagrams, parsing, encoding/decoding, and substring searches.",
  whenToUse:["Problem involves character manipulation","Checking palindromes or anagram properties","Pattern matching or substring search","Parsing or encoding strings"],
  keyPatterns:[
    {name:"Expand Around Center (Palindrome)",desc:"For each possible center (n odd + n-1 even = 2n-1 centers), expand outward while characters match.",code:"function expand(s, l, r) {\\n  while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\\n  return s.slice(l+1, r); // palindrome substring\\n}"},
    {name:"Two Pointers for Palindrome Check",desc:"Compare characters from both ends moving inward.",code:"function isPalin(s, l, r) {\\n  while (l < r) {\\n    if (s[l] !== s[r]) return false;\\n    l++; r--;\\n  }\\n  return true;\\n}"},
    {name:"Run-Length Encoding",desc:"Count consecutive characters and encode as count+char.",code:"let result = '', i = 0;\\nwhile (i < s.length) {\\n  let count = 1;\\n  while (i+count < s.length && s[i+count] === s[i]) count++;\\n  result += count + s[i];\\n  i += count;\\n}"}
  ],
  complexity:"Varies — O(n) to O(n²) depending on technique",
  tips:["For palindrome problems, 'expand around center' is usually cleaner than DP","Use charCodeAt for O(1) character comparisons","StringBuilder pattern: push to array, join at end (faster than string concatenation)","Many string problems are really array/hash problems in disguise"]
};
GUIDES["Design"] = {
  color:"#F97316",bg:"#FEF0E6",icon:"⚙",
  tagline:"System design at the data structure level — combining primitives for O(1) everything.",
  overview:"Design problems test your ability to combine data structures to achieve specific time/space complexities. The key insight: combine a hash map (for O(1) lookup) with a linked list or array (for O(1) ordered operations).\\n\\nCommon patterns: LRU/LFU cache, randomized set, stack with getMin, queue from stacks.",
  whenToUse:["Problem asks to 'design a data structure'","Need O(1) for multiple operations simultaneously","Combining lookup speed with ordering/frequency"],
  keyPatterns:[
    {name:"HashMap + Doubly Linked List (LRU)",desc:"Map gives O(1) access. DLL gives O(1) insert/remove at ends. Together: O(1) LRU cache.",code:"// Map: key → DLL node\\n// DLL: head (LRU) ↔ ... ↔ tail (MRU)\\n// get(key): move to tail\\n// put(key): if full, evict head"},
    {name:"Array + HashMap (Randomized)",desc:"Array for O(1) random access. Map for O(1) lookup. On delete, swap with last.",code:"// insert: arr.push(val), map[val] = arr.length-1\\n// delete: swap arr[map[val]] with arr.last, update map, pop\\n// getRandom: arr[random index]"},
    {name:"Two Stacks → Queue",desc:"inStack for pushes. Pour to outStack (reversed) for pops. Amortized O(1).",code:"push(x) → inStack.push(x)\\npop() → if outStack empty: pour all from inStack\\n         return outStack.pop()"}
  ],
  complexity:"Usually O(1) per operation · Space: O(n)",
  tips:["Draw the data structure before coding","LRU: doubly linked list + hash map is the classic combo","For 'O(1) getRandom': you need an array (can't randomly access a linked list)","Two stacks make a queue; two queues make a stack"]
};
GUIDES["Sorting & Searching"] = {
  color:"#06B6D4",bg:"#E6F8FC",icon:"⇅",
  tagline:"Fundamental algorithms — understanding their properties unlocks efficient solutions.",
  overview:"Sorting is a building block for many algorithms. Knowing WHEN to use which sort is as important as knowing HOW.\\n\\n• Merge Sort: O(n log n), stable, great for linked lists\\n• Quick Sort: O(n log n) avg, in-place, fastest in practice\\n• Counting/Bucket Sort: O(n+k) when range is known\\n• Quickselect: O(n) for kth element without full sort",
  whenToUse:["Problem requires ordering elements","You need to preprocess data for efficient searching","Finding kth largest/smallest","Custom comparison needed"],
  keyPatterns:[
    {name:"Merge Sort",desc:"Divide in half. Sort each half. Merge sorted halves. Stable, O(n log n).",code:"function mergeSort(arr) {\\n  if (arr.length <= 1) return arr;\\n  const mid = arr.length >> 1;\\n  return merge(mergeSort(arr.slice(0,mid)), mergeSort(arr.slice(mid)));\\n}"},
    {name:"Quickselect (Kth Element)",desc:"Partition around pivot. Recurse only on the side containing target index. O(n) average.",code:"function quickSelect(arr, k) {\\n  const pivot = arr[arr.length-1], i = partition(arr, pivot);\\n  if (i === k) return arr[i];\\n  return i < k ? quickSelect(right, k-i-1) : quickSelect(left, k);\\n}"},
    {name:"Three-Way Merge from End",desc:"For merging into an existing array, fill from the back to avoid overwriting.",code:"let i=m-1, j=n-1, k=m+n-1;\\nwhile (j >= 0)\\n  nums1[k--] = (i>=0 && nums1[i]>nums2[j]) ? nums1[i--] : nums2[j--];"}
  ],
  complexity:"Comparison sorts: Ω(n log n) lower bound · Non-comparison: O(n+k)",
  tips:["Merge sort is preferred for linked lists (no random access needed)","Quick sort is faster in practice due to cache locality","For 'sort by custom key': define the comparator, not the sort","Counting sort only works when values are in a small known range"]
};
GUIDES["Matrix"] = {
  color:"#8B5CF6",bg:"#F0ECFE",icon:"▦",
  tagline:"2D grids — navigate, transform, and search with patterns from graphs and DP.",
  overview:"Matrix problems combine array skills with 2D navigation. Most matrix problems use one of these approaches:\\n\\n• DFS/BFS for connectivity and pathfinding (treat as a graph)\\n• Two pointers or binary search for sorted matrices\\n• Simulation for in-place transforms (rotate, spiral)\\n• DP for path counting and optimization",
  whenToUse:["Problem involves a 2D grid","Pathfinding or connectivity in a grid","In-place matrix transformations","Searching in sorted 2D arrays"],
  keyPatterns:[
    {name:"DFS on Grid",desc:"Treat each cell as a node. Visit 4 neighbors. Mark visited to avoid cycles.",code:"function dfs(grid, r, c) {\\n  if (r<0||c<0||r>=m||c>=n||visited) return;\\n  // process cell\\n  dfs(grid,r+1,c); dfs(grid,r-1,c);\\n  dfs(grid,r,c+1); dfs(grid,r,c-1);\\n}"},
    {name:"Spiral Traversal",desc:"Track 4 boundaries. Traverse right→down→left→up, shrinking bounds after each.",code:"let top=0, bot=m-1, left=0, right=n-1;\\nwhile (top<=bot && left<=right) {\\n  for (c=left;c<=right;c++) res.push(matrix[top][c]); top++;\\n  // ... down, left, up\\n}"},
    {name:"Rotate 90° = Transpose + Reverse Rows",desc:"Two-step in-place rotation. Transpose swaps [i][j]↔[j][i]. Then reverse each row.",code:"// Transpose\\nfor (i=0;i<n;i++) for (j=i+1;j<n;j++)\\n  [m[i][j],m[j][i]] = [m[j][i],m[i][j]];\\n// Reverse rows\\nfor (row of m) row.reverse();"}
  ],
  complexity:"Usually O(m·n) · Space: O(1) for transforms, O(m·n) for DFS",
  tips:["Direction array: const dirs = [[0,1],[0,-1],[1,0],[-1,0]] keeps code clean","For in-place updates: encode multiple states in a single cell (use %2, /2 trick)","Sorted matrix search: start from top-right corner for O(m+n)","Boundary checking: r>=0 && c>=0 && r<m && c<n"]
};
<\/script>

<script type="text/babel">
${fs.readFileSync(path.join(__dirname, 'src', 'app.jsx'), 'utf8')}
<\/script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'dsa_mastery.html'), html);
console.log('Built dsa_mastery.html successfully!');
console.log('Total problems:', 116 + 78, '= 194');

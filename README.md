# DSA Mastery — Complete Study Guide & Problem Tracker

A self-contained, single-file React application for mastering Data Structures & Algorithms. Built for JavaScript developers preparing for technical interviews.

**194 problems · 19 categories · Interactive learning guides · Persistent progress tracking**

---
<img width="1912" height="943" alt="image" src="https://github.com/user-attachments/assets/259c717f-7ded-4b49-8722-568bce638c3e" />


## Features

### Problem Tracker

- **194 curated problems** from LeetCode, GeeksForGeeks, and HackerRank covering every major DSA pattern
- Full **JavaScript solutions** with detailed hints, approach explanations, and complexity analysis
- **Checkbox progress tracking** that persists across browser sessions via localStorage
- **Personal notes** for each problem — jot down edge cases, alternative approaches, or reminders
- **Search and filter** by title, pattern, tags, difficulty (Easy/Medium/Hard), and solve status

### Interactive Learning Guides

Every category includes a comprehensive guide with:

- **Overview** — what the technique is and why it matters
- **When to Use** — pattern recognition signals for interviews
- **Key Patterns** — expandable sections with reusable code templates
- **Complexity Analysis** — time and space for the core technique
- **Pro Tips** — interview-specific advice and common pitfalls

### Progress Management

- **Stats dashboard** — track total, Easy/Medium/Hard progress at a glance
- **Export/Import** — save progress as JSON, transfer across devices or back up
- **Category-level tracking** — see solved/total per category in the tab bar

---

## Categories Covered

| Category | Problems | Key Patterns |
|----------|----------|-------------|
| Arrays & Hashing | 21 | Hash Map, Frequency Count, Prefix Sum, Bucket Sort, Boyer-Moore, Cyclic Sort |
| Two Pointers | 12 | Inward, Same Direction, Dutch National Flag, Greedy Pair |
| Sliding Window | 12 | Fixed Window, Variable Window, At Most K Distinct, Monotonic Deque |
| Stack | 12 | Bracket Matching, Monotonic Stack, Stack Simulation, Decode/Encode |
| Binary Search | 11 | Exact Match, Lower Bound, Answer Space, Rotated Array |
| Linked List | 12 | Reversal, Fast/Slow, Dummy Node, Merge, K-Group |
| Trees | 21 | DFS (Pre/In/Post), BFS, BST, LCA, Path Sum, Serialization |
| Tries | 3 | Insert/Search, Wildcard, Backtracking DFS |
| Heap / Priority Queue | 8 | Min/Max Heap, Two Heaps, Quickselect, Frequency Sort |
| Graphs | 16 | DFS, BFS, Topological Sort, Union-Find, Dijkstra, Bellman-Ford |
| Dynamic Programming | 20 | 1D DP, 2D DP, Knapsack, LCS, LIS, Interval DP, Memoization |
| Greedy | 7 | Kadane's, Interval Scheduling, Partition, Voting |
| Backtracking | 11 | Subsets, Permutations, Combinations, Constraint (N-Queens, Sudoku) |
| Intervals | 7 | Merge, Insert, Scheduling, Intersection, Arrows |
| Math & Bit Manipulation | 13 | XOR, Bit Counting, Sieve, Matrix Transforms, Spiral |
| String | 7 | Palindrome, Parsing, RLE, Zigzag, Parentheses Validation |
| Design | 4 | LRU, LFU, Randomized Set, Queue from Stacks |
| Sorting & Searching | 5 | Merge Sort, Quick Sort, Counting Sort, Three-Way Merge |
| Matrix | 3 | DFS on Grid, Game of Life, Sudoku Validation |

---

## Getting Started

### Option 1 — Just open it

The app is a single HTML file with no build step required.

```bash
# Simply open in your browser
open dsa_mastery.html

# Or on Linux
xdg-open dsa_mastery.html

# Or on Windows
start dsa_mastery.html
```

### Option 2 — Serve locally (recommended for best experience)

```bash
# Using Python
python3 -m http.server 8080
# Then visit http://localhost:8080/dsa_mastery.html

# Using Node.js
npx serve .
# Then visit the URL shown in terminal
```

### Option 3 — Run with Live Server (VS Code)

1. Open the folder in VS Code
2. Install the "Live Server" extension
3. Right-click `dsa_mastery.html` → "Open with Live Server"

---

## How to Use

### Daily Study Flow

1. **Pick a category** from the tabs (start with Arrays & Hashing if you're new)
2. **Read the Learning Guide** first — understand the patterns before solving
3. **Work through problems** in order (Easy → Medium → Hard)
4. For each problem:
   - Read the description
   - Try solving it yourself for 15–20 minutes
   - If stuck, read the **Hint** (reveals the approach without the full solution)
   - Study the **Solution** and understand each line
   - Add your own **Notes** (edge cases, mistakes, alternative approaches)
   - Mark as **Solved** when you can write the solution from memory

### Recommended Study Plan

| Week | Focus Areas |
|------|------------|
| 1–2 | Arrays & Hashing, Two Pointers, Sliding Window |
| 3–4 | Stack, Binary Search, Linked List |
| 5–6 | Trees, Graphs |
| 7–8 | Dynamic Programming, Backtracking |
| 9–10 | Heap, Tries, Intervals, Greedy |
| 11–12 | Design, String, Matrix, Sorting — Review all Hard problems |

### Progress Backup

Click **Export Progress** to download a JSON file with all your solved status and notes. Use **Import Progress** to restore on any device.

---

## Tech Stack

- **React 18** (via CDN, no build step)
- **Babel Standalone** (in-browser JSX transpilation)
- **localStorage** for persistent progress
- **DM Sans + Outfit + JetBrains Mono** typography
- Zero dependencies, zero build tools, zero server required

---

## Project Structure

```
dsa-mastery/
├── dsa_mastery.html          # Complete standalone app (open this!)
├── README.md                 # This file
├── problems.js               # Original 116 problems dataset
├── additional_problems.js    # 78 additional problems
├── guides.js                 # Learning guides for 15 categories
├── app.jsx                   # React application source
└── build.js                  # Build script (combines everything into HTML)
```

### Rebuilding (optional)

If you modify the data files or app code:

```bash
node build.js
# Outputs: dsa_mastery.html
```

---

## Problem Difficulty Distribution

```
Easy   ████████████████░░░░░░░░░░░░░░  ~28%
Medium ████████████████████████░░░░░░  ~55%
Hard   █████████░░░░░░░░░░░░░░░░░░░░░  ~17%
```

---

## Tips for Interview Prep

1. **Pattern recognition > memorization** — Learn to identify which pattern fits, not memorize solutions
2. **Always start with brute force** — Then optimize using the pattern
3. **Talk through your approach** — Practice explaining while you code
4. **Time yourself** — Easy: 10 min, Medium: 20 min, Hard: 35 min
5. **Revisit solved problems** — Can you solve them again in 1 week? 1 month?
6. **Focus on Medium** — Most interview questions are Medium difficulty
7. **Use the guides** — Understanding WHY a pattern works beats knowing the code

---

## License

This project is for personal educational use. Problem descriptions reference public problems from LeetCode, GeeksForGeeks, and HackerRank. Solutions are original implementations.

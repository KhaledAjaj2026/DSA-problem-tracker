# Data-Structure and Algorithm Problems Tracker

A table for keeping record of completed DSA questions. While a simple Excel document would suffice for the same purpose, this challenged me to make a web-app dedicated to saving progress in DSA practice.

## How to Use

Time yourself while solving DSA questions. Once completed, enter the following:

* Question (name of the problem)
* Source (e.g. LeetCode #258, CTCI #64, G4G)
* Categories (e.g. arrays, two-pointers, DFS/BFS)
* Date
* Time (minutes to solve question)

Then click the 'Enter' button and see your data inserted into the table below.

## Lessons Learned

The main focus of this project was to incorporate localStorage so each machine has its own databank to reach into when site loads. Very much enjoyed getting data to load in sequential and consistent order. Enjoyed making the site fully-responsive with the help of Chrome Dev Tools. Learned a lot about JS objects.

Learned about managing data in localStorage, and about object handling. Had to learn about deep-copies of objects so as to retain previous localStorage data when updating table. Picked up on HTML table structuring and creating dynamic tables using JS logic.

## Possible Future Updates

* New entry: Difficulty (Easy/Medium/Hard).
* Change delete method from entering row number to an 'X' next to row, when hovering over row.
* Ability to edit individual items in table.
* Sorting option for getting problems by date, difficulty, length, or time.
* Filtering option for getting problems by sources, difficulty, or range of time.
* Design overhaul; make site more easy to navigate and easier to understand.

## Deployment

This site was deployed using [github pages](https://pages.github.com/). Click [here](https://khaledajaj2026.github.io/DSA-problem-tracker/) to see site.

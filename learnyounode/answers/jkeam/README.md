# Solutions

## Intro
All of the answers to learnyounode is contained in solution.js.  In order to get the solution to the problem, simply call the appropriate function.  I did this because I wanted to easily be able to see all the solutions in a single file.

## Intro
1.  app.js      - Driver for the solution.  Call the method for the problem you want to solve.
2.  solution.js - Contains all of the solutions.
3.  lsfilter.js - Used in app.js, problem six, for the module problem.
4.  README.txt  - This file.

## Usage
There are external npm modules that you need to include in order to run the solutions.  Please run the following:

```bash
npm install strftime
npm install through2-map
```

Then from app.js you can call any function to get the solution.  For example, to see the solution to the first problem, make sure app.js looks like:

```javascript
var solution = require('./solution.js');
solution.one();
```

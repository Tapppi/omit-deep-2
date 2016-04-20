
# omit-deep-2
[![Build Status](https://travis-ci.org/Tapppi/omit-deep-2.svg?branch=master)](https://travis-ci.org/Tapppi/omit-deep-2)
[![Coverage Status](https://coveralls.io/repos/github/Tapppi/omit-deep-2/badge.svg?branch=master)](https://coveralls.io/github/Tapppi/omit-deep-2?branch=master)
[![npm version](https://badge.fury.io/js/omit-deep-2.svg)](https://badge.fury.io/js/omit-deep-2)

[![npm](https://nodei.co/npm/omit-deep-2.png)](https://npmjs.com/package/omit-deep-2)

> Omit object values recursively by key / keys / predicate

## Installation

```
npm install --save omit-deep-2
```

## Usage

``` javascript
// For purposes of this example, assume that this object 
// is reinitialized before each omitDeep call
var obj = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4
    }
};

// With key
omitDeep(obj, 'a'); 
// returns { b: 2, c: { d: 3, e: 4 } }

// With multiple keys
omitDeep(obj, ['a', 'b'], ['d'], 'e'); 
// returns { c: {} }

// Recursively
omitDeep(obj, 'a', 'd'); 
// returns { b: 2, c: { e: 4 } }

// With predicate function
omitDeep(obj, (key, val) => typeof val === 'object' || key === 'b'); 
// returns { a: 1 }
```

# not-allowed

> Throws a good user friendly error if a function is called, useful in stubs during testing

[![NPM][npm-icon]][npm-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard][standard-image]][standard-url]
[![renovate-app badge][renovate-badge]][renovate-app]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save-dev not-allowed
```

## Use

Imagine for example you are testing a stubbed method using [sinon](http://sinonjs.org/) and expect the method to be called with string 'foo'.

```js
const sinon = require('sinon')
const o = {
  // method to be stubbed
  say: () => 'hello'
}
// normally, o.say() returns "hello"
console.log('o.say()', o.say())
// "hello"
// but we want to make sure that when called with "foo"
// it returns different value
sinon.stub(o, 'say')
  .withArgs('foo').returns(42)
o.say('foo')
// 42
```

But what happens when we call the mocked method without any arguments `o.say()`? Or with unexpected argument `o.say('bar')`? Sinon will just return `undefined`, which can cause very tricky errors!

We really want to throw an error in this case because somehow our code is doing an unexpected call. Sinon already provides such feature: [`stub.throws()`](http://sinonjs.org/releases/v4.5.0/stubs/) and even `stub.throws(function() { return new Error(); })` where we can form a detailed message. So we can stub just `o.say('foo')` and throw an error for any other call.

```js
sinon.stub(o, 'say')
  .throws('nope')
  .withArgs('foo').returns(42)
o.say('foo')
// 42
o.say('bar')
// throws Error('nope')
```

**But**

The thrown error does NOT tell us _the arguments_ to the incorrect call! So we would not have any idea that the unexpected call was `o.say('bar')`! Luckily there is a method `.callsFake(fn)` in Sinon to call your function instead of throwing "dumb" error. We can use this method to get call's details and throw a very good error

```js
function onlyFoo(a) {
  throw new Error(`Cannot call this stub with argument ${a}`)
}
sinon.stub(o, 'say')
  .callsFake(onlyFoo)
  .withArgs('foo').returns(42)
o.say('bar')
// throws Error('Cannot call this stub with argument bar')
```

This NPM package just makes it convenient - it serializes arguments intelligently and throws an error.

```js
const notAllowed = require('not-allowed')
sinon.stub(o, 'say')
  .callsFake(notAllowed)
  .withArgs('foo').returns(42)
o.say('bar', 'bar', 42)
// throws Error('Not allowed to call this function with arguments
//    foo bar 42
// ')
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2018

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/not-allowed/issues) on Github

## MIT License

Copyright (c) 2018 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/not-allowed.svg?downloads=true
[npm-url]: https://npmjs.org/package/not-allowed
[ci-image]: https://travis-ci.org/bahmutov/not-allowed.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/not-allowed
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

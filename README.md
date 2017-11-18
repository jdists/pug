# @jdists/pug

pug as jdists processor

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

* @see [jdists](https://github.com/zswang/jdists)

* @see [pug](https://github.com/pugjs/pug)

## Example

```html
<!--data>
kids:
  - name: Jimmy
    age: '12'
  - name: Sally
    age: '4'
</data-->

<!--jdists encoding="pug" data="?data"-->
ul
  each item in kids
    li= item.name + '-' + item.age
<!--/jdists-->

<!--pug data="?data"-->
ul
  each item in kids
    li= item.name + '-' + item.age
<!--/pug-->
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://badge.fury.io/js/%40jdists%2Fpug
[npm-image]: https://badge.fury.io/js/%40jdists%2Fpug.svg
[travis-url]: https://travis-ci.org/jdists/pug
[travis-image]: https://travis-ci.org/jdists/pug.svg?branch=master
[coverage-url]: https://coveralls.io/github/jdists/pug?branch=master
[coverage-image]: https://coveralls.io/repos/jdists/pug/badge.svg?branch=master&service=github
#Object可优化get,set,has,delete

###安装
`
npm install node-dot-path
`

###示例
```javascript
const dot = require( 'node-dot-path' );


// norm
var node = {};
dot.set( node, 'a.b.c.d\\.1', 123 );              // node: { a: { b: { c: { 'd.1': 123 } } } }
console.log( dot.get( node, 'a.b.c.d\\.1' ) );    // 123
console.log( dot.has( node, 'a.b.c.d\\.1' ) );    // true
dot.delete( node, 'a.b.c.d\\.1' );                // node: { a: { b: { c: {} } } }

// batch
var node = {};
var pathArr = dot.makePathArray( 'a.b.c.d\\.1' );
dot.set( node, pathArr, 123 );
console.log( dot.get( node, pathArr ) );
console.log( dot.has( node, pathArr ) );
dot.delete( node, pathArr );

// function
var node = {};
dot.set( node, 'a.b', function() { return { c: 123 }; } );
console.log( node );                              // { a: { b: [Function] } }
console.log( dot.get( node, 'a.b.c', true ) );    // 123
console.log( dot.get( node, 'a.b.c' ) );          // undefined
console.log( dot.get( node, 'a.b', true ) );      // { c: 123 }
console.log( dot.get( node, 'a.b' ) );            // [Function]

// arrayToObject
console.log( dot.arrayToObject( [ 'a.b=123', 'aa', 'a.c\\=2\\.asd.c=asd asd=asd' ] ) );
// echo: { a: { b: '123', 'c=2.asd': { c: 'asd asd=asd' } }, aa: true }

dot.arrayToObject( process.argv.slice( 2 ) );

```

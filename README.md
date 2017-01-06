###Download
`
npm install node-dot-path
`

###Example
```javascript
const dot = require( 'node-dot-path' );

var node = {};

// norm
dot.set( node, 'A.B.C.D\\.1', 123 );              // node: { A: { B: { C: { 'D.1': 123 } } } }
console.log( dot.get( node, 'A.B.C.D\\.1' ) );    // 123
console.log( dot.has( node, 'A.B.C.D\\.1' ) );    // true
dot.delete( node, 'A.B.C.D\\.1' );                // node: { A: { B: { C: {} } } }

// batch
var pathArr = dot.makePathArray( 'A.B.C.D\\.1' );
dot.set( node, pathArr, 123 );
console.log( dot.get( node, pathArr ) );
console.log( dot.has( node, pathArr ) );
dot.delete( node, pathArr );
```
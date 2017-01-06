class PathArray extends Array {}

const makePathArray = function( path ) {
	if ( path instanceof PathArray ) {
		return path;
	} else if ( path instanceof Array ) {
		const pathArray = new PathArray();
		for ( var index = 0; index < path.length; index++ ) {
			pathArray[ pathArray.length ] = makePathArray( path[ index ] );
		}
		return pathArray;
	} else if ( typeof path === 'string' ) {
		const pathArray = new PathArray();
		path = path.split( '.' );
		for ( var index = 0, name = ''; index < path.length; index++ ) {
			const segment = path[ index ];
			if ( segment[ segment.length - 1 ] === '\\' ) {
				name += segment.slice( 0, -1 ) + '.';
			} else {
				name += segment;
				pathArray[ pathArray.length ] = name;
				name = '';
			}
		}
		return pathArray;
	} else {
		return null;
	}
};

module.exports = {
	PathArray: PathArray,
	makePathArray: makePathArray,
	set: function( node, path, value ) {
		const pathArray = makePathArray( path );
		if ( pathArray ) {
			const end = pathArray.length - 1;
			for ( var index = 0; index < end; index++ ) {
				const name = pathArray[ index ];
				if ( node[ name ] && node[ name ] instanceof Object ) {
					node = node[ name ];
				} else {
					node = node[ name ] = {};
				}
			}
			node[ pathArray[ end ] ] = value;
			return true;
		} else {
			return false;
		}
	},
	get: function( node, path ) {
		const pathArray = makePathArray( path );
		if ( pathArray ) {
			const end = pathArray.length - 1;
			for ( var index = 0; index < end; index++ ) {
				const name = pathArray[ index ];
				if ( node[ name ] && node[ name ] instanceof Object ) {
					node = node[ name ];
				} else {
					return undefined;
				}
			}
			return node[ pathArray[ end ] ];
		} else {
			return undefined;
		}
	},
	has: function( node, path ) {
		const pathArray = makePathArray( path );
		if ( pathArray ) {
			const end = pathArray.length - 1;
			for ( var index = 0; index < end; index++ ) {
				const name = pathArray[ index ];
				if ( node[ name ] && node[ name ] instanceof Object ) {
					node = node[ name ];
				} else {
					return false;
				}
			}
			return pathArray[ end ] in node;
		} else {
			return false;
		}
	},
	delete: function( node, path ) {
		const pathArray = makePathArray( path );
		if ( pathArray ) {
			const end = pathArray.length - 1;
			for ( var index = 0; index < end; index++ ) {
				const name = pathArray[ index ];
				if ( node[ name ] && node[ name ] instanceof Object ) {
					node = node[ name ];
				} else {
					return;
				}
			}
			delete node[ pathArray[ end ] ];
		}
	},
};

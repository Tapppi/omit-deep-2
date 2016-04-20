var _ = require('lodash');
var debug = require('debug')('omit-deep-2');

/**
 *
 * @param {Object} object - Object to omit from
 * @param {String|Function|Array} predicate - String or array of strings
 *                                  to match, or function to call with (key, value)
 * @returns {*}
 */
module.exports = function omitDeep(object, predicate) {
	debug('omitDeep');
	predicate = [].splice.call(arguments, 0);
	predicate.splice(0, 1);
	debug('Spliced predicate: ', JSON.stringify(predicate));

	if (predicate.length && _.isFunction(predicate[0])) {
		debug('Predicate[0] is function, take it');
		predicate = predicate[0];
	} else if (predicate.length) {
		debug('Predicate has length, flatten the array');
		const props = _.flattenDeep(predicate);
		predicate = function(key) {
			return _.find(props, function(p) {
				return key === p;
			});
		};
		debug('Created func with props: ', props);
	} else {
		debug('No predicate to omit with, return original object');
		return object;
	}

	debug('Omit');
	_.forOwn(object, function(val, key) {
		debug('key: ', key);
		if (predicate(key, val)) {
			debug('Predicate returned true, delete');
			delete object[key];
		} else if (_.isObject(val)) {
			debug('val is object, recurse');
			object[key] = omitDeep(val, predicate);
		}
	});

	debug('Return ', object);
	return object;
};

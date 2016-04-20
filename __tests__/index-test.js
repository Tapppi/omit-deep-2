jest.disableAutomock();

describe('omitDeep', function() {
	it('returns when no predicates given', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2
		};

		var omitted = omitDeep(obj);

		expect(omitted).toBe(obj);
	});

	it('removes values by key', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2
		};

		var omitted = omitDeep(obj, 'a');

		expect(omitted.a).toBeUndefined();
		expect(omitted.b).toBe(2);
	});
	
	it('removes values recursively', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2,
			ab: {
				c: 3,
				d: 4
			}
		};

		var omitted = omitDeep(obj, 'd');

		expect(omitted.a).toBe(1);
		expect(omitted.b).toBe(2);
		expect(omitted.ab).toBeDefined();
		expect(omitted.ab.c).toBe(3);
		expect(omitted.ab.d).toBeUndefined();
	});

	it('supports multiple args', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2,
			ab: {
				c: 3,
				d: 4
			}
		};

		var omitted = omitDeep(obj, 'b', 'ab');

		expect(omitted.a).toBe(1);
		expect(omitted.b).toBeUndefined();
		expect(omitted.ab).toBeUndefined();
	});

	it('supports array and mixed as arg', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2,
			c: 3,
			ab: {
				d: 4
			}
		};

		var omitted = omitDeep(obj, ['b', 'c'], ['d'], 'a');

		expect(omitted.ab).toBeDefined();

		expect(omitted.a).toBeUndefined();
		expect(omitted.b).toBeUndefined();
		expect(omitted.c).toBeUndefined();
		expect(omitted.d).toBeUndefined();
	});

	it('supports array and mixed as arg', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2,
			c: 3,
			d: 4,
			ab: {
				f: 'yes'
			}
		};

		var omitted = omitDeep(obj, ['b', 'ab'], ['c'], 'd');

		expect(omitted.a).toBe(1);
		expect(omitted.b).toBeUndefined();
		expect(omitted.ab).toBeUndefined();
		expect(omitted.c).toBeUndefined();
		expect(omitted.d).toBeUndefined();
	});

	it('supports predicate functions with key', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2,
			c: 3,
			d: 4,
			ab: {
				f: 'yes'
			}
		};

		var omitted = omitDeep(obj, function(key) {
			return key.indexOf('b') !== -1;
		});

		expect(omitted.a).toBe(1);
		expect(omitted.b).toBeUndefined();
		expect(omitted.ab).toBeUndefined();
		expect(omitted.c).toBe(3);
		expect(omitted.d).toBe(4);
	});

	it('supports predicate functions with value', function() {
		var omitDeep = require('../index');
		var obj = {
			a: 1,
			b: 2,
			c: 3,
			d: 4,
			ab: {
				f: 'yes'
			}
		};

		var omitted = omitDeep(obj, function(key, value) {
			return key === 'b' || typeof value === 'object';
		});

		expect(omitted.a).toBe(1);
		expect(omitted.b).toBeUndefined();
		expect(omitted.ab).toBeUndefined();
		expect(omitted.c).toBe(3);
		expect(omitted.d).toBe(4);
	});
});

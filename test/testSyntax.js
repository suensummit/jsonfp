var  assert = require('assert'),
     lamda = require('../lib/lamdaApp.js');

describe('Test syntax...', function() {
    it('evaluate constants', function() {
        var  result = lamda.apply('', 'Hello World');
        assert.equal(result, 'Hello World');

        result = lamda.apply('whatever input', 99);
        assert.equal(result, 99);

        result = lamda.apply('whatever input', {name: 'John', project: 'JSON-fp'});
        assert.equal(result.name, 'John', 'name is John');

        result = lamda.apply('what ever input', [1, 2, 3, 4]);
        assert.equal( result.length, 4, 'array of 4 elements');
        assert.equal( result[0], 1, 'first element is 1');
    });

    it('evaluate expressions', function() {
        var  expr = {add: 4},
             result = lamda.apply(12, expr);
        assert.equal( result, 16, 'sum should be 16');

        expr = {def: 4};
        result = lamda.apply(12, expr);
        assert.equal( result, 4, 'should just return the definition');

        // evaluation stops at 'def'
        expr = {def: {add: 4}};
        result = lamda.apply(12, expr);
        assert.equal(result.add, 4, 'should be {add: 4}');

        // we can explicitly specify input to an expression
        expr = {
            name: {add:
                {
                    _input: 'Lennon',
                    _expr: 'John '
                }
            },
            path: {add:
                {
                    _input: '/lib',
                    _expr: '/usr'
                }
            }
        };
        result = lamda.apply('whatever', expr);
        assert.equal(result.name, 'John Lennon', 'name is John Lennon');
        assert.equal(result.path, '/usr/lib', 'path is /usr/lib');
        //console.log(JSON.stringify(result, null, 4));
    });

    it('evaluate array', function() {
        var  expr = [{add: 2}, {add: 4}],
             result = lamda.apply(8, expr);
        assert.equal(result[0], 10, 'first elem is 10');
        assert.equal(result[1], 12, 'second elem is 12');
    });
});

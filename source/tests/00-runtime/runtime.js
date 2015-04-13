require('lib/test');

function test_$rt_toObject()
{
    assertThrows(function () {
        $rt_toObject(null);
    });

    assertThrows(function () {
        $rt_toObject(undefined);
    });

    assert($rt_toObject(true) instanceof Boolean);
    assert($rt_toObject(3) instanceof Number);
    assert($rt_toObject('abc') instanceof String);

    var o = {};
    assert($rt_toObject(o) === o);
    var a = [];
    assert($rt_toObject(a) === a);
}

function test_$rt_toInteger()
{
    // ensure +0
    assert(1/$rt_toInteger(NaN) === Infinity);
    assert(1/$rt_toInteger(+0) === Infinity);
    assert(1/$rt_toInteger(-0) === -Infinity);
    assert($rt_toInteger(Infinity) === Infinity);
    assert($rt_toInteger(-Infinity) === -Infinity);

    assert($rt_toInteger(3.14) === 3);
    assert($rt_toInteger(-3.14) === -3);
    assert($rt_toInteger(3) === 3);
}

test_$rt_toObject();
test_$rt_toInteger();

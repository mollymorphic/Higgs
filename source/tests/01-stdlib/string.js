/* _________________________________________________________________________
 *
 *             Tachyon : A Self-Hosted JavaScript Virtual Machine
 *
 *
 *  This file is part of the Tachyon JavaScript project. Tachyon is
 *  distributed at:
 *  http://github.com/Tachyon-Team/Tachyon
 *
 *
 *  Copyright (c) 2011-2015, Universite de Montreal
 *  All rights reserved.
 *
 *  This software is licensed under the following license (Modified BSD
 *  License):
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are
 *  met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the Universite de Montreal nor the names of its
 *      contributors may be used to endorse or promote products derived
 *      from this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 *  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *  TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 *  PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL UNIVERSITE DE
 *  MONTREAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * _________________________________________________________________________
 */
require('lib/test');

function test_lit()
{
    var str = "foo\
        bar bif boop\
        bleep bloop\
        boof";

    // Verify that the multi-line string is properly formed
    if (str.length !== 54)
        return 1;

    return 0;
}

function test_ctor()
{
    assert (String(5) === '5')

    assert (String('foo') === 'foo')

    assert (String(new String('foo')) === 'foo')

    assert (String(new String()) === '')

    var o = new String("abc");
    assert(o[0] === "a");
    assert(o[1] === "b");
    assert(o[2] === "c");
    assert(o[3] === undefined);
    assert(o.length === 3);
    assert(o.value === "abc");
    // attempt and fail mutation
    o.length = 5;
    assert(o.length === 3);
    o.value = "abcdef";
    assert(o.value === "abc");
    // check enumerability
    assertEqArray(Object.keys(o), ['0', '1', '2']);
}

function test_toString()
{
    var s = 'foo';
    var so = new String('foo');

    if (s.toString() !== s)
        return 1;

    if (so.toString() !== s)
        return 2;

    if (so.toString() === so)
        return 3;

    return 0;
}

function test_valueOf()
{
    var s = 'foo';
    var so = new String('foo');

    if (s.toString() !== s)
        return 1;

    if (so.toString() !== s)
        return 2;

    if (so.toString() === so)
        return 3;

    return 0;
}

function test_charCodeAt()
{
    var s = 'foo';

    if (s.charCodeAt(0) !== 102)
        return 1;
    if (s.charCodeAt(1) !== 111)
        return 2;
    if (s.charCodeAt(2) !== 111)
        return 3;

    return 0;
}

function test_codePointAt()
{
    var codePointAt = String.prototype.codePointAt;

    assertThrows(function () {
        codePointAt.call(null);
    });
    assertThrows(function () {
        codePointAt.call(null);
    });

    assert('foo'.codePointAt(0) === 102);
    assert('foo'.codePointAt(1) === 111);
    assert('foo'.codePointAt(2) === 111);
    assert('🂡'.codePointAt(0) === 0x1F0A1);
    assert('🂡f'.codePointAt(2) === 102);
}

function test_charAt()
{
    var s = 'foo';

    assert (s.charAt(0) === 'f')
    assert (s.charAt(1) === 'o')
    assert (s.charAt(2) === 'o')
    assert (s.charAt(3) === '')
}

function test_endsWith()
{
    var endsWith = String.prototype.endsWith;

    assertThrows(function () {
        endsWith.call(null);
    });
    assertThrows(function () {
        endsWith.call(undefined);
    });
    assertThrows(function () {
        "abc".endsWith(/abc/);
    });

    assert("abc".endsWith("c"));
    assert("abc".endsWith("abc"));
    assert("abc".endsWith("ab", 2));
    assert("abcdef".endsWith("a", 1));

    assert(endsWith.call(3.14, "14"));
    assert(endsWith.call(3, 3));
    assert(endsWith.call(3, "3"));
    assert(endsWith.call("3", 3));
    assert(endsWith.call(true, "e"));
    assert(endsWith.call(false, "e"));
}

function test_includes()
{
    var includes = String.prototype.includes;

    assertThrows(function () {
        includes.call(null);
    });
    assertThrows(function () {
        includes.call(undefined);
    });
    assertThrows(function () {
        "abc".includes(/abc/);
    });

    assert("abc".includes("ab"));
    assert("abc".includes("bc"));
    assert(!"abc".includes("d"));
    assert("defabc".includes("ab", 3));
    assert(!"ééééeeee".includes("é", 4));

    assert(includes.call(3.14, 14));
    assert(includes.call(true, "r"));
    assert(includes.call(false, "a"));
    assert(!includes.call(false, "a", 2));

}

function test_indexing()
{
    var s = 'foo';

    if (s[0] !== 'f')
        return 1;
    if (s[1] !== 'o')
        return 2;
    if (s[2] !== 'o')
        return 3;
    if (s[3] !== undefined)
        return 4;

    return 0;
}

function test_indexOf()
{
    if ('foo'.indexOf('f') != 0)
        return 1;
    if ('foo'.indexOf('o') != 1)
        return 2;
    if ('foo'.indexOf('oo') != 1)
        return 3;
    if ('foo'.indexOf('a') != -1)
        return 4;

    return 0;
}

function test_lastIndexOf()
{
    if ('foo'.lastIndexOf('f') != 0)
        return 1;
    if ('foo'.lastIndexOf('o') != 2)
        return 2;
    if ('foo'.lastIndexOf('oo') != 1)
        return 3;
    if ('foo'.lastIndexOf('a') != -1)
        return 4;

    return 0;
}

function test_toLowerCase()
{
    if ('FOO'.toLowerCase() != 'foo')
        return 1;
    if ('FoO'.toLowerCase() != 'foo')
        return 2;
    if ('foo'.toLowerCase() != 'foo')
        return 3;

    return 0;
}

function test_toUpperCase()
{
    if ('FOO'.toUpperCase() != 'FOO')
        return 1;
    if ('FoO'.toUpperCase() != 'FOO')
        return 2;
    if ('foo'.toUpperCase() != 'FOO')
        return 3;

    return 0;
}

function test_slice()
{
    if ('foo'.slice(0) !== 'foo')
        return 1;
    if ('foo'.slice(1) !== 'oo')
        return 2;
    if ('foobar'.slice(1,4) !== 'oob')
        return 3;
    if ((new String('foobar')).slice(1,4) !== 'oob')
        return 4;
    if ('foobar'.slice(1,-1) !== 'ooba')
        return 5;
    if ('foobar'.slice() !== 'foobar')
        return 6;
    if ('foobar'.slice(-2, -1) !== 'a')
        return 7;

    return 0;
}

function test_substring()
{
    assert ('foo'.substring(0) === 'foo');

    assert ('foo'.substring(1) === 'oo');

    assert ('foobar'.substring(1,4) === 'oob');

    assert ('foobar'.substring(-1,1.6) === 'f');
}

function test_substr()
{
    if ('foo'.substr(0) !== 'foo')
        return 1;
    if ('foo'.substr(1, 1) !== 'o')
        return 2;
    if ('foobar'.substr(1,3) !== 'oob')
        return 3;
    if ('foo'.substr(1,5) !== 'oo')
        return 4;

    return 0;
}

function test_concat()
{
    assert (''.concat() === '');

    assert ('foo'.concat() === 'foo');

    assert ('foo'.concat('') === 'foo');

    assert ('foo'.concat('bar') === 'foobar');

    assert ('foo'.concat('bar', 'bif') === 'foobarbif');

    assert ('f'.concat(2) === 'f2');
}

function test_repeat()
{
    assertThrows(function () {
        String.prototype.repeat.call(null, 2);
    });
    assertThrows(function () {
        String.prototype.repeat.call(undefined, 2);
    });
    assertThrows(function () {
        "abc".repeat(-1);
    });
    assertThrows(function () {
        "abc".repeat(Infinity);
    });

    var repeat = String.prototype.repeat;

    assert("abc".repeat(3) === "abcabcabc");
    assert("".repeat(5) === "");
    assert("abc".repeat(0) === "");
    assert("abc".repeat(null) === "");
    assert("abc".repeat() === "");
    assert(repeat.call(3, 3) === "333");
    assert(repeat.call(3.14, 3) === "3.143.143.14");
    assert(repeat.call(false, 2) === "falsefalse");
    assert(repeat.call(true, 2) === "truetrue");
}

function test_replace()
{
    assert ('foobif'.replace('oo', 'oobar') === 'foobarbif')

    assert ('123'.replace('456', '789') === '123');

    assert ('foobar'.replace(/(.)\1/, '$1') === 'fobar')

    assert ('foobar'.replace(/(.)/g, '$1$1') === 'ffoooobbaarr')

    assert ('foobar foobar'.replace(/\bf/g, "$`") === 'oobar foobar oobar')

    assert ('foobar foobar'.replace(/\bf/g, "$'") === 'oobar foobaroobar oobaroobar')

    assert ('f'.replace(/a/g, "b") === 'f')

    assert ('QBZPbageby_'.replace(/^\s*|\s*$/g, '') === 'QBZPbageby_');
}

function test_split()
{
    function array_eq(a1, a2)
    {
        if (a1.length !== a2.length)
            return false;

        for (var i = 0; i < a1.length; ++i)
            if (a1[i] !== a2[i])
                return false;

        return true;
    }

    if (!array_eq('foo,bar,bif'.split(','), ['foo','bar','bif']))
        return 1;

    if (!array_eq('foo,bar,bif'.split(',', 0), []))
        return 2;

    if (!array_eq('foo,bar,bif'.split(',', 1), ['foo']))
        return 3;

    if (!array_eq('foo,bar,bif'.split(',', 2), ['foo','bar']))
        return 4;

    if (!array_eq('foo,bar,bif'.split(',', 3), ['foo','bar','bif']))
        return 5;

    if (!array_eq('foo,bar,bif'.split(), ['foo,bar,bif']))
        return 6;

    if (!array_eq('foo'.split(''), ['f', 'o', 'o']))
        return 7;

    if (!array_eq('foonull'.split(null), ['foo', '']))
        return 8;

    if (!array_eq(''.split('f'), ['']))
        return 9;

    if (!array_eq(''.split(''), []))
        return 10;

    if (!array_eq('181'.split(8), ['1','1']))
        return 11;

    if (!array_eq('181'.split({toString : function(){ return '8';}}), ['1','1']))
        return 12;

    if (!array_eq('181'.split([8]), ['1','1']))
        return 13;

    assert (array_eq('181 181'.split(/\s/), ['181', '181']))
    assert (array_eq('181 181'.split(new RegExp('\\s')), ['181', '181']))
    assert (array_eq('181 181'.split(new RegExp(/\s/)), ['181', '181']))

    return 0;
}

function test_startsWith()
{
    var startsWith = String.prototype.startsWith;

    assertThrows(function () {
        startsWith.call(null, "abc");
    });
    assertThrows(function () {
        startsWith.call(undefined, "abc");
    });
    assertThrows(function () {
        "abc".startsWith(/abc/);
    });

    assert("abc".startsWith("a"));
    assert(!"defabc".startsWith("a"));
    assert("defabc".startsWith("a", 3));
    assert(!"defabc".startsWith("a", 8));

    assert(startsWith.call(3.14, "3"));
    assert(startsWith.call(3, 3));
    assert(startsWith.call("3", 3));
    assert(startsWith.call(3, "3"));
    assert(startsWith.call(false, "fal"));
    assert(startsWith.call(true, "tru"));
}

function test_trim()
{
    if ('foo'.trim() !== 'foo')
        return 1;

    if (' foo'.trim() !== 'foo')
        return 2;

    if ('   \n  foo \r\n \t  '.trim() !== 'foo')
        return 3;

    if ('   \n  foo bar \r\n \t  '.trim() !== 'foo bar')
        return 4;

    if ('   \t  \n \t   \t'.trim() !== '')
        return 5;

    if ('   '.trim() !== '')
        return 6;

    return 0;
}

function test_fromCharCode()
{
    if (String.fromCharCode() != '')
        return 1;

    if (String.fromCharCode(102, 111, 111) != 'foo')
        return 2;

    if (String.fromCharCode('48','49') != '01')
        return 3;

    if (String.fromCharCode('060','061') != '<=')
        return 4;

    if (String.fromCharCode('0x48','0x49') != 'HI')
        return 5;

    return 0;
}

function test_fromCodePoint()
{
    assertThrows(function () {
        String.fromCodePoint(17.5);
    });
    assertThrows(function () {
        String.fromCodePoint(-5);
    });
    assertThrows(function () {
        String.fromCodePoint(0x11FFFF);
    });

    assert(String.fromCodePoint(102, 111, 111) === 'foo');
    assert(String.fromCodePoint(0x1F0A1, 0x1F0B1, 0x1F0C1, 0x1F0D1) === '🂡🂱🃁🃑');
    assert(String.fromCodePoint(102, 0x1F0A1, 111, 111) === 'f🂡oo');
}

function test()
{
    var r = test_lit();
    if (r != 0)
        return 100 + r;

    test_ctor();

    var r = test_toString();
    if (r != 0)
        return 300 + r;

    var r = test_valueOf();
    if (r != 0)
        return 400 + r;

    var r = test_charCodeAt();
    if (r != 0)
        return 500 + r;

    test_charAt();

    test_endsWith();

    test_includes();

    var r = test_indexing();
    if (r != 0)
        return 700 + r;

    var r = test_indexOf();
    if (r != 0)
        return 800 + r;

    var r = test_lastIndexOf();
    if (r != 0)
        return 900 + r;

    var r = test_toLowerCase();
    if (r != 0)
        return 1000 + r;

    var r = test_toUpperCase();
    if (r != 0)
        return 1100 + r;

    var r = test_slice();
    if (r != 0)
        return 1200 + r;

    test_substring();

    var r = test_substr();
    if (r != 0)
        return 1400 + r;

    test_concat();

    test_repeat();

    test_replace();

    var r = test_split();
    if (r != 0)
        return 1700 + r;

    test_startsWith();

    var r = test_trim();
    if (r != 0)
        return 1800 + r;

    var r = test_fromCharCode();
    if (r != 0)
        return 1900 + r;

    test_fromCodePoint();

    return 0;
}

// TODO: convert this test to use assertions &
// exceptions instead of return codes
var r = test();
assert (r === 0, r);

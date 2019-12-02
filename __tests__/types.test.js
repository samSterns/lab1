const {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    castToNumber,
    getCaster
} = require('../lib/types.js');

describe('types function', () => {
    describe('basic validation', () => {
        it('properly tells if a value is a numbers', () => {
            expect(isNumber(3)).toBeTruthy();
            expect(isNumber('hi')).toBeFalsy();
            expect(isNumber([])).toBeFalsy();
            expect(isNumber({})).toBeFalsy();
            expect(isNumber(() => {})).toBeFalsy();
            expect(isNumber(true)).toBeFalsy();
        });
        it('properly tells if a value is a string', () => {
            expect(isString('hi')).toBeTruthy();
            expect(isString(3)).toBeFalsy();
            expect(isString([])).toBeFalsy();
            expect(isString({})).toBeFalsy();
            expect(isString(() => {})).toBeFalsy();
            expect(isString(true)).toBeFalsy();
        });
        it('properly tells if a value is a boolean', () => {
            expect(isBoolean(true)).toBeTruthy();
            expect(isBoolean([])).toBeFalsy();
            expect(isBoolean({})).toBeFalsy();
            expect(isBoolean(() => {})).toBeFalsy();
        });
        it('properly tells if a value is an array', () => {
            expect(isArray([])).toBeTruthy();
            expect(isArray(3)).toBeFalsy();
            expect(isArray(true)).toBeFalsy();
            expect(isArray({})).toBeFalsy();
            expect(isArray(() => {})).toBeFalsy();
        });
        it('properly tells if a value is an object', () => {
            expect(isObject({})).toBeTruthy();
            expect(isObject(3)).toBeFalsy();
            expect(isObject(true)).toBeFalsy();
            expect(isObject(() => {})).toBeFalsy();
        });
    });

    describe('casters', () => {
        it('can cast values to a number', () => {
            expect(castToNumber(3)).toEqual(3);
            expect(castToNumber('3')).toEqual(3);
            expect(castToNumber(true)).toEqual(1);
            expect(castToNumber(false)).toEqual(0);
        });

        it('throws if value is not castable to number', () => {
            expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
            expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
        });
    });

    it('can get the right caster', () => {
        expect(getCaster(Number)).toEqual(castToNumber);
        expect(getCaster(Promise)).toBeNull();
    });
});

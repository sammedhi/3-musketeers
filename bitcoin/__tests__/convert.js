'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning a Number', () => {
   expect(typeof convert(2, 'BTC', 'BTC')).toBe("number");
});

test('should return a Number', () => {
  expect(typeof convert(2, 'BTC', 'BTC', 'Number')).toBe("number");
});

test('should return a Big number', () => {
  expect(typeof convert(2, 'BTC', 'BTC', 'Big')).toBe(typeof new Big(0));
});

test('should return a String', () => {
  expect(typeof convert(2100, 'mBTC', 'BTC', 'String')).toBe('string');
});

test('should convert an integer', () => {
  expect( () => {convert(123456789012345, 'Satoshi', 'BTC', 'Number')}).not.toThrow();
});

test('should convert a number', () => {
  expect( () => {convert(1234567.89012345, 'BTC', 'Satoshi', 'Number')}).not.toThrow();
});

test('should convert a string', () => {
  expect( () => {convert('2', 'BTC', 'BTC', 'Number')} ).not.toThrow();
});

test('should convert a Big number', () => {
  expect( () => {convert(new Big(2), 'BTC', 'BTC', 'Number')}).not.toThrow();;
});

test('should convert a NaN to a Number', () => {
  expect(typeof convert(NaN, 'BTC', 'BTC', 'Number')).toBe('number');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'Number')).toBe('number');
});

test('should convert a NaN to a String', () => {
  expect(typeof convert(NaN, 'BTC', 'BTC', 'String')).toBe('string');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'String')).toBe('string');
});

test('should not convert a NaN to a Big', () => {
  expect(() => {convert(NaN, 'BTC', 'BTC', 'Big')}).toThrow();
});

test('should handle rounding errors', () => {
  expect(convert(convert(4.6, 'Satoshi', 'BTC', 'Number'), 'BTC', 'Satoshi', 'Number')).toBe(4.6);
  //convert(4.6, 'Satoshi', 'BTC', 'Number')
  //convert(0.000000046, 'BTC', 'Satoshi', 'Number')
});

test('should throw when untest is undefined', () => {
  expect(() => {convert(new Big(2), 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(new Big(2), 'BTC', 'x', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'x', 'Number')}).toThrow();
});

test('should throw when representaion is undefined', () => {
  expect(() => {convert(2, 'BTC', 'mBTC', 'x')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'mBTC', 'x')}).toThrow();
});

test('should allow untest aliases', () => {
  expect(() => {convert(4.6, 'Satoshi', 'sat')}).not.toThrow();
  expect(() => {convert(4.6, 'μBTC', 'btest')}).toThrow();
});

test('should not allow to create an existing unit' , () => {
	expect(() => {convert.addUnit('BTC' , 0.3)}).toThrow()
});

test('should allow to create a non existing unit' , () => {
	expect(() => {convert.addUnit('MyMoney' , 0.3)}).not.toThrow()
});

test('should not allow to remove a predefined unit' , () => {
	expect(() => {convert.removeUnit('BTC')}).toThrow()
});

test('should not allow to remove a non existing unit' , () => {
	expect(() => {convert.removeUnit('MyMoney')}).not.toThrow()
});

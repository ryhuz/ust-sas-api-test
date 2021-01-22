"use strict";

var app = require('../app');

var request = require('supertest');

describe("Sum numbers", function () {
  test("it should sum two numbers correctly", function () {
    var sum = 1 + 2;
    var expectedResult = 3;
    expect(sum).toEqual(expectedResult);
  });
});
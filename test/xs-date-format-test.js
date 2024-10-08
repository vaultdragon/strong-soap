// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: strong-soap
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use strict";
var xmlHandler = require('./../src/parser/xmlHandler');
var assert = require('assert');

describe('xs-date-format-tests', function() {

  it('parses a xs:date string with negative tz offset', function () {
    var inputDate = '2019-03-27-06:00';
    var parsed = xmlHandler.parseValue(inputDate, {jsType: Date});
    assert.equal(parsed.toISOString(), new Date('2019-03-27').toISOString(), 'expected parsed date');
  });

  it('parses a xs:date string with positive tz offset', function () {
    var inputDate = '2019-03-27+06:00';
    var parsed = xmlHandler.parseValue(inputDate, {jsType: Date});
    assert.equal(parsed.toISOString(), new Date('2019-03-27').toISOString(), 'expected parsed date');
  });
  
  it('parses a xs:date string with Z at the end', function () {
    var inputDate = '2019-03-27Z';
    var parsed = xmlHandler.parseValue(inputDate, {jsType: Date});
    assert.equal(parsed.toISOString(), new Date(inputDate).toISOString(), 'expected parsed date');
  });
  
  it('parses a xs:date string without tz', function () {
    var inputDate = '2019-03-27';
    var parsed = xmlHandler.parseValue(inputDate, {jsType: Date});
    assert.equal(parsed.toISOString(), new Date(inputDate).toISOString(), 'expected parsed date');
  });
  
  it('parses a xs:dateTime string with tz', function () {
    var inputDate = '2019-03-27T01:01:01-03:00';
    var parsed = xmlHandler.parseValue(inputDate, {jsType: Date});
    assert.equal(parsed.toISOString(), new Date(inputDate).toISOString(), 'expected parsed date');
  });
  
  it('parses a xs:dateTime string without tz', function () {
    var inputDate = '2019-03-27T01:01:01';
    var parsed = xmlHandler.parseValue(inputDate, {jsType: Date});
    assert.equal(parsed.toISOString(), new Date(inputDate).toISOString(), 'expected parsed date');
  });

  describe('xml date/time/dateTime', function () {
    // 2019-03-27T04:01:01.000Z
    var inputDate = new Date('2019-03-27T01:01:01-03:00');
    var inputDateStr = new Date('2019-03-27T01:01:01-03:00');

    it('converts date to xml date', function () {
      var xmlDate = xmlHandler.toXmlDate(inputDate);
      assert.equal(xmlDate, '2019-03-27Z');
    });

    it('converts date to xml date without Z', function() {
      var xmlDate = xmlHandler.toXmlDate(inputDate, {
        timezone: {
          enabled: false,
        },
      });
      assert.equal(xmlDate, '2019-03-27');
    });

    it('converts date to xml time', function () {
      var xmlTime = xmlHandler.toXmlTime(inputDate);
      assert.equal(xmlTime, '04:01:01.000Z');
    });

    it('converts date to xml dateTime', function () {
      var xmlDateTime = xmlHandler.toXmlDateTime(inputDate);
      assert.equal(xmlDateTime, '2019-03-27T04:01:01.000Z');
    });

    it('converts string to xml date', function () {
      var xmlDate = xmlHandler.toXmlDate(inputDateStr);
      assert.equal(xmlDate, '2019-03-27Z');
    });

    it('converts string to xml date without Z', function() {
      var xmlDate = xmlHandler.toXmlDate(inputDateStr, {
        timezone: {
          enabled: false,
        },
      });
      assert.equal(xmlDate, '2019-03-27');
    });


    it('converts string to xml time', function () {
      var xmlTime = xmlHandler.toXmlTime(inputDateStr);
      assert.equal(xmlTime, '04:01:01.000Z');
    });

    it('converts string to xml dateTime', function () {
      var xmlDateTime = xmlHandler.toXmlDateTime(inputDateStr);
      assert.equal(xmlDateTime, '2019-03-27T04:01:01.000Z');
    });
    
    it('returns invalid date string as is', function () {
      var xmlDateTime = xmlHandler.toXmlDateTime('23091990');
      assert.equal(xmlDateTime, '23091990');
    });

    it('returns string as is with raw input options for toXmlTime()', function () {
      const rawInputTime = '04:01:01+08:00'
      var xmlTime = xmlHandler.toXmlTime(rawInputTime, { rawInput: true });
      assert.equal(xmlTime, rawInputTime);
    });

    it('returns string as is with raw input options for toXmlDate()', function () {
      const rawInputDate = '20190327'
      var xmlTime = xmlHandler.toXmlDate(rawInputDate, { rawInput: true });
      assert.equal(xmlTime, rawInputDate);
    });

    it('returns string as is with raw input options for toXmlDateTime()', function () {
      const rawInputDateTime = '2019-03-27T01:01:01+08:00'
      var xmlTime = xmlHandler.toXmlDateTime(rawInputDateTime, { rawInput: true });
      assert.equal(xmlTime, rawInputDateTime);
    });
  });
  
});

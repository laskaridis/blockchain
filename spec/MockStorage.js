"use strict";

(function() {
  var MockStorage = function(opts) { };
  MockStorage.prototype.put = function(block) { };
  MockStorage.prototype.get = function(hash) { }
  module.exports = MockStorage;
}());

"use strict";

(function() {

  const SHA256 = require('crypto-js/sha256');

  class Block {

    constructor({
      height = 0,
      transactions = [],
      timestamp = Date.now(),
      previousBlockHash = 0,
      nonce = 0 } = {}) {

      this.height = height;
      this.transactions = transactions;
      this.timestamp = timestamp
      this.nonce = nonce
      this.transactionsHash = this.calculateTransactionsHash();
      this.transactionsCount = transactions.length;
      this.previousBlockHash = previousBlockHash;
      this.blockHash = this.calculateHash();
    }

    calculateHash() {
      return SHA256(
          this.height.toString() + 
          this.timestamp.toString() +
          this.transactionsCount.toString() +
          this.transactionsHash +
          this.previousBlockHash +
          this.nonce.toString()
          ).toString();
    }

    calculateTransactionsHash() {
      return SHA256(this.transactions.map(t => t.transactionHash).join('')).toString();
    }

    isValid() {
      if (this.transactionHash != this.calculateTransactionsHash) {
        return false;
      }
      if (this.transactionsCount != this.transactions.length) {
        return false;
      }
      if (this.blockHash != this.calculateHash) {
        return false;
      }
    }

    toString() {
      return JSON.stringify(this);
    }
  }

  module.exports = Block;
}());

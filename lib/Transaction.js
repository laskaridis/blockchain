"use strict";

(function() {

  const SHA256 = require('crypto-js/sha256');
  const crypto = require('crypto');

  class Transaction {

    constructor({ sender, receiver, timestamp = Date.now(), inputs = {}, outputs = {}, signature }) {
      this.sender = sender;
      this.receiver = receiver;
      this.timestamp = timestamp;
      this.inputs = inputs;
      this.outputs = outputs;
      this.transactionHash = this.calculateTransactionHash();
      this.signature = signature;
    }

    calculateTransactionHash() {
      return SHA256(this.sender + this.recipient + this.timestamp.toString() + JSON.stringify(this.data)).toString();
    }

    calculateTransactionHash() {
      return SHA256(this.sender + this.recipient + this.timestamp.toString() + JSON.stringify(this.data)).toString();
    }

    sign(privateKey) {
      const sign = crypto.createSign('SHA256');
      sign.update(this.hash);
      this.signature = sign.sign(privateKey, 'hex');
    }

    isWellFormed() {
      // TODO
    }

    isValid() {
      const verify = crypto.createVerify('SHA256');
      return verify.verify(this.recipient, this.signature);
    }
  }

  module.exports = Transaction;
}());

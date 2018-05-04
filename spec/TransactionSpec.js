const Transaction = require('../lib/Transaction.js');
const SHA256 = require('crypto-js/sha256');

describe("a transaction", function() {
  it("should calculate transaction hash", function() {
    // given
    const tx = new Transaction("SenderAddr", "ReceiverAddr", Date.now(), {});
    const expectedHash = SHA256(
        tx.sender +
        tx.recipient +
        tx.timestamp.toString() +
        JSON.stringify(tx.data)).toString();

    // then
    expect(tx.transactionHash).toBe(expectedHash);
    expect(tx.transactionHash).toBe(tx.calculateTransactionHash());
  });

  it("should be signed", function() {
  });

  it("should not be valid if signature is invalid", function() {
  });

  it("should be valid when signature is valid", function() {
  });
});

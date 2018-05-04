const Block = require('../lib/Block.js');
const Transaction = require('../lib/Transaction.js');
const SHA256 = require('crypto-js/sha256');

describe("a block", function() {

  it("should calculate it block hash", function() {
    // lib
    const block = new Block({
      height: 0,
      transactions: createTransactions(),
      previousBlockHash: "abc"
    });
    const expectedBlockHash = SHA256(
        block.height.toString() + 
        block.timestamp.toString() +
        block.transactionsCount.toString() +
        block.transactionsHash +
        block.previousBlockHash +
        block.nonce.toString()
    ).toString();

    // then
    expect(block.calculateHash()).toBe(block.blockHash);
    expect(expectedBlockHash).toBe(block.blockHash);
  });

  it("should calculate transactions hash", function() {
    // given
    const block = new Block({
      height: 0,
      transactions: createTransactions(),
      previousBlockHash: "abc"
    });
    const expectedTransactionsHash = SHA256(
        block.transactions.map(t => t.transactionHash).join('')
    ).toString();

    // then
    expect(expectedTransactionsHash).toBe(block.calculateTransactionsHash());
    expect(expectedTransactionsHash).toBe(block.transactionsHash);
  });

  function createTransactions() {
    return [
      new Transaction({
        sender: "SenderAddr",
        receiver: "ReceiverAddr",
        data: { data: 1 }
      }),
      new Transaction({
        sender: "SenderAddr",
        receiver: "ReceiverAddr",
        data: { data: 2 }
      })
    ];
  };
});

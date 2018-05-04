const
  BlockChain = require('../lib/BlockChain.js'),
  Transaction = require('../lib/Transaction.js'),
  Block = require('../lib/Block.js');
  MockStorage = require('./MockStorage.js');

describe("Block Chain", function() {

  const mockStorage = new MockStorage();

  let subject;

  beforeEach(function() {
    subject = new BlockChain({ difficulty: 0, storage: mockStorage });
  });

  describe("when not already initialized", function() {

    it("should not initialized", function() {
      expect(subject.isInitialized()).toBe(false);
    });

    it("should be initialized with a genesis block", function() {
      // when
      subject.init();

      // then
      const genesisBlock = subject.genesisBlock;
      expect(genesisBlock.previousBlockHash).toBe(0);
      expect(genesisBlock.transactions.length).toBe(0);
      expect(genesisBlock.transactionsCount).toBe(0);
      expect(genesisBlock.blockHash).toBe(genesisBlock.calculateHash());
      expect(genesisBlock).toBe(subject.lastBlock);
    });
  });

  describe("when already initialized", function() {
    beforeEach(function() {
      expect(subject.init()).toBe(true);
    });

    it("should be initialized", function() {
      expect(subject.isInitialized()).toBe(true);
    });

    it("should not be initialized again", function() {
      // given
      const genesisBlock = subject.genesisBlock;
      const lastBlock = subject.lastBlock;

      // when
      subject.init();

      // then
      expect(subject.lastBlock).toBe(lastBlock);
      expect(subject.genesisBlock).toBe(genesisBlock);
    });

    it("should add a pending transaction", function() {
      // given
      const aPendingTransaction = createTransaction();

      // when
      subject.addTransactions(aPendingTransaction);

      // then
      expect(subject.pendingTransactions.length).toBe(1);
      const pendingBlock = subject.pendingTransactions.shift();
      const expectedBlock = new Block({
        height: subject.lastBlock.height + 1,
        transactions: [ aPendingTransaction ]
      });
      expect(pendingBlock.height).toBe(expectedBlock.height);
      expect(pendingBlock.transactionsHash).toBe(expectedBlock.transactionsHash);
      expect(pendingBlock.blockHash).toBe(expectedBlock.blockHash);
      expect(pendingBlock.nonce).toBe(0);
      expect(pendingBlock.transactionsCount).toBe(1);
      expect(pendingBlock.previousBlockHash).toBe(0);
      expect(pendingBlock.timestamp).not.toBeUndefined();
    });
  });


  function createTransaction() {
    return new Transaction({
      sender: "aSender",
      receiver: "aReceiver",
    });
  }
});

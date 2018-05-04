"use strict";

(function() {

  const Block = require('./Block.js');
  const Miner = require('./Miner.js');
  const Storage = require('./Storage.js');

  class BlockChain {

    constructor({ difficulty = 2, storage = new Storage() } = {}) {
      this.difficulty = difficulty;
      this.pendingTransactions = [];
      this.storage = storage;
    }

    init() {
      if (this.genesisBlock === undefined) {
        this.genesisBlock = new Block();
        this.addBlock(this.genesisBlock);
        return true;
      }

      return false;
    }

    isInitialized() {
      return this.genesisBlock !== undefined;
    }

    addTransactions(...transactions) {
      if (transactions.length === 0) return

      this.pendingTransactions.push(new Block({
        height: this.lastBlock.height + 1,
        transactions: transactions
      }));
    }

    addBlock(block) {
      this.storage.put(block);
      this.lastBlock = block;
    }

    isValid() {
      let currentBlock = this.lastBlock;

      while (currentBlock.previousBlockHash !== 0) {
        let previousBlock = storage.get(currentBlock.previousBlockHash);

        if (!currentBlock.isValid()) {
          return false;
        }
        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }

      return true;
    }

    toString() {
      return JSON.stringify(this, null, 2);
    }
  }

  module.exports = BlockChain;
}());

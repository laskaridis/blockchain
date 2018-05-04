"use strict";

(function() {

  class Miner {

    constructor(blockchain) {
      this.blockchain = blockchain;
    }

    start() {
      this.blockchain.pendingTransactions.forEach(t => this.mine(t));
      this.blockchain.pendingTransactions = [];
    }

    mine(block) {
      const lastBlock = this.blockchain.lastBlock;
      block.previousHash = lastBlock.blockHash;
      block.height = lastBlock.height + 1;
      block.blockHash = block.calculateHash();

      while (!this.haveSolvedHash(block.blockHash)) {
        block.nonce++;
        block.blockHash = block.calculateHash();
      }

      console.log("Block mined: " + block.blockHash);
      this.blockchain.addBlock(block);
    }

    haveSolvedHash(hash) {
      const prefix = Array(this.blockchain.difficulty + 1).join("0");
      return hash.substring(0, this.blockchain.difficulty) === prefix;
    }
  }

  module.exports = Miner;
}());

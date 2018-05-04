"use strict";

(function() {

  const 
    Transaction = require('./Transaction.js'),
    Block = require('./Block.js'),
    fs = require('fs'),
    path = require('path'),
    snappy = require('snappy');

  class Storage {

    constructor(dataDir = '.data') {
      this.dataDir = dataDir;
      this.blocksDir = this.dataDir + path.sep + 'blocks';
      this.pendingDir = this.dataDir + path.sep + 'pending';

      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir);
        fs.mkdirSync(this.blocksDir);
        fs.mkdirSync(this.pendingDir);
      }
    }

    put(block) {
      const fileBucketPath = this.calculateFileBucketPath(block.blockHash);
      if (!fs.existsSync(fileBucketPath)) {
        fs.mkdirSync(fileBucketPath);
      }

      fs.writeFileSync(this.calculateFilePath(block.blockHash), this.compress(block.toString()));
    }

    calculateFileBucketName(blockHash) {
      return blockHash.substring(0, 2);
    }

    calculateFileBucketPath(blockHash) {
      return this.blocksDir + path.sep + this.calculateFileBucketName(blockHash);
    }

    calculateFileName(blockHash) {
      return blockHash.substring(2, blockHash.length + 1);
    }

    calculateFilePath(blockHash) {
      return this.calculateFileBucketPath(blockHash) + path.sep + this.calculateFileName(blockHash);
    }

    compress(block) {
      return snappy.compressSync(block);
    }

    uncompress(block) {
      return snappy.uncompressSync(block);
    }

    get(hash) {
      const
        filePath = this.calculateFilePath(hash),
        blockData = this.uncompress(JSON.parse(fs.readFileSync(filePath))),
        block = new Block(blockData);

      block.transactions = blockHash.transactions.map(t => new Transaction(t));
      return block;
    };
  }

  module.exports = Storage;
}());

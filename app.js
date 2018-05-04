"use strict";

(function(global) {
  // imports
  const
    BlockChain = require('./lib/BlockChain.js'),
    Storage = require('./lib/Storage.js'),
    Miner = require('./lib/Miner.js'),
    Transaction = require('./lib/Transaction.js'),
    Principal = require('./lib/Principal.js');

  const
    g = global,
    p1 = new Principal(),
    p2 = new Principal(),
    storage = new Storage(),
    blockchain = new BlockChain(),
    miner = new Miner(blockchain),
    t1 = createTransaction(p1, p2, 12.1),
    t2 = createTransaction(p1, p2, 2.0),
    t3 = createTransaction(p1, p2, 1.2),
    t4 =  createTransaction(p2, p1, 4.1);

  blockchain.init();
  blockchain.addTransactions(t1, t2);
  blockchain.addTransactions(t3);
  blockchain.addTransactions(t4);
  miner.start();
  
  function createTransaction(from, to, amount) {
    return new Transaction({
      sender: from.publicKey,
      receiver: to.publicKey,
      data: { amount: amount }
    });
  }
}(global));


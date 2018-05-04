"use strict";

(function() {

  const crypto = require('crypto');

  class Principal {
    
    constructor() {
      let diffieHellman = crypto.createDiffieHellman(256);
      diffieHellman.generateKeys('base64');
      this.publicKey = diffieHellman.getPublicKey('base64');
      this.privateKey = diffieHellman.getPrivateKey('base64');
    }
  }

  module.exports = Principal;
}());

// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */

import multisign2_artifacts from '../../build/contracts/Multisign2.json'

var Multisign2 = contract(multisign2_artifacts);

//let candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}


window.getAccountList = function (prodHashGetAccounts) {
  // body...
  try {

    let prodHashAccount = $("#prodHashGetAccounts").val();

    Multisign2.deployed().then(function(contractInstance) {
       contractInstance.getAddress.call(prodHashAccount).then(function(v) {
          var content = "<table>"
          for(var i=0; i<v.length; i++)
          {
            content += '<tr><td>' + v[i].toString()+ '</td></tr>';
          }
          content += "</table>"

          $('#accountlist').append(content);


        //  $("#accountlist" ).html(v.toString());
        });
    });
  }catch (err) {
    
  console.log(err);
  }

}

window.saveProductHash = function(prodHash) {
  let prodHashName = $("#prodHash").val();
  var account_number = document.getElementById("mySelect").selectedIndex;

  try {
    $("#msg").html("Product hash has been submitted. The record will be updated as soon as it is saved on the blockchain. Please wait.")
    $("#prodHash").val("");
   

    /* Multisign.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Multisign2.deployed().then(function(contractInstance) {
      console.log(prodHashName)
      console.log(account_number)
      contractInstance.saveAddress(prodHashName, {gas: 600000,from: web3.eth.accounts[account_number]}).then(function() {
        $("#diamond-1" ).html(prodHashName.toString());

        return contractInstance.getAddress.call(prodHashName).then(function(v) {
          console.log("I am after getAddress function call")
          $("#account-1" ).html(v[v.length-1].toString());
          $("#msg").html("");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  Multisign2.setProvider(web3.currentProvider);

});










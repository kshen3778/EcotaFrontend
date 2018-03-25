<template>
  <div class="hello">

    <ul v-for="article in work">
      <div v-if="article.title">
        <h2>Title: {{article.title}}</h2>

        <div v-if="stakedArticles[article.id] == true">
          <h2>Link: {{article.link}}</h2>
          <h2>Requirements: <br> <h3>{{article.requirements}}</h3></h2>
          <button v-on:click="submit(article.id, true)">Approve</button>
          <button v-on:click="submit(article.id, false)">Reject</button>
        </div>

          <br>
          <button v-if="!stakedArticles[article.id]" v-on:click="stake(article.id)">Check this Article</button>
        <br>
        <br>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import web3 from 'Web3'
import firebase from 'firebase'
export default {

  name: 'HelloWorld',
  data () {
    return {
      contract: {},
      work: [],
      stakedArticles: {},
      response: "",
    }
  },

  created() {
      this.getData();
  },

  methods: {
      submit: function(id, accepted){
        //Send to SC
        const ethereumUri = 'http://127.0.0.1:7545';   // 8540, 8545, 8180

        let web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

        if (!web3.isConnected()) {
          return 'Unable to connect to ethereum node at ' + ethereumUri
        } else {
          let accounts = web3.eth.accounts;

          web3.eth.defaultAccount = web3.eth.accounts[0];
          var CoursetroContract = web3.eth.contract(

            [
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "currentState",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint8"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [],
  		"name": "getBalance",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "",
  				"type": "address"
  			}
  		],
  		"name": "balances",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [],
  		"name": "addAddressAndStake",
  		"outputs": [],
  		"payable": true,
  		"stateMutability": "payable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_decision",
  				"type": "bool"
  			}
  		],
  		"name": "voting",
  		"outputs": [],
  		"payable": true,
  		"stateMutability": "payable",
  		"type": "function"
  	},
  	{
  		"payable": true,
  		"stateMutability": "payable",
  		"type": "fallback"
  	}
  ]

          );

          var contractAddress = '0x66078a97def9d40b2ca7abb44733dd897ec6231d';
          var Coursetro = CoursetroContract.at(contractAddress);
          console.log(Coursetro);
          this.contract = Coursetro;

          Coursetro.voting.sendTransaction(accepted, {
            from: web3.eth.accounts[1],
            to: contractAddress,
            gas: 900000});
        }
      },

      alreadyStaked: function(id){
        var obj = this;

        const ethereumUri = 'http://127.0.0.1:7545'   // 8540, 8545, 8180

        let web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

        var ref = firebase.database().ref("articles/"+id+"/stakers/");

        console.log("id: " + id);
        ref.once('value', function(snapshot) {
          console.log(snapshot.val());
          if (snapshot.hasChild(web3.eth.accounts[0])) {
            console.log("true");
            obj.stakedArticles[id] = true;
            console.log(obj.stakedArticles[id]);
            //return true;
          }else{
            console.log("false");
            obj.stakedArticles[id] = false;
          }
          //return false;
        });
      },

      getData: function (){
        var obj = this;

        firebase.database().ref("articles/").on("value", function(snapshot) {
          console.log(snapshot.val());
          obj.work = snapshot.val();
          console.log(obj.work);
          for(var item in snapshot.val()){
            console.log(item);
            obj.alreadyStaked(item);
            console.log(obj.stakedArticles[item]);
          }
          console.log(obj.stakedArticles);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });


      },
      stake: function (id) {


        const ethereumUri = 'http://127.0.0.1:7545'   // 8540, 8545, 8180

        let web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri))

        if (!web3.isConnected()) {
          return 'Unable to connect to ethereum node at ' + ethereumUri
        } else {
          let accounts = web3.eth.accounts;

          web3.eth.defaultAccount = web3.eth.accounts[0];
          var CoursetroContract = web3.eth.contract(

            [
	{
		"constant": false,
		"inputs": [],
		"name": "addAddressAndStake",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

);
          var contractAddress = '0x1cff61b8259f05f4bbf7aa4f769321e5fa70b22d';
          var Coursetro = CoursetroContract.at(contractAddress);
          console.log(Coursetro);
          this.contract = Coursetro;

          Coursetro.addAddressAndStake.sendTransaction({
            from: web3.eth.accounts[0],
            to: contractAddress,
            value: web3.toWei(0.02, "ether"),
            gas: 900000});

          var myRef = firebase.database().ref('articles/'+id+'/stakers/'+web3.eth.accounts[0]).set({
                address: web3.eth.accounts[0]
            });

            this.getData();

          console.log("hi");
          console.log(Coursetro.getBalance());
        }

      }
  }
}

</script>

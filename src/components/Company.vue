<template>
  <div>

    <h1> Create an Article Job</h1>

    <br>

    <h2> Define Requirements: </h2>
    <br>
    <textarea v-model="requirements" placeholder=""></textarea>
    <br>
    <button v-on:click="createJob()">Submit Job</button>

  </div>

</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
export default {

  name: 'Company',
  data () {
    return {
      requirements: ""
    }
  },

  created() {

  },

  methods: {

    createJob() {
      //firebase.initializeApp(this.config);
      console.log("creating job");
      var newData = {
        companyname: "Blockchain Co.",
        requirements: this.requirements,
        link: "",
        title: ""
      };
      var myRef = firebase.database().ref('articles/').push(newData);
      var key = myRef.getKey();

      firebase.database().ref('articles/' + key).update({
        id: key
      });
      
    }

  }
}

</script>

<template>
  <div>

    <ul v-for="article in jobs">
      <div v-if="!article.name">
        <h3>Company: {{article.companyname}}</h3>
        <br>
        <h3>Requirements: <br> {{article.requirements}}</h3>
        <br>
        <h3> Link to Finished Article: </h3> <input v-model="article.link" type="text"></input>
        <h3> Article Title: </h3> <input v-model="article.title" type="text"></input>
        <button v-on:click="done(article.id, article.link, article.title)">Submit for Checking</button>
      </div>
      <br>
      <br>
      <br>
    </ul>
  </div>

</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
export default {

  name: 'Contractor',
  data () {
    return {
      jobs: []
    }
  },

  created() {
    this.getData();
  },

  methods: {
    getData: function(){
      var obj = this;

      firebase.database().ref("articles/").on("value", function(snapshot) {
        console.log(snapshot.val());
        obj.jobs = snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },
    done: function(id, link, title){
      firebase.database().ref('articles/'+id).update({
        link: link,
        title: title
      });

      //submit to validators for checking
    }


  }
}

</script>

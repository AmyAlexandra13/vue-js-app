<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge btn-secondary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      Unpublish
    </button>

    <button
      v-else
      class="badge btn-success"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge btn-danger mr-2" @click="confirmation">
      Delete
    </button>

    <button type="submit" class="badge btn-primary" @click="updateTutorial">
      Update
    </button>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Click on a tutorial...</p>
  </div>
</template>


<script>
import TutorialDataService from "../services/TutorialDataService";
//const Swal = require('sweetalert2')


export default {
  name: "tutorial",
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },

  methods:{
    getTutorial(id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response) => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      var data = {
         title: this.currentTutorial.title,
        description: this.currentTutorial.description
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response) => {
          console.log(response.data);
          this.$fire({
  text: "The tutorial has been updated!",
  type: "info",
  timer: 3000
}).then(r => {
 console.log(r.value);
   this.$router.push({name: "tutorials"})
});
       
          

        })
        .catch((e) => {
          console.log(e);
        });
    },

confirmation(){
this.$confirm("Are you sure you want to delete this tutorial?", "Warning", "warning").then(() => {
 this.deleteTutorial();
});

},
    deleteTutorial() {
TutorialDataService.delete(this.currentTutorial.id)
.then((response) => {
console.log(response.data);
 this.$fire({
  text: "The tutorial has been deleted!",
  type: "error",
  timer: 3000
}).then(r => {
 console.log(r.value);
});
this.$router.push({ name: "tutorials" });
})
.catch((e) => {
console.log(e);
});

},
  },

mounted() {
this.message = "";
this.getTutorial(this.$route.params.id);
},
};
            
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
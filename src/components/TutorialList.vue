<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title"
                v-model="title">

                <div class="input-group-append">
                    

                        <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
                            Search</button>
        </div>
    </div>
        </div>
    







        <div class="col-md-6">
            <h4>Tutorials list </h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{active: index == currentIndex }"
                    v-for="(tutorial, index) in tutorials"
                    :key="index"
                    @click="setActiveTutorial(tutorial, index)">
            {{tutorial.title}}
                </li> 
            </ul>


            <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
                Remove all
            </button>
        </div>

        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Tutorial</h4>

           
       
            <div>
            <label><strong>Title:</strong></label> {{currentTutorial.title}}
        </div>
        
            <div>
                <label><strong>Description: </strong> </label> {{currentTutorial.description}}
            </div>

             <div>
                <label><strong>Status: </strong> </label> {{ currentTutorial.published ? "Published" : "Pending"  }}
            </div>


            <!-- <a class="m-3 btn btn-sm btn-success"
            href="/tutorials/ + currentTutorial.id'">
            Edit
            </a>  -->

            <router-link class="m-3 btn btn-sm btn-warning" :to="'/tutorials/' + currentTutorial.id">Edit</router-link>

            </div>

            <div v-else>
                <br />
                <p> Please click on a tutorial </p>
        </div>
        </div>
        </div>
  
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    };
  },

  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      this.$confirm("Are you sure you want to delete all the tutorials?", "Warning", "warning").then(() => {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
           this.$fire({
  text: "All the tutorial has been deleted!",
  type: "error",
  timer: 3000
}).then(r => {
 console.log(r.value);
});
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
      });
    },

    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrieveTutorials();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>



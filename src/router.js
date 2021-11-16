import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: 
    [
       
        {
            path: "/tutorials",
            name: "tutorials",
            component: () => import("./components/TutorialList")
        },

        {
        path: "/tutorials/:id",
        alias: "tutorial-details",
        component: () => import("./components/Tutorial")
        },

        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddTutorial2")
        }
    ]
});
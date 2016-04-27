import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.route("peer-feedback", function(){
      this.route("cohort", {path: "/cohorts/:id"}, function(){
          this.route("instructor", {path: "/instructors/:id"}, function(){
              this.route("lesson-feedback", {path: "/lesson-feedback/:id"});
          });
      });
  });
});

export default Router;

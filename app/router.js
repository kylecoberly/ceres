import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function(){
	this.route("mastery-metrics");
	this.route("job-metrics");
	this.route("tools");
	this.route("mission");
	this.route("schedules");
});

export default Router;

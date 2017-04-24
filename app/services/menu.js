import Ember from "ember";

export default Ember.Service.extend({
	menuItems: [{
		label: "Home",
		link: "index"
	},{
		label: "Job Metrics",
		link: "job-metrics"
	},{
		label: "Mastery Metrics",
		link: "mastery-metrics"
	},{
		label: "Schedules",
		link: "schedules"
	},{
		label: "Mission & Values",
		link: "mission"
	},{
		label: "Tools",
		link: "tools"
	}]
});

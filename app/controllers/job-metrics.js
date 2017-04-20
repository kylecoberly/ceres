import Ember from "ember";

export default Ember.Controller.extend({
	cohortSorting: ["firstDay"],
	sortedCohorts: Ember.computed.sort("model", "cohortSorting")
});

import {Model, belongsTo, hasMany} from "ember-cli-mirage";

export default Model.extend({
	cohort: belongsTo("cohort"),
	performances: hasMany("performance")
});

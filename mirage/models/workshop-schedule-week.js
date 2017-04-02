import {Model, hasMany} from "ember-cli-mirage";

export default Model.extend({
	workshopScheduleDays: hasMany("workshopScheduleDays")
});

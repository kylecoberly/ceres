import DS from "ember-data";

export default DS.Model.extend({
	label: DS.attr(),
	days: DS.hasMany("workshopScheduleDay", {async: true})
});

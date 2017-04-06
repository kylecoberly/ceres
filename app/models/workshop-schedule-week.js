import DS from "ember-data";

export default DS.Model.extend({
	label: DS.attr(),
	workshopScheduleDays: DS.hasMany("workshopScheduleDay", {async: true})
});

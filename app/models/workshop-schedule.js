import DS from "ember-data";

export default DS.Model.extend({
	workshopName: DS.attr(),
	weeks: DS.hasMany("workshopScheduleWeek", {async: true})
});

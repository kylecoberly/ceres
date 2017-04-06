import DS from "ember-data";

export default DS.Model.extend({
	workshopName: DS.attr(),
	workshopScheduleWeeks: DS.hasMany("workshopScheduleWeek", {async: true})
});

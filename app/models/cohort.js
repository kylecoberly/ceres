import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	label: DS.attr(),
	firstDay: DS.attr("date"),
	lastDay: DS.attr("date"),
	students: DS.hasMany("student", {async: true}),
	medianDaysToHire: Ember.computed("lastDay", "students.@each.hireDate", function(){
		var hireDates = this.get("students")
			.filterBy("hireDate")
			.mapBy("hireDate")
			.toArray()
			.sort();
		var medianHireDate = hireDates[Math.floor(hireDates.length / 2)];
		return (new Date(medianHireDate) - new Date(this.get("lastDay"))) / (1000 * 60 * 60 * 24);
	}),
	totalHired: Ember.computed("students.@each.isHired", function(){
		return this.get("students").reduce((previous, current) => {
			return current.get("isHired") ? previous += 1 : previous;
		}, 0);
	}),
	studentCount: Ember.computed("students.@each", function(){
		return this.get("students.length");
	})
});

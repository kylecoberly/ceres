import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	label: DS.attr(),
	firstDay: DS.attr("date"),
	lastDay: DS.attr("date"),
	hiringDeadline: DS.attr("date"),
	isActive: DS.attr("boolean"),
	students: DS.hasMany("student", {async: true}),
	deadlinePassed: Ember.computed("today", "daysToHiringDeadline", function(){
		return this.get("daysToHiringDeadline") < 0;
	}),
	today: Ember.computed(function(){
		return new Date();
	}),
	daysToHiringDeadline: Ember.computed("today", "hiringDeadline", function(){
		return Math.floor(
			(new Date(this.get("hiringDeadline")) - new Date(this.get("today"))) / (1000 * 60 * 60 * 24)
		);
	}),
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
	}),
	cohortComplete: Ember.computed("today", "lastDay", function(){
		return this.get("lastDay") < this.get("today");
	})
});

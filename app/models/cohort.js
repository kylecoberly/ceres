import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	label: DS.attr(),
	firstDay: DS.attr("date"),
	lastDay: DS.attr("date"),
	hiringDeadline: DS.attr("date"),
	isActive: DS.attr("boolean"),
	students: DS.hasMany("student", {async: true}),
	time: Ember.inject.service("time"),
	studentCount: Ember.computed("students.@each", function(){
		return this.get("students.length");
	}),
	medianDaysToHire: Ember.computed("lastDay", "students.@each.hireDate", function(){
		var hireDates = this.get("students")
			.filterBy("hireDate")
			.mapBy("hireDate")
			.toArray()
			.sort();
		var medianHireDate = hireDates[Math.floor(hireDates.length / 2)];
		return this.dayDifference(medianHireDate, this.get("lastDay"));
	}),
	totalHired: Ember.computed("students.@each.isHired", function(){
		return this.get("students").reduce((previous, current) => {
			return current.get("isHired") ? previous += 1 : previous;
		}, 0);
	}),
	deadlinePassed: Ember.computed("time.today", "daysToHiringDeadline", function(){
		return this.get("daysToHiringDeadline") < 0;
	}),
	cohortComplete: Ember.computed("time.today", "lastDay", function(){
		return this.get("lastDay") < this.get("time.today");
	}),
	totalDays: Ember.computed("firstDay", "lastDay", function(){
		return this.dayDifference(this.get("lastDay"), this.get("firstDay"));
	}),
	daysToHiringDeadline: Ember.computed("time.today", "hiringDeadline", function(){
		return this.dayDifference(this.get("hiringDeadline"), this.get("time.today"));
	}),
	daysElapsed: Ember.computed("firstDay", "time.today", function(){
		return this.dayDifference(this.get("time.today"), this.get("firstDay"));
	}),
	daysRemaining: Ember.computed("lastDay", "time.today", function(){
		return this.dayDifference(this.get("lastDay"), this.get("time.today"));
	}),
	proportionElapsed: Ember.computed("daysElapsed", "totalDays", function(){
		return Math.floor((this.get("daysElapsed") / this.get("totalDays")) * 100);
	}),
	percentageElapsed: Ember.computed("proportionElapsed", function(){
		return `${this.get("proportionElapsed")}%`;
	}),
	dayDifference(laterDay, earlierDay){
		return Math.floor((new Date(laterDay) - new Date(earlierDay)) / (1000 * 60 * 60 * 24));
	}
	// scores: Ember.computed("students.@each.performances.@each", function(){
	// 	// return this.get("students").reduce((accumulator, student) => {
	// 	// 	student.get("performances").forEach(performance => {
	// 	// 		// Look up score, add to thing, update proportion
	// 	// 	});
	// 	// }, []);
	// 	return [{
	// 		label: "0",
	// 		proportion: 0.25,
	// 		percentage: "25%"
	// 	},{
	// 		label: "1",
	// 		proportion: 0.25,
	// 		percentage: "25%"
	// 	},{
	// 		label: "2",
	// 		proportion: 0.25,
	// 		percentage: "25%"
	// 	},{
	// 		label: "3",
	// 		proportion: 0.25,
	// 		percentage: "25%"
	// 	}];
	// }),
});

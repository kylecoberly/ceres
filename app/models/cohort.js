import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	label: DS.attr(),
	firstDay: DS.attr("date"),
	lastDay: DS.attr("date"),
	hiringDeadline: DS.attr("date"),
	isActive: DS.attr("boolean"),
	logoNumber: DS.attr(),
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
		var elapsed = (this.get("daysElapsed") / this.get("totalDays"));
		return (elapsed > 1) ? 1 : elapsed;
	}),
	percentageElapsed: Ember.computed("proportionElapsed", function(){
		return `${Math.floor(this.get("proportionElapsed") * 100)}%`;
	}),
	dayDifference(laterDay, earlierDay){
		return Math.floor((new Date(laterDay) - new Date(earlierDay)) / (1000 * 60 * 60 * 24));
	},
	performances: Ember.computed("students.@each.performances", function(){
		return this.get("students").reduce((performances, student) => {
			student.get("performances").forEach(performance => {
				performances.push({
					studentId: student.get("id"),
					score: performance.get("score")
				});
			});
			return performances;
		}, []);
	}),
	scores: Ember.computed("performances.@each.score", function(){
		var totalScoreCount = 0;
		return this.get("performances").reduce((scores, performance) => {
			totalScoreCount++;
			let score = scores.findBy("label", performance.score);
			if (!score){
				scores.push({
					label: performance.score,
					count: 0
				});
				score = scores.findBy("label", performance.score);
			}
			score.count++;
			return scores;
		}, new Ember.A()).map(score => {
			score.proportion = score.count / totalScoreCount;
			score.percentage = `${Math.floor(score.proportion * 100)}%`;
			return score;
		}).sortBy("label");
	}),
	logoUrl: Ember.computed("logoNumber", function(){
		return `https://badge.galvanize.network/${this.get("logoNumber")}.png`;
	})
});

import Ember from "ember";
import DS from "ember-data";
import cohortTime from "../mixins/cohort-time-utilities";

export default DS.Model.extend(cohortTime, {
	label: DS.attr(),
	firstDay: DS.attr("date"),
	lastDay: DS.attr("date"),
	hiringDeadline: DS.attr("date"),
	isActive: DS.attr("boolean"),
	logoNumber: DS.attr(),
	students: DS.hasMany("student", {async: true}),
	studentCount: Ember.computed("students.@each", function(){
		return this.get("students.length");
	}),
	logoUrl: Ember.computed("logoNumber", function(){
		return `https://badge.galvanize.network/${this.get("logoNumber")}.png`;
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
			score.style = Ember.String.htmlSafe(`flex-grow: ${Math.floor(score.proportion * 100)};`);
			return score;
		}).sortBy("label");
	})
});

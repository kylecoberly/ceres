import Ember from "ember";

export default Ember.Mixin.create({
	time: Ember.inject.service("time"),
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
	}
});

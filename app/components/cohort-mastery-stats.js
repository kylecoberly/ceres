import Ember from "ember";

export default Ember.Component.extend({
	classNames: ["cohort-mastery-stats"],
	sortedScores: Ember.computed.map("cohort.scores", function(score){
		score.style = Ember.String.htmlSafe(`flex-grow: ${Math.floor(score.proportion * 100)}`);
		return score;
	}),
	timeElapsedStyle: Ember.computed("cohort.daysElapsed", function(){
		return Ember.String.htmlSafe(`flex-grow: ${this.get("cohort.daysElapsed")}`);
	}),
	timeRemainingStyle: Ember.computed("cohort.daysRemaining", function(){
		return Ember.String.htmlSafe(`flex-grow: ${this.get("cohort.daysRemaining")}`);
	})
});

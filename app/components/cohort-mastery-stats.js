import Ember from "ember";

export default Ember.Component.extend({
	classNames: ["cohort-mastery-stats"],
	timeElapsedStyle: Ember.computed("cohort.daysElapsed", function(){
		return Ember.String.htmlSafe(`flex-grow: ${this.get("cohort.daysElapsed")}`);
	}),
	timeRemainingStyle: Ember.computed("cohort.daysRemaining", function(){
		return Ember.String.htmlSafe(`flex-grow: ${this.get("cohort.daysRemaining")}`);
	})
});

import Ember from "ember";

export default Ember.Component.extend({
	classNames: ["progress-bar"],
	progressPercentage: Ember.computed("value", "max", function(){
		return `${((this.get("value") / this.get("max")) * 100).toFixed(0)}%`;
	}),
	progressPercentageStyle: Ember.computed("progressPercentage", function(){
		return Ember.String.htmlSafe(`width: ${this.get("progressPercentage")}`);
	}),
	remaining: Ember.computed("value", "max", function(){
		return `${this.get("max") - this.get("value")}`;
	})
});

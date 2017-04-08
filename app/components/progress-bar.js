import Ember from "ember";

export default Ember.Component.extend({
	classNames: ["progress-bar"],
	attributeBindings: ["style"],
	progressPercentage: Ember.computed("value", "max", function(){
		return `${((this.get("value") / this.get("max")) * 100).toFixed(0)}%`;
	}),
	remaining: Ember.computed("value", "max", function(){
		return `${this.get("max") - this.get("value")}`;
	})
});

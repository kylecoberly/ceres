import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	firstName: DS.attr(),
	lastName: DS.attr(),
	fullName: Ember.computed("firstName", "lastName", function(){
		return `${this.get("firstName")} ${this.get("lastName")}`;
	}),
	isHired: Ember.computed("hireDate", function(){
		return !!this.get("hireDate");
	}),
	hireDate: DS.attr("date"),
	performances: DS.hasMany("performance")
});

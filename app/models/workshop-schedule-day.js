import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	date: DS.attr("date"),
	instructor: DS.belongsTo("instructor", {async: true}),
	formattedDate: Ember.computed("date", function(){
		var date = this.get("date");
		if (!date) return;
		return `${date.getMonth() + 1}/${date.getDate()}`;
	})
});

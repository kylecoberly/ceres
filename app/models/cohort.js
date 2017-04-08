import DS from "ember-data";

export default DS.Model.extend({
	label: DS.attr(),
	medianDaysToHire: DS.attr("number"),
	studentCount: DS.attr("number"),
	totalHired: DS.attr("number")
});

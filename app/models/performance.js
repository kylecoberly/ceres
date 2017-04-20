import DS from "ember-data";

export default DS.Model.extend({
	score: DS.attr(),
	standard: DS.belongsTo("standard", {async: true})
});

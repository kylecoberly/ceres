import Ember from "ember";

export default Ember.Service.extend({
	today: Ember.computed(function(){
		return new Date();
	})
});

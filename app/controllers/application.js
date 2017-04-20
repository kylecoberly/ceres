import Ember from "ember";

export default Ember.Controller.extend({
	menu: Ember.inject.service(),
	menuItems: Ember.computed("menu", function(){
		return this.get("menu.menuItems");
	})
});

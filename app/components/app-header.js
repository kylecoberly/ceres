import Ember from "ember";

export default Ember.Component.extend({
	tagName: "header",
	classNames: ["app-header"],
	classNameBindings: ["mobileHeader"],
	mobileHeader: Ember.computed.alias("media.isMobile")
});

import Ember from 'ember';

export default Ember.Route.extend({
    breadCrumb: {},
    model(parameters){
        return this.store.findRecord("lessonFeedback", parameters.id);
    },
    afterModel(model){
        this.set("breadCrumb", {
            title: model.get("title")
        });
    }
});

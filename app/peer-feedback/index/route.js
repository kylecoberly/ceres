import Ember from 'ember';

export default Ember.Route.extend({
    breadCrumb: {
        title: "Peer Feedback"
    },
    model(){
        return this.store.findAll("cohort");
    }
});

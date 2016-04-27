import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("cohort-list", "Integration | Component | cohort list", {
    integration: true,
    beforeEach(){
        this.cohorts = [{
            id: 1
        },{
            id: 2
        },{
            id: 3
        }];
    }
});

test("it renders a list of cohorts", function(assert){
    this.render(hbs`{{cohort-list cohorts=cohorts}}`);

    assert.equal(this.$("ul.cohorts li").length, 3);
});

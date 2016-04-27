import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("instructor-list", "Integration | Component | instructor list", {
    integration: true,
    beforeEach(){
        this.instructors = [{
            id: 1
        },{
            id: 2
        },{
            id: 3
        }];
    }
});

test("it shows a list of instructors", function(assert){
    this.render(hbs`{{instructor-list instructors=instructors}}`);

    assert.equal(this.$(".instructors li").length, "3");
});

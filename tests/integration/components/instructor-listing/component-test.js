import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("instructor-listing", "Integration | Component | instructor listing", {
    integration: true,
    beforeEach(){
        this.instructor = {
            id: 1,
            name: "Danny Fritz"
        };
    }
});

test("it shows the instructor name", function(assert){
    this.render(hbs`{{instructor-listing instructor=instructor}}`);

    assert.equal(this.$("li").text(), "Danny Fritz");
});

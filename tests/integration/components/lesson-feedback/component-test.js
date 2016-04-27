import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("lesson-feedback", "Integration | Component | lesson feedback", {
    integration: true,
    beforeEach(){
        this.lessonFeedback = {
            id: 1,
            title: "Good Lesson"
        };
    }
});

test("it shows the title of the feedback", function(assert){
    this.render(hbs`{{lesson-feedback lessonFeedback=lessonFeedback}}`);

    assert.equal(this.$().text().trim(), "Good Lesson", "Title matches");
});

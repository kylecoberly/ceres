import {test} from "qunit";
import moduleForAcceptance from "ceres/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | peer feedback navigation", {
    beforeEach(){
        var lessonFeedback = server.create("lesson-feedback", {
            title: "Introduction to JavaScript: Part 2",
        });
        var instructor = server.create("instructor", {
            name: "Danny Fritz",
            lessonFeedbacks: [lessonFeedback.id]
        });
        server.create("cohort", {
            name: "g15",
            instructors: [instructor.id]
        });
    }
});

test("Can navigate peer feedback", function(assert){
    visit("/");

    andThen(function(){
        var peerFeedbackLink = find("a.peer-feedback-link");
        assert.equal(peerFeedbackLink.text(), "Peer Feedback", "Peer feedback link text matches");
        click(peerFeedbackLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/peer-feedback", "/peer-feedback URL matches");
        var cohortLink = find("a.cohort-link");
        assert.equal(cohortLink.text(), "g15", "g15 Link text matches");
        click(cohortLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/peer-feedback/cohorts/1", "/peer-feedback/cohorts/1 URL matches");
        var instructorLink = find("a.instructor-link");
        assert.equal(instructorLink.text(), "Danny Fritz", "Danny Fritz link text matches");
        click(instructorLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/peer-feedback/cohorts/1/instructors/1", "/peer-feedback/cohorts/1/instructors/1 URL matches");
        var reviewLink = find("a.lesson-review-link:first");
        assert.equal(reviewLink.text(), "Introduction to JavaScript: Part 2", "review link text matches");
        click(reviewLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/peer-feedback/cohorts/1/instructors/1/lesson-feedback/1", "/peer-feedback/cohorts/1/instructors/1/lesson-feedback/1 URL matches");
        var instructorLink = find(".breadcrumb li:nth-last-child(2) a");
        assert.equal(instructorLink.text().trim(), "Danny Fritz", "instructor link bread crumb text matches");
        click(instructorLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/peer-feedback/cohorts/1/instructors/1", "breadcrumb /peer-feedback/cohorts/1/instructors1 URL matches");
        var cohortLink = find(".breadcrumb li:nth-last-child(2) a");
        assert.equal(cohortLink.text().trim(), "g15", "cohort link bread crumb text matches");
        click(cohortLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/peer-feedback/cohorts/1", "breadcrumb /peer-feedback/cohorts/1 URL matches");
        var peerReviewLink = find(".breadcrumb li:nth-last-child(2) a");
        assert.equal(peerReviewLink.text().trim(), "Peer Feedback", "Peer Feedback link bread crumb text matches");
        click(peerReviewLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/peer-feedback", "breadcrumb /peer-feedback URL matches");
        var homeLink = find("h1 a");
        assert.equal(homeLink.text().trim(), "Ceres", "Home link text matches");
        click(homeLink);
    });

    andThen(function(){
        assert.equal(currentURL(), "/", "home url matches");
    });
});

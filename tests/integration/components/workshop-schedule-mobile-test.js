import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import workshopScheduleMobile from "../../pages/components/workshop-schedule-mobile";

moduleForComponent("workshop-schedule-mobile", "Integration | Component | workshop schedule mobile", {
	integration: true,
	beforeEach(){
		workshopScheduleMobile.setContext(this);
	},
	afterEach(){
		workshopScheduleMobile.removeContext();
	}
});

test("it shows data", function(assert){
	this.set("model", {
		workshopName: "JS",
		workshopScheduleWeeks: [{
			label: "Week 1",
			workshopScheduleDays: [{
				formattedDate: "3/15",
				instructor: {
					firstName: "Kyle"
				}
			}]
		}]
	});
	workshopScheduleMobile.render(hbs`{{workshop-schedule-mobile model=model}}`);

	assert.equal(workshopScheduleMobile.name, "JS");
	assert.equal(workshopScheduleMobile.weekLabel, "Week 1");
	assert.equal(workshopScheduleMobile.date, "3/15");
	assert.equal(workshopScheduleMobile.instructor, "Kyle");
});

import Ember from "ember";

export default Ember.Controller.extend({
	workshopSchedule: [{
		label: "Week 1",
		days: [{
			date: "3/14",
			instructor: "Berto"
		},{
			date: "3/16",
			instructor: "Berto"
		}]
	},{
		label: "Week 2",
		days: [{
			date: "3/21",
			instructor: "Danny"
		},{
			date: "3/23",
			instructor: "Isaac"
		}]
	},{
		label: "Week 3",
		days: [{
			date: "3/28",
			instructor: "Peter"
		},{
			date: "3/30",
			instructor: "Peter"
		}]
	},{
		label: "Week 4",
		days: [{
			date: "4/4",
			instructor: "Peter"
		},{
			date: "4/6",
			instructor: "Peter"
		}]
	},{
		label: "Week 5",
		days: [{
			date: "4/11",
			instructor: "Peter"
		},{
			date: "4/13",
			instructor: "Peter"
		}]
	},{
		label: "Week 6",
		days: [{
			date: "4/18",
			instructor: "Peter"
		},{
			date: "4/20",
			instructor: "Peter"
		}]
	},{
		label: "Week 7",
		days: [{
			date: "4/25",
			instructor: "Peter"
		},{
			date: "4/27",
			instructor: "Peter"
		}]
	},{
		label: "Week 8",
		days: [{
			date: "5/2",
			instructor: "Peter"
		},{
			date: "5/4",
			instructor: "Peter"
		}]
	}],
	infoSessionSchedule: [{
		date: "1/11",
		campus: "Platte",
		instructor: "Mairin"
	},{
		date: "2/6",
		campus: "Platte",
		instructor: "Kyle"
	},{
		date: "3/13",
		campus: "Platte",
		instructor: "CJ"
	},{
		date: "4/6",
		campus: "Platte",
		instructor: ""
	},{
		date: "5/3",
		campus: "Platte",
		instructor: ""
	},{
		date: "6/5",
		campus: "Golden Triangle",
		instructor: ""
	},{
		date: "7/6",
		campus: "Platte",
		instructor: ""
	},{
		date: "8/2",
		campus: "Platte",
		instructor: ""
	},{
		date: "9/5",
		campus: "Golden Triangle",
		instructor: ""
	},{
		date: "10/5",
		campus: "Platte",
		instructor: ""
	},{
		date: "11/6",
		campus: "Platte",
		instructor: ""
	},{
		date: "12/5",
		campus: "Golden Triangle",
		instructor: ""
	}]
});

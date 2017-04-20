export default function() {
	this.namespace = "api/v1";

	this.get("/workshop-schedules");
	this.get("/workshop-schedules/:id");
	this.get("/workshop-schedule-weeks");
	this.get("/workshop-schedule-weeks/:id");
	this.get("/workshop-schedule-days");
	this.get("/workshop-schedule-days/:id");
	this.get("/instructors");
	this.get("/instructors/:id");

	this.get("/cohorts");
	this.get("/cohorts/:id");
	this.get("/students");
	this.get("/students/:id");
	this.get("/performances");
	this.get("/performances/:id");
	// These comments are here to help you get started. Feel free to delete them.

	/*
	   Config (with defaults).

	   Note: these only affect routes defined *after* them!
	   */

	// this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
	// this.namespace = '';    // make this `/api`, for example, if your API is namespaced
	// this.timing = 400;      // delay for each request, automatically set to 0 during testing

	/*
	   Shorthand cheatsheet:

	   this.get('/posts');
	   this.post('/posts');
	   this.get('/posts/:id');
	   this.put('/posts/:id'); // or this.patch
	   this.del('/posts/:id');

	   http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
	   */
}

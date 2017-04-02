import DS from "ember-data";
import ENV from "ceres/config/environment";

export default DS.JSONAPIAdapter.extend({
	namespace: "api/v1",
	host: ENV.apiURL
});

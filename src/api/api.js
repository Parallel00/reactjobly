import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  
  static async currUserRetr(user){
	  let res = await this.request(`users/${user}`);
	  return res.user;
  }
  
  static async jobRetr(job){
	  let res = await this.request("jobs", { job });
	  return res.jobs;
  }
  
  static async jobApply(usr, id){
	  await this.request(`users/${usr}/jobs/${id}`);
  }
  
  static async compGet(comp){
	  let res = await this.request("companies", { comp });
	  return res.companies;
  }
  
  static async login(dt){
	  let res = await this.request(`auth/token`, data, "post");
	  return res.token;
  }
  
  static async makeAcc(dt){
	  let res = await this.request(`auth/register`, data, "post");
	  return res.token;
  }
  
  static async profSv(usr, data){
	  let res = await this.request(`users/${usr}`, data, "patch");
	  return res.user;
  }

  // obviously, you'll add a lot here ...
}

export default JoblyApi;
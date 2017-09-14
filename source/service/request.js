import Config, { authData } from '../config';
import { Base64 } from '../common/base64';
import qs from 'query-string';
import * as UserService from './userService';

const apiDomain = Config.apiDomain;
const timeout = 15000;

function filterJSON(res) {
	return res.json();
}

function filterStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return res;
	}
	else {
		throw new Error('server handle error');
	}
}


function timeoutFetch(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("fetch time out"));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  })
}

export function request(uri, type = "GET", headers = {}, data = ""){
		return UserService.getToken().then((result)=>{
				if(!headers["Authorization"]){
					let token;
					if(result && result.token){
						token = result.token.replace(/(^\")|(\"$)/g, '');
						headers["Authorization"] = `Bearer ${token}`;
					}
				}
				uri = Config.apiDomain + uri;
				let fetchOption = {
					method: type,
					headers: headers
				};

				if(type === "POST"){
					fetchOption.body = data;
				}

				if(__DEV__){
					console.log("fetch data from uri:");
					console.log(uri);
					console.log("type");
					console.log(type);
					console.log("headers:");
					console.log(headers);
					console.log("data:");
					console.log(data);
				}

				return timeoutFetch(timeout, fetch(uri, fetchOption))
				.then(filterStatus)
				.then(filterJSON)
				.catch(function(error) {
						throw error;
				});
		});
}

// export function get(uri, headers = {}) {
// 	return request(uri, "GET", headers);
// }

export function get(uri, params) {
	if (params) {
		uri += `?${qs.stringify(params)}`;
	}
	return request(uri, "GET");
}

export function post(uri, data = "", headers = {}) {
	headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};
	data =  JSON.stringify(data);
	return request(uri, "POST", headers, data);
}

export function put(uri, data = "", headers = {}) {
	headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};
	data =  JSON.stringify(data);
	return request(uri, "PUT", headers, data);
}

export function remove(uri, headers = {}) {
	return request(uri, "DELETE", headers);
}
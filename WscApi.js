import {WSC_BASE_URL, API_KEY, ACCESS_KEY} from './constants'

const request = (method, endpoint) => {
  return new Promise((resolve, reject) => {
     let options = {
       method: method,
       headers: {
         'wsc-api-key': API_KEY,
         'wsc-access-key': ACCESS_KEY,
         'Content-Type': 'application/json'
       }
     };

     fetch(WSC_BASE_URL+endpoint,options).then(
       (response) => {
         if (response.status !== 200) {
           console.log('Status Code: ' +
             response.status);
           return;
         }
         response.json().then((data) => {
           resolve(data)
         });
       }
     ).catch((err) => {
       console.log('Error : ', err);
     });
  });
}
export default request

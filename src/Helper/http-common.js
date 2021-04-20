import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44387/api/", //"http://192.168.100.167:8089/api/",
  
  //  timeout:6000,
  //  withCredentials :true,
 // httpsAgent: new https.Agent({ keepAlive: true }),
  headers: {
    'Accept': 'application/json',
    "Content-type": "application/json",
    //  "Authorization": 
  }
});

// axios.get('https://localhost:44387/api/')
//   .catch(function (error) {
//     if (error.response) {
//       alert(JSON.stringify(error));
//       // Request made and server responded
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       alert(JSON.stringify(error) );
//       // The request was made but no response was received
//       console.log(error.request);
//     } else {
//       alert(JSON.stringify(error) );
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//   });
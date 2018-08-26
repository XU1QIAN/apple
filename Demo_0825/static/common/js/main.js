if (window.Vue && window.axios) {
   Vue.axios = axios
   Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios
      }
    },
    $http: {
      get() {
        return axios
      }
    }
  });
}
window.bus=window.bus||new Vue();
axios.interceptors.response.use(function(data){
  // console.log(data);
 return data.data;
},function(error){
  return Promise.reject(error)
});
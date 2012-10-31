//var urlForServer='http://192.168.1.65:8080/VcApi/v1.0/';//test server
var urlForServer='http://173.201.188.106:8080/VcApi/v1.0/';//godaddy server
//var urlForServer='http://localhost:8080/VcApi/v1.0/';//local server

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

loadingImgUrl='http://173.201.188.106:8080/vocalimg/images/loading.gif';

//var urlForJs='http://localhost:8080/vc-js/';//local server
var urlForJs='http://173.201.188.106:8080/vc-js/';//godaddy server
//var urlForJs='http://192.168.1.65:8080/vc-js/';//test server
/**
 * This part splits the user id from the url and set it as a Global Variable
 */
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var is_safari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
var loginQueryString="";

if(is_chrome || is_safari)
loginQueryString="?"+$.jStorage.get("loginId");
else
loginQueryString="?"+document.cookie;

var loginQueryParams=loginQueryString.split("&");
var loginUserId=loginQueryParams.splice(1,1);
var gcLoginUserId=loginQueryParams.splice(1,1);
var role=loginQueryParams.splice(1,1);


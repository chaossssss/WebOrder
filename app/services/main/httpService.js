'use strict';

angular.module('app').factory('httpService', function httpService($http) {
  
  	//请求 get
    var doGetRequest = function(path){
        return $.ajax({
                method:'GET',
                url:path
          });
    };

  	//请求 post
	var doPostRequest = function(path,data){
		return $.ajax({
	            method:'POST',
	            url:path,
	            data:data
	      });
	};

	return {
	    get:function(path){
	        return doGetRequest(path);
	    },
	    post:function(path,data){
	        return doPostRequest(path,data);
	    }
	};

});
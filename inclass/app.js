angular.module("ForecastApp", [])
	   .controller("WeatherServiceController", ["$scope", "$http", "GoogleGeoLocationService",
		function($scope, $http, GoogleGeoLocationService){
		   
		   var wsc = this;
		   
		   wsc.app_name = "Weather App";
		   
		   wsc.cities = 
		   [
			  {
			      name:"Amarillo",
			      url_name:"Amarillo",
			      state:"TX",
			      lat:"0",
			      lon:"0"
			  },
			  
			  {
			       name:"Dallas",
			      url_name:"Dallas",
			      state:"TX",
			      lat:"0",
			      lon:"0"
			  },
			  
			  {
			       name:"Houston",
			      url_name:"Houston",
			      state:"TX",
			      lat:"0",
			      lon:"0"
			  }
		   ];
		   
		   wsc.getLatLonForSelected = function(){
		       GoogleGeoLocationService.geoLocate(wsc.selected_city)
		            .then(function(res){
		                
		            }).
		            catch(function(err){
		                
		            });
		   }
		}])
		.factory('GoogleGeoLocationService', ['$sce', '$http', 
		 function($sce, $http){
		    
		    var geolocationservice = {};
		    
		    //Google Geo Maps Key
		    var key = "AIzaSyCGtE8_YZEWZPpB5Fkg8WJcTSZQm86nK1M";
		    
		    geolocationservice.geoLocate = function(Location){
		        var address = + location.name + ",+" + location.state;
		        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + key;
		        
		        var trustedurl = $sce.trustedAsResourceUrl(url);
		        return $http.get(trustedurl);
		    };
		 return geolocationservice;
		}]);
		
		//Key: AIzaSyCGtE8_YZEWZPpB5Fkg8WJcTSZQm86nK1M
		//https://maps.googleapis.com/maps/api/geocode/json?address=405+Foster+Lane,+Canyon,+TX&key=AIzaSyCGtE8_YZEWZPpB5Fkg8WJcTSZQm86nK1M
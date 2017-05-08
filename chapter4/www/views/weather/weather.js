angular.module('App')
  .controller('WeatherController', ['$scope', 'WeatherService', '$ionicLoading',
    'LocalStorageService',
    function($scope, WeatherService, $ionicLoading,
      LocalStorageService) {

/*      var ref = firebase.database().ref();

      $scope.db = $firebaseObject(ref);*/

      $scope.getCurrentConditions = function() {
        WeatherService.getCurrentConditions()
          .then(function(res) {
            console.log(res);

            //get the weather stuff from the Dark Sky service here
            $scope.summary = res.data.currently.summary;
            $scope.temperature = res.data.currently.temperature;
            $scope.humidity = res.data.currently.humidity;
            $scope.windSpeed = res.data.currently.windSpeed;
            $scope.windBearing = res.data.currently.windBearing;
            $scope.picture = res.data.currently.icon;
            $scope.observation_time = new Date(res.data.currently.time * 1000);

/*            //for firebase
            $scope.db.latest_current_conditions = res.data.minutely.summary;
            $scope.db.latest_temperature = res.data.currently.temperature;
            $scope.db.latest_pressure = res.data.currently.pressure;
            $scope.db.latest_humidity = res.data.currently.humidity;
            $scope.db.latest_wind_speed = res.data.currently.windSpeed;
            $scope.db.latest_wind_direction = res.data.currently.windBearing;


            //save it
            $scope.db.$save().then(function() {
              console.log("SAVED");
            }).catch(function(error) {
              console.log("PROBLEM: " + error);
            });*/
          })
          .catch(function(err) {
            $ionicLoading.show({
              template: 'Could not load weather. Please try again later.',
              duration: 3000
            });
          });

      };
      $scope.getCurrentConditions();
      if ($scope.weather == null) {
        $scope.getCurrentConditions();
      }
      else if ($scope.weather != null) {
        $scope.weather = $scope.latestData();
      }
      else {
        setInterval(function() {
          $scope.getCurrentConditions();
        }, 900000);
      }

      LocalStorageService.setData('my-storage', $scope.weather);

      $scope.latestData = function() {
        LocalStorageService.getData('my-storage');
      };
    }
  ])
  .filter('direction', function() {
    return function(wind) {
      var dir;

      if (wind >= 348.75) {
        dir = "N";
      }
      else if (wind > 11.25 && wind <= 33.75) {
        dir = "NNE";
      }
      else if (wind > 33.75 && wind <= 56.25) {
        dir = "NE";
      }
      else if (wind > 56.25 && wind <= 78.75) {
        dir = "ENE";
      }
      else if (wind > 78.75 && wind <= 101.25) {
        dir = "E";
      }
      else if (wind > 101.25 && wind <= 123.75) {
        dir = "ESE";
      }
      else if (wind > 123.75 && wind <= 146.25) {
        dir = "SE";
      }
      else if (wind > 146.24 && wind <= 168.75) {
        dir = "SSE";
      }
      else if (wind > 168.75 && wind <= 191.25) {
        dir = "S";
      }
      else if (wind > 191.25 && wind <= 213.75) {
        dir = "SSW";
      }
      else if (wind > 213.75 && wind <= 236.25) {
        dir = "SW";
      }
      else if (wind > 236.25 && wind <= 258.75) {
        dir = "WSW";
      }
      else if (wind > 258.75 && wind <= 281.25) {
        dir = "W";
      }
      else if (wind > 281.25 && wind <= 303.25) {
        dir = "WNW";
      }
      else if (wind > 303.25 && wind <= 326.75) {
        dir = "NW";
      }
      else if (wind > 326.25 && wind < 348.75) {
        dir = "NNW";
      }


      return dir;


    };

  })
  .factory('WeatherService', ['$http',
    function($http) {
      //work happens here
      var weatherService = {};
      weatherService.getCurrentConditions = function() {
        var url = "https://api.darksky.net/forecast/19884f487b1a3b208ad1167d5f61bd1a/37.8267,-122.4233" +
          "?callback=JSON_CALLBACK"
        return $http.jsonp(url);
      };

      return weatherService;

    }
  ])
  .factory("LocalStorageService", function($window, $rootScope) {

    angular.element($window).on('storage', function(event) {
      if (event.key === 'my-storage') {
        $rootScope.$apply();
      }
    });

    return {
      setData: function(key, val) {

        $window.localStorage && $window.localStorage.setItem(key, val);
        return this;
      },
      getData: function(key) {

        var val = $window.localStorage && $window.localStorage.getItem(key);

        var data = angular.fromJson(val);

        return data;
      }
    };
  });

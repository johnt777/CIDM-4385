var myModule = angular.module('Pizza_App', []);

myModule.controller("MainController", ['$scope', 'LocalStorageService', 
                function($scope, LocalStorageService) {
    
    var mc = this;
	
	mc.toppingName = "";
	mc.toppingSize = "";
	mc.background = "emphasis";
	mc.toppings = [];

	mc.emphasis = function (status, $event){
		
		var el = $event.target.id;
		
		if(status){
			console.log("enter: " + el);
			mc.background = "emphasis";
			console.log(mc.background);
		} else {
			console.log("exit: " + el);		
			mc.background = "deemphasis";
			console.log(mc.background);
		}
	}
	
	mc.remove = function($index){

		mc.toppings = mc.latestData();
		mc.toppings.splice($index, 1);
		return LocalStorageService.setData('my-storage', angular.toJson(mc.toppings));		
		
	}
    
    mc.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
	
    mc.update = function(pname, pyear) {
		mc.toppings = mc.latestData();
		if(mc.toppings == null){
			mc.toppings = [];
		}
		var president = { name: pname, year: pyear};
		console.log(angular.toJson(president));
		mc.toppings.push(president);
        return LocalStorageService.setData('my-storage', angular.toJson(mc.toppings));
    };

    //Check to see if null
	if(mc.toppings != null){
		mc.toppings = mc.latestData();
	}else{
		console.log("crikey");
	}
}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
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
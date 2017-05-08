var app = angular.module('unitConverter', ["angular-unit-converter"]);

app.controller('MainCtrl', function($scope) {
  	$scope.value = 25;
	
	$scope.options = [
	    {name: "millimeters", value: "mm"},
	    {name: "centimeters", value: "cm"},
	    {name: "meters", value: "m"},
	    {name: "kilometers", value: "km"},
	    {name: "inches", value: "in"},
	    {name: "feet", value: "ft"},
	    {name: "yards", value: "yd"},
	    {name: "miles", value: "mi"},
	    
	    {name: "milligrams", value: "mg"},
	    {name: "grams", value: "g"},
	    {name: "kilograms", value: "kg"},
	    {name: "ounces", value: "oz"},
	    {name: "pounds", value: "lb"}
	];
});

(function() {
 'use strict';
 
 angular.module('app', [
 "ui.router"
 ])
 .config(function($stateProvider, $urlRouterProvider) {
 $urlRouterProvider.otherwise("/");
 
 $stateProvider.state("users", {
 url: "/",
 templateUrl: "/views/user/index.html",
 controller: "userController"
 }).state("create", {
 url: "/create",
 templateUrl: "/views/user/create.html",
 controller: "userController"
 }).state("edit", {
 url: "/edit/:id",
 templateUrl: "/views/user/create.html",
 controller: "userController"
 }).state("details", {
 url: "/details/:id",
 templateUrl: "/views/user/details.html",
 controller: "userController"
 });
 })
 .constant("globalConfig", {
 apiAddress: 'http://localhost:3001/api'
 });
})();

(function() {
 'use strict';
 
 angular
 .module('app')
 .factory('userService', Service);
 
 Service.$inject = ['$http', 'globalConfig'];
 
 function Service($http, globalConfig) {
 var url = "";
 return {
 getUsers: function() {
 url = globalConfig.apiAddress + "/user";
 return $http.get(url);
 },
 getUser: function(id) {
 url = globalConfig.apiAddress + "/user/" + id;
 return $http.get(url);
 },
 createUser: function(user) {
 url = globalConfig.apiAddress + "/user";
 return $http.post(url, user);
 },
 updateUser: function(user) {
 url = globalConfig.apiAddress + "/user/" + user._id;
 return $http.put(url, user);
 },
 deleteUser: function(id) {
 url = globalConfig.apiAddress + "/user/" + id;
 return $http.delete(url);
 }
 };
 }
})();

(function() {
 'use strict';
 
 angular
 .module('app')
 .controller('userController', Controller);
 
 Controller.$inject = ['$scope', '$rootScope', 'userService', '$state', '$stateParams'];
 
 function Controller($scope, $rootScope, userService, $state, $stateParams) {
 $scope.users = [];
 
 if ($state.current.name == "users") {
 $rootScope.Title = "User Listing";
 userService.getUsers().then(function(res) {
 $scope.users = res.data;
 }).catch(function(err) {
 console.log(err);
 });
 
 $scope.deleteUser = function(id) {
 if (confirm('Are you sure to delete?')) {
 userService.deleteUser(id).then(function(res) {
 if (res.data == "deleted") {
 $state.go("users", {}, { reload: true });
 }
 }).catch(function(err) {
 console.log(err);
 });
 }
 };
 } else if ($state.current.name == "edit") {
 $rootScope.Title = "Edit User";
 var id = $stateParams.id;
 userService.getUser(id).then(function(res) {
 $scope.user = res.data;
 }).catch(function(err) {
 console.log(err);
 });
 
 $scope.saveData = function(user) {
 if ($scope.userForm.$valid) {
 userService.updateUser(user).then(function(res) {
 if (res.data == "updated") {
 $state.go("users");
 }
 }).catch(function(err) {
 console.log(err);
 });
 }
 };
 } else if ($state.current.name == "create") {
 $rootScope.Title = "Create User";
 $scope.saveData = function(user) {
 $scope.IsSubmit = true;
 if ($scope.userForm.$valid) {
 userService.createUser(user).then(function(res) {
 if (res.data == "created") {
 $state.go("users");
 }
 }).catch(function(err) {
 console.log(err);
 });
 }
 };
 }
 }
})();
/*
var app = angular.module("app",["ui-router"]);


//routes
(function() {
	'use strict';

		app.config(function($stateProvider,$urlRouterProvider){
		
		$urlRouterProvider.otherwise("/");
		
		$stateProvider
			.state("users",{
				url:"/",
				templateUrl:"views/user/index.html",
				controller:"userController"
			})
			.state("create",{
				url:"/create",
				templateUrl:"views/user/create.html",
				controller:"userController"
			})
			.state("edit",{
				url:"/edit/:id",
				templateUrl:"views/user/edit.html",
				controller:"userController"
			})
			.state("details",{
				url:"/details/:id",
				templateUrl:"views/user/details.html",
				controller:"userController"
			});
	})
	.constant("globalConfig",{
		apiAddress:"http://localhsot:3001/api"
	});
})();

//services
(function(){
	"use strict";
	
	
	app.factory("userService",Service);

	Service.$inject = ['$http','globalConfig']

	function Service($http,globalConfig){
		var url = "";
		return{
			getUsers:function(){
				url=globalConfig.apiAddress+"/user";
				return $http.get(url);
			}, 
			getUser:function(id){
				url = globalConfig.apiAddress+"/user/"+id;
				return $http.get(url);
			},
			createUser:function(user){
				url = globalConfig.apiAddress+"/user";
				return $http.post(url,user);
			},
			updateUser:function(user){
				url = globalConfig.apiAddress+"/user/"+user._id;
				return $http.put(url,user);	
			},
			deleteUser:function(id){
				url = globalConfig.apiAddress+"/user/"+id;
				return $http.delete(url);
			},
		};
	}
})();

//controllers

(function(){
	'use strict';
		app.controller("userController",Controller);
		 Controller.$inject = ['$scope', '$rootScope', 'userService', '$state', '$stateParams'];
		 
		 function Controller($scope, $rootScope, userService, $state, $stateParams) {
		$scope.users = [];

		if($state.current.name="user"){
			$rootScope.Title = "User Listings";
			userService
			.getUsers()
			.then(function(res){
				$scope.users = res.data;
			})
			.catch(function(err){
				console.log("error : "+err);
			});

			$scope.deleteUser = function(id){
				if(confirm("Are you sure ?")){
					userService
					.deleteUser(id)
					.then(function(res){
						if(res.data="deleted"){
							$stae.go("users",{},{reload:true});
						}
					})
					.catch(function(err){
						console.log("error : "+err);
					});
				}
			};
		}
		else if($state.current.name="edit"){
			$rootScope.Title = "Edit User";
			var id = $stateParams.id;

			userService
			.getUser(id)
			.then(function(res){
				$scope.user = res.data;
			})
			.catch(function(err){
				console.log("Error : "+err);
			});

			$scope.saveData = function(user){
				if($scope.usreForm.$valid){
					userService
					.updateUser(user)
					.then(function(res){
						if(res.data="updated"){
							$state.go("users");
						}
					})
					.catch(function(err){
						if(err){
							console.log("Error : "+err);
						}
					});
				}
			};
		}
		else if($state.current.name="create"){
			$rootScope = "Create User";

			$scope.saveData = function(user){
				$scope.IsSumbit =true;
				if($scope.userForm.$valid){
					userService
					.createUser(user)
					.then(function(res){
						if(res.data ="created"){
							$state.go("users");
						}
					})
					.catch(function(err){
						if(err){
							console.log("erro : "+err);
						}
					});
				}
			};
		}
	}	

})();
*/
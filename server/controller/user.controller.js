//controllers

(function(){
	'use strict';
	angular
		.module("app")
		.controller("userController",Controller);
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
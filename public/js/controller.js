angular.module("myApp")
    .controller("ProductsController", function($scope, dataService) {

        $scope.getProducts = function() {
            dataService.getProducts().then(function(data) {
                $scope.products = data;
            });
        };
        $scope.getProducts();

    })
    .controller("AdminController", function($scope, $location, dataService) {

        $scope.getProducts = function() {
            dataService.getProducts().then(function(data) {
                $scope.products = data;
            });
        };
        $scope.getProducts();

        $scope.gotoDetails = function(product) {
        	$location.path("/details/" + (product ? product._id : "add"));
        }

    })
    .controller("DetailsController", function($scope, $routeParams, dataService) {
    	$scope.productId = $routeParams.productId;
    });

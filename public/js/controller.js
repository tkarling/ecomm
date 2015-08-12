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
            dataService.getProducts(true).then(function(data) {
                $scope.products = data;
            });
        };
        $scope.getProducts();

        $scope.gotoDetails = function(product) {
            $location.path("/details/" + (product ? product._id : "add"));
        };

        $scope.deleteProduct = function(product) {
        	// console.log("$scope.deleteProduct", product);
        	dataService.deleteProduct(product).then(function(response) {
        		$scope.getProducts();
        	});
        };


    })
    .controller("DetailsController", function($scope, $routeParams, $location, dataService) {
        $scope.productId = $routeParams.productId;
        $scope.title = $scope.productId === "add" ? "Add Product" : "Product Details";

        $scope.product = {};
        if ($scope.productId !== "add") {
            dataService.getProduct($scope.productId).then(function(product) {
                $scope.product = product;
            })
        }

        $scope.saveOrAddProduct = function() {
            var promise;
            if ($scope.productId === "add") {
                promise = dataService.addProduct($scope.product);
            } else {
                promise = dataService.saveProduct($scope.product);
            }
            promise.then(function() {
                $location.path("/admin");
            });
        };

    });

angular.module("myApp")
    .controller("ProductsController", function($scope, $window, catalogService,
        cartActions, cartStore, cartService) { // dispatcher,

        $scope.showCart = $window.innerWidth > 600;
        //console.log('set', $scope.showCart, $window.innerWidth );
        $window.onresize = function() {
            $scope.showCart = $window.innerWidth > 600;
            //console.log('window was resized', $scope.showCart, $window.innerWidth );
            $scope.$apply();
        };

        $scope.toggleShowCart = function(value) {
            $scope.showCart = value;
        }

        $scope.getProducts = function() {
            catalogService.getProducts().then(function(data) {
                $scope.products = data;
            });
        };
        $scope.getProducts();
        //$scope.cartActions = dispatcher;

        $scope.addToCart = function(product) {
            // console.log("$scope.addToCart", product);
            $scope.cartActions.addItem(product);
        };

        $scope.cartStore = cartStore;
        $scope.cartActions = cartActions;

        cartStore.addListener(function() {
            $scope.resetItems();
        });

        var countTotals = function(newValue, oldValue) {
            $scope.totalPrice = 0;
            $scope.totalCount = 0;
            $scope.items.forEach(function(element, index, array) {
                //console.log("$scope.totalPrice", $scope.totalPrice, element);
                $scope.totalPrice += element.product.price;
                $scope.totalCount += element.amount;
            })
        };

        $scope.resetItems = function() {
            //console.log("$scope.cartStore",  $scope.cartStore);
            $scope.items = $scope.cartStore.getCartItems(); // remover ()
            //console.log("$scope.resetItems", $scope.cartStore.cartItems, $scope.items);
            countTotals();
        };
        $scope.resetItems();

        $scope.removeItem = function(order) {
           $scope.cartActions.removeItem(order);
        };

    })
    .controller("AdminController", function($scope, $location, catalogService) {

        $scope.getProducts = function() {
            catalogService.getProducts(true).then(function(data) {
                $scope.products = data;
            });
        };
        $scope.getProducts();

        $scope.gotoDetails = function(product) {
            $location.path("/details/" + (product ? product._id : "add"));
        };

        $scope.deleteProduct = function(product) {
            // console.log("$scope.deleteProduct", product);
            catalogService.deleteProduct(product).then(function(response) {
                $scope.getProducts();
            });
        };


    })
    .controller("DetailsController", function($scope, $routeParams, $location, catalogService) {
        $scope.productId = $routeParams.productId;
        $scope.title = $scope.productId === "add" ? "Add Product" : "Product Details";

        $scope.product = {};
        if ($scope.productId !== "add") {
            catalogService.getProduct($scope.productId).then(function(product) {
                $scope.product = product;
            })
        }

        $scope.saveOrAddProduct = function() {
            var promise;
            if ($scope.productId === "add") {
                promise = catalogService.addProduct($scope.product);
            } else {
                promise = catalogService.saveProduct($scope.product);
            }
            promise.then(function() {
                $location.path("/admin");
            });
        };

    });

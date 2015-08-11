angular.module("myApp", ["ngRoute"]);

angular.module("myApp")
    .config(function($routeProvider) {
        $routeProvider
            .when("/products", {
                templateUrl: "./views/products.html",
                controller: "ProductsController"
            })
            .when("/admin", {
                templateUrl: "./views/admin.html",
                controller: "AdminController"
            })
            .when("/details/:productId", {
                templateUrl: "./views/productDetails.html",
                controller: "DetailsController"
            })
            .otherwise({
                redirectTo: "/products"
            });

    });

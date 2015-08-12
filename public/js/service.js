angular.module("myApp")
    .service("dataService", function($http, $q) {
        var url = "http://localhost:3038/api/ecomm/catalogue";

        var products = [];

        this.getProducts = function(mustUpdate) {
            if (!mustUpdate && products.length > 0) {
                // console.log("Exist", products);
                return $q.when(products);
            } // else
            return $http.get(url).then(function(response) {
                // console.log("dataService response", response);
                products = response.data;
                return products;
            })
        };
        // this.getProducts();

        var orginalProduct;
        this.getProduct = function(productId) {
            return this.getProducts().then(function() {
                for (var i = 0; i < products.length; i++) {
                    if (products[i]._id === productId) {
                    	orginalProduct = products[i].product;
                        return (products[i]);
                    }
                }
            })
        };

        this.addProduct = function(product) {
            return $http.post(url, product).then(function(response) {
                // console.log("this.addProduct", response);
                return response.data;
            });
        };

        this.saveProduct = function(product) {
            return $http.post(url + "?product=" + orginalProduct,
                product).then(function(response) {
                // console.log("this.saveProduct", response);
                return response.data;
            });

        };

        this.deleteProduct = function(product) {
            return $http.delete(url + "?product=" + orginalProduct,
                product).then(function(response) {
                // console.log("this.deleteProduct", response);
                return response.data;
            });

        };

    })

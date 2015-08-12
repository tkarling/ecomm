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
                        orginalProduct = products[i];
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
            var myUrl = url + "?id=" + product._id;
            var dbProduct = {
                product: product.product,
                brand: product.brand,
                price: product.price,
                description: product.description
            }
            // console.log("this.saveProduct", product._id, myUrl, dbProduct);
            return $http.put(myUrl, dbProduct).then(function(response) {
                // console.log("this.saveProduct", response);
                return response.data;
            });

        };

        this.deleteProduct = function(product) {
            var myUrl = url + "?id=" + product._id;
            // console.log("this.deleteProduct", myUrl);
            return $http.delete(myUrl).then(function(response) {
                // console.log("this.deleteProduct", response);
                return response.data;
            });

        };

    })

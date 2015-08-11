angular.module("myApp")
.service("dataService", function($http, $q) {
	var url = "http://localhost:3038/api/ecomm/catalogue";

	var products = [];

	this.getProducts = function() {
		if(products.length > 0) {
			console.log("Exist", products);
			return $q.when(products);
		} // else
		return $http.get(url).then(function(response) {
			console.log("dataService response", response);
			products = response.data;
			return products;
		})
	}
	// this.getProducts();

})
/**
 * Created by tuija on 8/14/15.
 */
angular.module("myApp")
    .service("cartService", function($http) {
        var url = "http://localhost:3038/api/ecomm/cart";

        var cartItems = [];
        var cartInfo = {};
        var cartId = "55ce5775727a3cf934c2556d";

        this.setCart = function() {
            cartId = "55ce5775727a3cf934c2556d";
        };

        this.getCartItems = function(mustUpdate) {
            //if (!mustUpdate && products.length > 0) {
            //    // console.log("Exist", products);
            //    return $q.when(products);
            //} // else
            var sendUrl = url + "?_id=" + cartId;
            return $http.get(sendUrl).then(function(response) {
                //console.log("cartService get response", response);
                cartInfo.user = response.data[0].user;
                cartInfo.data = response.data[0].date;
                cartItems = response.data[0].order;
                //console.log("cartService cartInfo, cartItems", cartInfo, cartItems);
                return cartItems;
            })
        };
        this.getCartItems();

        this.addToCart = function(order) {
            var sendUrl = url + "/" + cartId + "/order";
            return $http.post(sendUrl, order).then(function(response) {
                 //console.log("this.addToCart", response);
                return response.data;
            });
        };

        this.deleteFromCart = function(order) {
            var sendUrl = url + "/" + cartId + "/order?id=" + order._id;
            // console.log("this.deleteFromCart", sendUrl);
            return $http.delete(sendUrl).then(function(response) {
                // console.log("this.deleteFromCart", response);
                return response.data;
            });

        };


    });

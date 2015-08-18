/**
 * Created by tuija on 8/14/15.
 */
angular.module("myApp")
    .service("cartService", function($http) {
        var url = "http://localhost:3038/api/ecomm/cart";

        var cartItems = [];
        var cartInfo = {};
        var cartId = "55ce6b4e4693372b4910125d";

        this.setCart = function() {
            cartId = "55ce6b4e4693372b4910125d";
        };

        this.getOrders = function(mustUpdate) {
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
                //console.log("cartService cartInfo, orders", cartInfo, orders);
                return cartItems;
            })
        };
        this.getOrders();

        this.addToCart = function(product) {
            var sendUrl = url + "/" + cartId + "/order";
            var newOrder = {
                product: product._id,
                amount: 1
            }
            return $http.post(sendUrl, newOrder).then(function(response) {
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

        this.increaseAmount = function(order) {
            var sendUrl = url + "/" + cartId + "/order?id=" + order._id;
            var orderUpdates = {
                "_id": order._id,
                "product": order.product._id,
                "amount": order.amount + 1
            }
            //console.log("this.updateCartItem", sendUrl, orderUpdates);
            return $http.put(sendUrl, orderUpdates).then(function(response) {
                //console.log("this.updateCartItem", response);
                return response.data;
            });
        };


    });

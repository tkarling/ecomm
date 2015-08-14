/**
 * Created by tuija on 8/14/15.
 */
angular.module("myApp")
    .service("cartService", function($http) {
        var url = "http://localhost:3038/api/ecomm/cart";

        var cartItems = [];
        var cartInfo = {};
        var cartId = "55cd04861e851d8f331465dd";

        this.setCart = function() {
            cartId = "55cd04861e851d8f331465dd";
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

    });

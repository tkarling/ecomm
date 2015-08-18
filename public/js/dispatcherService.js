var ADD_ITEM = "ADD_ITEM";
var REMOVE_ITEM = "REMOVE_ITEM";

angular.module("myApp")
    .factory("cartActions", function(dispatcher) {
        return {
            addOrder: function (item) {
                dispatcher.emit({
                    actionType: ADD_ITEM,
                    item: item
                })
            },
            removeOrder: function(item) {
            dispatcher.emit({
                actionType: REMOVE_ITEM,
                item: item
            })
        }

    };
    })
    .service("dispatcher", function(cartService) {
        var listeners = [];

        this.emit = function(event) {
            //console.log("emit called", event);
            listeners.forEach(function(listener) {
                //console.log("calling listener", listener);
                listener(event);
            });
        };

        this.addListener = function(listener) {
            listeners.push(listener);
            return listeners.length - 1;
        };

        // CartStore specific STARTS

        var data = {orders:[]};

        this.getOrders = function() {
            return data.orders;
        }

        var indexOfProductInOrders = function(orders, product) {
       		// console.log("itemAlreadyInCart", orders.length, orders, product);
        	for(var i = 0; i < orders.length; i++) {
        		// console.log("itemAlreadyInCart", orders[i], product);
        		if(product.product === orders[i].product.product) {
        			return i;
        		}
        	}
        	return -1;
        };

        this.addOrder = function(product) {
            var orders = data.orders;
            var index = indexOfProductInOrders(orders, product);
            if (index === -1) { // new product
                cartService.addToCart(product);
            } else { // is already in cart !!!!!
                cartService.increaseAmount(orders[index]);
            }
            // console.log("this.addOrder orders", this.orders);
        };

        this.removeOrder = function(order) {
            cartService.deleteFromCart(order);
        };

        this.emitChange = function() {
            var self = this;
            return cartService.getOrders().then(function(cartItems) {
                data.orders = cartItems;
                //console.log("emiting change", data.orders);
                self.emit("change");
            });
        };
        this.emitChange();
    })
    .factory("cartStore", function(dispatcher) {
        // var cartStore = new CartStore();
        var cartStore = dispatcher;

        dispatcher.addListener(function(action) {
            switch (action.actionType) {
                case ADD_ITEM:
                    cartStore.addOrder(action.item);
                    cartStore.emitChange();
                    break;

                case REMOVE_ITEM:
                    cartStore.removeOrder(action.item);
                    cartStore.emitChange();
                    break;
            }

        });

        //expose only the public interface
        return {
            addListener: cartStore.addListener,
            getOrders: function() {
                return cartStore.getOrders();
            }
        };
    });

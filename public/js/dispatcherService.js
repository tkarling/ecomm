var ADD_ITEM = "ADD_ITEM";
var REMOVE_ITEM = "REMOVE_ITEM";

angular.module("myApp")
    .factory("cartActions", function(dispatcher) {
        return {
            addItem: function (item) {
                dispatcher.emit({
                    actionType: ADD_ITEM,
                    item: item
                })
            },
            removeItem: function(item) {
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

        var data = {cartItems:[]};

        this.getCartItems = function() {
            return data.cartItems;
        }

        var indexOfItem = function(cartItems, item) {
       		// console.log("itemAlreadyInCart", cartItems.length, cartItems, item);
        	for(var i = 0; i < cartItems.length; i++) {
        		// console.log("itemAlreadyInCart", cartItems[i], item);
        		if(item.product === cartItems[i].product.product) {
        			return i;
        		}
        	}
        	return -1;
        };

        this.addItem = function(product) {
            var items = data.cartItems;
            var index = indexOfItem(items, product);
            if (index === -1) { 
                cartService.addToCart({
                    amount: 1,
                    product: product._id
                });
            } else { // is already in cart !!!!!
                items[index].amount += 1;
            }
            // console.log("this.addItem cartItems", this.cartItems);
        };

        this.removeItem = function(order) {
            //var index = data.cartItems.indexOf(cartItem);
            //data.cartItems.splice(index, 1);
            cartService.deleteFromCart(order);
        };

        this.emitChange = function() {
            var self = this;
            return cartService.getCartItems().then(function(cartItems) {
                data.cartItems = cartItems;
                //console.log("emiting change", data.cartItems);
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
                    cartStore.addItem(action.item);
                    cartStore.emitChange();
                    break;

                case REMOVE_ITEM:
                    cartStore.removeItem(action.item);
                    cartStore.emitChange();
                    break;
            }

        });

        //expose only the public interface
        return {
            addListener: cartStore.addListener,
            getCartItems: function() {
                return cartStore.getCartItems();
            }
        };
    });

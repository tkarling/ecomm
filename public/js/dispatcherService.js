var ADD_ITEM = "ADD_ITEM";
var REMOVE_ITEM = "REMOVE_ITEM";

angular.module("myApp")
    .factory("cartActions", function(dispatcher) {
        return {
            addItem(item) {
                dispatcher.emit({
                    actionType: ADD_ITEM,
                    item: item
                })
            }
        };
    })
    .service("dispatcher", function() {
        var listeners = [];

        this.emit = function(event) {
            listeners.forEach(function(listener) {
                listener(event);
            });
        };

        this.addListener = function(listener) {
            listeners.push(listener);
            return listeners.length - 1;
        };

        // CartStore specific STARTS

        this.cartItems = [];

        var indexOfItem = function(cartItems, item) {
       		// console.log("itemAlreadyInCart", cartItems.length, cartItems, item);
        	for(var i = 0; i < cartItems.length; i++) {
        		// console.log("itemAlreadyInCart", cartItems[i], item);
        		if(item.product === cartItems[i].catalogItem.product) {
        			return i;
        		}
        	}
        	return -1;
        }

        this.addItem = function(catalogItem) {
            // console.log("this.addItem", catalogItem);
            var items = this.cartItems;
            var index = indexOfItem(items, catalogItem);
            if (index === -1) { 
                this.cartItems.push({
                    qty: 1,
                    catalogItem: catalogItem
                });
            } else { // is already in cart !!!!!
                items[index].qty += 1;
            }
            // console.log("this.addItem cartItems", this.cartItems);
        };

        this.removeItem = function(cartItem) {
            var index = this.cartItems.indexOf(cartItem);
            this.cartItems.splice(index, 1);
        }

        this.emitChange = function() {
            this.emit("change");
        }
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
            cartItems: cartStore.cartItems
        };
    });

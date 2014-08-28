var Item = {
    initialize: function(inputDescription, inputCost, inputQuantity){
        this.descript = inputDescription;
        this.cost = inputCost;
        this.quantity = inputQuantity;
    },
    totalCost: function(){
        return this.cost * this.quantity;
    },
    buildTable: function(){
            $("#finalTable").append("<tr><td>"+this.descript+"</td><td>$"+this.cost+"</td><td>"+this.quantity+"</td><td>$"+this.totalCost()+"</td></tr>");
    } 
}

var List = {
    
}

var listOfItems = [];

var emptyTable = function(){
    $("#finalTable").empty();
    $("#finalTable").append("<tr><th>Description</th><th>Price</th><th>Quantity</th><th>Total Cost</th></tr>");
}

var makeTable = function(){
    var i;
    for(i = 0; i < listOfItems.length; i+=1){
        listOfItems[i].buildTable();
    }
}

$(document).ready(function() {
    $("form#new-purchase").submit(function(event) {
        event.preventDefault();

        var newItem = Object.create(Item);
        newItem.initialize($("input#description").val(), $("input#price").val(), $("input#quantity").val());
        listOfItems.push(newItem);

        $("input#description").val("");
        $("input#price").val("");
        $("input#quantity").val("");

        emptyTable();
        makeTable();
    });
});
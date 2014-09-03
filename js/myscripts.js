var Item = { // Item prototype
    initialize: function(inputDescription, inputCost, inputQuantity){
        this.descript = inputDescription; //Table values
        this.cost = inputCost;
        this.quantity = inputQuantity;
        this.category = currentCategory; // Category identifier
    },
    totalCost: function(){  // Calculate the total cost
        return this.cost * this.quantity;
    },
    buildTable: function(){ // build the table
            $("#finalTable").append("<tr><td>"+this.descript+"</td><td>$"+this.cost+"</td><td>"+this.quantity+"</td><td>$"+this.totalCost()+"</td></tr>");
    },
}

var List = {    // List prototype
    initialize: function(inputName){
        this.listName = inputName;  // Give it a name
    },
    addCategoryButton: function(categoryName){  // Build a button and give it a click handler
        $("#categoryButtons").append("<button type='button' class='btn btn-default' id='"+categoryName+"'>"+categoryName+"</button>");
        $("#categoryName").empty();
        $("#categoryName").text(categoryName);
        currentCategory = categoryName;
        emptyTable();
        makeTable();
        $("#"+categoryName).click(function(){
            $("#categoryName").empty();
            $("#categoryName").text(categoryName);
            currentCategory = categoryName;
            emptyTable();
            makeTable();
        })
    }
}

var currentCategory = 1; // initialize
var listOfItems = []; // array of all of the items
var listOfLists = []; // array of all of the lists


var emptyTable = function(){ // function to clear the table
    $("#finalTable").empty();
    $("#finalTable").append("<tr><th>Description</th><th>Price</th><th>Quantity</th><th>Total Cost</th></tr>");
}

var makeTable = function(){ // function to build the table
    var i;
    for(i = 0; i < listOfItems.length; i+=1){
        if(listOfItems[i].category === currentCategory){
            listOfItems[i].buildTable();
        }
    }
}

var buildCategories = function(){ // function to initialize the category buttons
    $("#categoryList").text("");
    $("#categoryList").append("<div class='btn-group-vertical' id='categoryButtons' margin-top:10px margin-bottom:10px></div>");
}



$(document).ready(function() {

    $("form#new-category").submit(function(event) { // new category form handler
        event.preventDefault();

        if(currentCategory === 1){ // First time through
            $("fieldset").removeAttr('disabled'); // enable the add purchase form
            buildCategories(); // initialize the buttons
        }
        

        var newList = Object.create(List); // create a new list object
        newList.initialize($("input#category").val()); // give it a name
        newList.addCategoryButton(newList.listName); // add the button
        listOfLists.push(newList); // add it to the array

        $("input#category").val(""); // clear the form
    });

    $("form#new-purchase").submit(function(event){ // new purchase form handler
        event.preventDefault();

        var newItem = Object.create(Item); // create a new item object
        newItem.initialize($("input#description").val(), $("input#price").val(), $("input#quantity").val());   // read from the form
        listOfItems.push(newItem);     // add it to the array    

        $("input#description").val(""); // clear the form
        $("input#price").val("");
        $("input#quantity").val("");

        emptyTable(); // rebuild the table
        makeTable();

    });

});
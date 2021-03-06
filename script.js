//Assuming this is what I am getting back as data from the server
//I am storing it in a variable in the global scope

var x = [{
    "name": "john",
    "size": 6
}, {
    "name": "joe",
    "size": 6
}, {
    "name": "john",
    "size": 2
}, {
    "name": "joe",
    "size": 6
}, {
    "name": "john",
    "size": 2
}, {
    "name": "john",
    "size": 18
}, {
    "name": "bob",
    "size": 23
}, {
    "name": "bob",
    "size": 7
}]

// Setting a class
var container = function () {};

// method to render cells on paage load
// assuming I am making an ajax call to the databse 
// and it is returning me a formatted JSON
// Palindrome check method is called inside this method
// to check for names which are palindromes

container.prototype.renderCell = function (o) {
    var render = '';
    for(var i = 0; i < o.length; i++) {
        render += '<tr class="prescreen-input">';
        render += '<td class="input-name ' + this.isPalindrome(o[i].name) +'">' + o[i].name + '</td>';
        render += '<td>:</td>';
        render += '<td class="box">' + o[i].size + '</td>';
        render += '</tr>';
    };
    return render;
}

// this method reduces the object from the response
// and returns a cllection of count for each name
// The object end up looking like

container.prototype.associate = function(_x){
    var e = [];
    _x.reduce(function (i, f) {
    var isExisting = e.filter(function (item) {
        return item.groupName == f.name
    })[0];
    if (isExisting) {
        isExisting.groupCount.push(f.size);
    } else {
        e.push({
            groupName: f.name,
            groupCount: [f.size]
        });
    }
    
});
    return e;
}

// Method which constructs the final object
// which is looped over for drawing cells
// I am printing this at the console to show the new object

container.prototype.output = function(a){
    var outputObj = [];
    for(var i = 0; i < a.length; i++){
        outputObj[i] = {
            name : a[i].groupName,
            total : this.calculateTotal(a, i)
        }
    }
    return outputObj;
}

// method to calculate total count for each person
container.prototype.calculateTotal = function(b,i){
    var out = 0; // intializing it to be an number
    for(var j = 0; j < b[i].groupCount.length; j++){
        out += b[i].groupCount[j];
    }
    return out;
}

//display the final result
container.prototype.displayResult = function(d){
    
    var result = '';
    for(var i = 0; i < d.length; i++){
        result += '<tr>';
        //Calling the isPalindrome method in the loop
        //and passing in the cyrrent name which returns a class after checking
        //weather the name is a palindrome. If not it returns an empty string
        result += '<td class="output-name '+ this.isPalindrome(d[i].name) + '">' + d[i].name + '</td>'; 
        result += '<td class="output-total">' + d[i].total + '</td>';
        result += '</tr>'
    }
    return result;
}

//Palindrome check method.
//The palindrome names are displayed in red

container.prototype.isPalindrome = function(str){
    var strReverse = str.split('').reverse().join('');
    //Setting the class variable to be an empty string. 
    //if a palindrome it returns 'prescreen-palindrome'
    var exceptionClass = ''; 
    if(str == strReverse){
        exceptionClass = 'prescreen-palindrome';
    }
    return exceptionClass;
}

var app = new container(); // Constructor for container class
console.log(app.output(app.associate(x)))

// using $(function(){}) before data binding to ensure DOM is ready
$(function(){

    $('.input-body').append(app.renderCell(x));

    $('.prescreen-button').on('click', function(){
        $('.prescreen-output').html(app.displayResult(app.output(app.associate(x)))) 
        // calling the app display result and passing in an object as a parameter
    });

});
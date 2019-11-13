//https://www.ibm.com/developerworks/community/blogs/hazem/entry/javascript_getting_all_possible_combinations?lang=en

var Util = function() {
};

Util.getCombinations = function(array, size, start, initialStuff, output) {
    if (initialStuff.length >= size) {
        output.push(initialStuff);
    } else {
        var i;
		
        for (i = start; i < array.length; ++i) {	
	    Util.getCombinations(array, size, i + 1, initialStuff.concat(array[i]), output);
        }
    }
};

Util.getAllPossibleCombinations = function(array, size, output) {
    Util.getCombinations(array, size, 0, [], output);
}

// Create an array that holds numbers from 1 ... 6.
var array = [];

for (var i = 1; i <= 6; ++i) {
    array[i - 1] = i;
}

var output = [];

// Select only 4 balls out of the 6 balls at a time ...
Util.getAllPossibleCombinations(array, 4, output);
console.log(output);
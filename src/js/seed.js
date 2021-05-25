function generate() {
    const crypto = require('crypto');
    // Generate a random seed
    var length = 64;  // IOTA defined seed length
    var cursor = 0;   // Cursor to reduce modulus bias
    var trytes = "ABCDEF123456789"; // Allowed characters        
    var result = new Array(length);            // Array to store seed characters
    var bytes = crypto.randomBytes(length);       // Generate the random values as a buffer
    var view = new Uint32Array(bytes);

    for(var i = 0; i < view.length; i++) {       // Iterate through each of the 64 random values
        cursor += view[i];                       // Add each to the cursor
        result[i] =  trytes[cursor % trytes.length]; // Assign a new character to the seed based on cursor mod 81.
    }   
    const seed = result.join('').toString();
    return seed;
}

 
exports.generate = generate;


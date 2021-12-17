const text = " I'm fine 'friend' ";
const re = /\b'(?!\b)|(?<!\b)'\b/gi;
const result = text.replace(re, "\"");
console.log(result);
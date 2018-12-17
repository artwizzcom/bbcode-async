let bb = require('./src');


let text = "[h1]test[/h1] Hello [b]Hello World[/b] World by [url=google.com]google[/url] dies ist eine [cp=2]customFunktion[/cp]";

console.log('')
console.log('')
console.log('######### IN: #########');
console.log(text);
console.log('#######################');


bb.registerTag('cp', function(string, tag, attrs, value, tagDetails, done) {
    let val = '<a href="mylink?id=';
    setTimeout(function() {
        val += attrs;
        done(null, val + '">' + value + '</a>');
    }, 2500);
});

bb.parse(text, function(err, result) {


    console.log('')
    console.log('######### OUT: #########');
    console.log(result);
    console.log('########################');
    console.log('')
});


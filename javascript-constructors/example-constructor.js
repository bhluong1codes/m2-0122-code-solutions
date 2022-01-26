function ExampleConstructor() {

}

console.log('value of ExampleConstructor.prototype:', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor.prototype:', typeof ExampleConstructor.prototype);

var example = new ExampleConstructor();

console.log(example);

var instance = example instanceof ExampleConstructor;

console.log('example is instanceof ExampleConstructor:', instance);

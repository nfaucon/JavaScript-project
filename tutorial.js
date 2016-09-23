// Define a constructor for the Animal parent class
var Animal = function(name) {
  this.name = name;
};

// Add a couple of methods to Animal.prototype
Animal.prototype.walk = function(){
  console.log(this.name + " is walking!");
};

Animal.prototype.sayHello = function(){
  console.log(this.name + " is looking at you.");
};

// Define the Dog constructor
function Dog(name, toy) {
  // Call the parent constructor, it is important to use Function#call
  // with "this" is set correctly for the call
  Animal.call(this, name);

  // Initialize our Dog-specific properties
  this.toy = toy;
};

// Create a Dog.prototype object that is inheriting from Animal.prototype.
// you shouldn't use "new Animal()" to create the Dog.prototype.
Dog.prototype = Object.create(Animal.prototype); // See note below

// Set the "constructor" property to refer to Dog
Dog.prototype.constructor = Dog;

// Replace the "sayHello" method
Dog.prototype.sayHello = function(){
  console.log(this.name + " is barking. He is playing with "
              + this.toy + ".");
};

// Add a "sayGoodBye" method
Dog.prototype.sayGoodBye = function(){
  console.log(this.name + " look sad to see you leave.");
};

// Main program
var fido1 = new Dog("Fido", "his bone");
// check the type with instanceof
if (fido1 instanceof Animal) {
    console.log("fido1 is an Animal.");
}
else {
    console.log("fido1 is an Animal.");
}
if (fido1 instanceof Dog) {
    console.log("fido1 is a Dog.");
}
else {
    console.log("fido1 is a Dog.");
}

// some outputs
fido1.sayHello();   // Fido is barking. He is playing with his bone.
fido1.walk();       // "I am walking!"
fido1.sayGoodBye(); // "Goodbye!"


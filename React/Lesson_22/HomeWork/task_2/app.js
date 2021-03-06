class Person {
    constructor(firstName = 'John', lastName = 'Doe', age = 0, gender = 'Male') {
        this.firstName = firstName,
            this.lastName = lastName,
            this.age = age,
            this.gender = gender
    }
    
    fullName (){
      let a = this.firstName + ' ' + this.lastName;
      return a;
    }
    sayHi() {
        return 'Hello, my name is' + ' ' + this.fullName();
    }
}

const person = new Person();
console.log(person.sayHi());

class User extends Person{
    constructor(firstName, lastName, age, gender,signUpDate ,id) {
        super(firstName, lastName, age, gender);
        this.signUpDate = signUpDate,
        this.id = id;
    }
}

const users = [
    user1 = new User('Elvis','Prestley',99, 'Male',Date.now(),1),
    user2 = new User('Bugs','Bunny',22, 'Male', Date.now(),2),
    user3 = new User('Lola', 'Bunny',20, 'Female', Date.now(),3)
];
console.log(users);

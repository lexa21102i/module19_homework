function hasProperty(propertyName, obj) {
    return (propertyName in obj);
}

// Примеры использования:
const person = {
    name: "John",
    age: 30,
    city: "Moscow"
};
const student = Object.create(person);
student.ownCity = "Piter";

// Проверка собственных свойств
console.log(hasProperty("name", student));
console.log(hasProperty("ownCity", student));
console.log(hasProperty("age", student));
console.log(hasProperty("fdhjgdkj", student));
console.log(hasProperty("ownCity", person));
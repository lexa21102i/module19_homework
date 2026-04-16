function hasProperty(propertyName, obj) {
    return obj.hasOwnProperty(propertyName);
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

// Проверка с учетом унаследованных свойств
console.log(hasPropertyIncludeInherited("name", student));
console.log(hasPropertyIncludeInherited("ownCity", student));
console.log(hasPropertyIncludeInherited("age", student));
console.log(hasPropertyIncludeInherited("invalid", student));
function printOwnProperties(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`);
        }
    }
}

// Пример использования:
const person = {
    city: "Moscow"
}
const student = Object.create(person);
student.ownCity = "Piter";
student.name = "Stepan";
printOwnProperties(student);
console.log(student.city);
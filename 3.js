function createEmptyObject() {
    return Object.create(null);
}

// Пример использования:
const emptyObj = createEmptyObject();
console.log(emptyObj);

// Проверяем, что у объекта нет прототипа
console.log(Object.getPrototypeOf(emptyObj));
console.log(emptyObj.toString);
console.log(emptyObj.hasOwnProperty);

console.log(emptyObj.constructor);
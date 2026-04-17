// Родительский класс для электроприборов
class ElectricalAppliance {
  constructor(name, power) {
    this.name = name;
    this.power = power;
    this.isPlugged = false;
  }

// Метод для включения прибора в розетку
plugIn() {
    if (!this.isPlugged) {
      this.isPlugged = true;
      console.log(`${this.name} включен(а) в розетку.`);
    } else {
      console.log(`${this.name} уже включен(а) в розетку.`);
    }
}

// Метод для выключения прибора из розетки
unplug() {
    if (this.isPlugged) {
      this.isPlugged = false;
      console.log(`${this.name} выключен(а) из розетки.`);
    } else {
      console.log(`${this.name} уже выключен(а) из розетки.`);
    }
}

// Метод для получения текущей потребляемой мощности
getCurrentPower() {
    if (this.isPlugged) {
      console.log(`${this.name} потребляет ${this.power} Вт мощности.`);
      return this.power;
    } else {
      console.log(`${this.name} не включен(а) в розетку.`);
      return 0;
    }
  }
}

// Класс для настольной лампы
class DeskLamp extends ElectricalAppliance {
  constructor(name, power, brightness, colorTemperature) {
    super(name, power); 
    this.brightness = brightness;
    this.colorTemperature = colorTemperature;
}
setBrightness(percent) {
    if (percent >= 0 && percent <= 100) {
      this.brightness = percent;
      console.log(`Яркость лампы ${this.name} установлена на ${percent}%`);
      const actualPower = (this.power * percent) / 100;
      console.log(`Текущее потребление: ${actualPower.toFixed(1)} Вт`);
    } else {
        console.log('Яркость должна быть в диапазоне от 0 до 100');
    }
}
setColorTemperature(kelvin) {
    if (kelvin >= 2700 && kelvin <= 6500) {
      this.colorTemperature = kelvin;
      console.log(`Цветовая температура лампы ${this.name} установлена на ${kelvin}K`);
    } else {
        console.log('Цветовая температура должна быть в диапазоне 2700-6500K');
    }
}
getCurrentPower() {
    if (this.isPlugged) {
        const actualPower = (this.power * this.brightness) / 100;
        console.log(`${this.name} потребляет ${actualPower.toFixed(1)} Вт мощности (${this.brightness}% яркости).`);
        return actualPower;
    } else {
        console.log(`${this.name} не включен(а) в розетку.`);
        return 0;
    }
}
}

// Класс для компьютера
class Computer extends ElectricalAppliance {
    constructor(name, power, cpuModel, ramSize, isGaming) {
        super(name, power);
        this.cpuModel = cpuModel;
        this.ramSize = ramSize;
        this.isGaming = isGaming;
        this.cpuLoad = 0;
    }
runTask(taskName, cpuLoad) {
    if (!this.isPlugged) {
        console.log(`Невозможно запустить задачу "${taskName}". Компьютер ${this.name} не включен.`);
        return;
    }
    this.cpuLoad = Math.min(cpuLoad, 100);
    console.log(`Запущена задача "${taskName}" на компьютере ${this.name}`);
    console.log(`Нагрузка на процессор: ${this.cpuLoad}%`);
    const actualPower = (this.power * this.cpuLoad) / 100;
    console.log(`Текущее потребление: ${actualPower.toFixed(1)} Вт из ${this.power} Вт максимальных`);
}
stopTask() {
    if (!this.isPlugged) {
        console.log(`Компьютер ${this.name} не включен.`);
        return;
    }
    this.cpuLoad = 0;
    console.log(`Все задачи на компьютере ${this.name} завершены. Процессор простаивает.`);
    console.log(`Текущее потребление: 0 Вт`);
}

getCurrentPower() {
    if (this.isPlugged) {
        const actualPower = (this.power * this.cpuLoad) / 100;
        if (this.cpuLoad > 0) {
            console.log(`${this.name} потребляет ${actualPower.toFixed(1)} Вт мощности (нагрузка CPU: ${this.cpuLoad}%).`);
        } else {
            console.log(`${this.name} потребляет ${actualPower.toFixed(1)} Вт мощности (в режиме ожидания).`);
        }
        return actualPower;
    } else {
        console.log(`${this.name} не включен(а) в розетку.`);
        return 0;
    }
}

getSpecs() {
    console.log(`\nХарактеристики ${this.name}:`);
    console.log(`  Процессор: ${this.cpuModel}`);
    console.log(`  ОЗУ: ${this.ramSize} ГБ`);
    console.log(`  Тип: ${this.isGaming ? 'Игровой' : 'Офисный'}`);
    console.log(`  Максимальная мощность: ${this.power} Вт`);
}
}

// Функция для подсчета общей потребляемой мощности нескольких приборов
function calculateTotalPower(...appliances) {
    let totalPower = 0;
    appliances.forEach(appliance => {
        if (appliance.isPlugged) {
            const currentPower = appliance.getCurrentPower();
            totalPower += currentPower;
        }
    });

    console.log(`\nОбщая потребляемая мощность включенных приборов: ${totalPower.toFixed(1)} Вт`);
    return totalPower;
}

const deskLamp = new DeskLamp('Настольная лампа', 60, 75, 4000);
const gamingComputer = new Computer('Игровой компьютер', 500, 'Intel i9-13900K', 32, true);
const officeComputer = new Computer('Офисный компьютер', 250, 'Intel i5-12400', 16, false);

// Демонстрация работы
console.log('=== Иерархия электроприборов (ES6 классы) ===\n');

// Выводим информацию о приборах
console.log('Созданные приборы:');
console.log(deskLamp);
console.log(gamingComputer);
console.log(officeComputer);
console.log('\n');

// Работа с настольной лампой
console.log('--- Настольная лампа ---');
deskLamp.plugIn(); 
deskLamp.getCurrentPower(); 
deskLamp.setBrightness(50); 
deskLamp.setColorTemperature(3000); 
deskLamp.getCurrentPower(); 
deskLamp.unplug(); // Выключаем
deskLamp.getCurrentPower(); 
console.log('\n');

// Работа с игровым компьютером
console.log('--- Игровой компьютер ---');
gamingComputer.getSpecs(); 
gamingComputer.plugIn(); 
gamingComputer.getCurrentPower(); 
gamingComputer.runTask('Cyberpunk 2077', 95); 
gamingComputer.getCurrentPower(); 
gamingComputer.stopTask(); 
gamingComputer.getCurrentPower(); 
console.log('\n');

// Работа с офисным компьютером
console.log('--- Офисный компьютер ---');
officeComputer.getSpecs(); 
officeComputer.plugIn();
officeComputer.runTask('Microsoft Word', 15); 
officeComputer.runTask('Excel расчеты', 25); 
officeComputer.getCurrentPower(); 
officeComputer.stopTask();
officeComputer.unplug(); 
console.log('\n');

console.log('--- Подсчет общей мощности ---');

// Включаем несколько приборов для подсчета
deskLamp.plugIn();
deskLamp.setBrightness(80);
gamingComputer.plugIn();
officeComputer.plugIn();
officeComputer.runTask('Браузер с 10 вкладками', 30);

console.log('\n');
calculateTotalPower(deskLamp, gamingComputer, officeComputer);
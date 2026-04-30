
class ElectricalAppliance {
  constructor(name, power) {
    this.name = name;
    this.maxPower = power; // переименовано для ясности
    this.isPlugged = false;
  }

  plugIn() {
    if (!this.isPlugged) {
      this.isPlugged = true;
      console.log(`${this.name} включен(а) в розетку.`);
    } else {
      console.log(`${this.name} уже включен(а) в розетку.`);
    }
  }

  unplug() {
    if (this.isPlugged) {
      this.isPlugged = false;
      console.log(`${this.name} выключен(а) из розетки.`);
    } else {
      console.log(`${this.name} уже выключен(а) из розетки.`);
    }
  }

  // Принцип DRY: вынесения логики проверки включения
  isPluggedAndLog() {
    if (!this.isPlugged) {
      console.log(`${this.name} не включен(а) в розетку.`);
      return false;
    }
    return true;
  }

  // Принцип OCP: метод для переопределения, но с базовой реализацией
  // L (LSP) - все наследники должны возвращать число
  getCurrentPower() {
    if (!this.isPluggedAndLog()) return 0;
    return this.maxPower;
  }

  // Принцип KISS: простой метод без лишней логики
  getCurrentPowerFormatted() {
    const power = this.getCurrentPower();
    console.log(`${this.name} потребляет ${power.toFixed(1)} Вт мощности.`);
    return power;
  }
}

// I (ISP) - Вместо того чтобы заставлять все приборы иметь яркость/цвет, выносим в отдельную "роль"
const BrightnessAdjustable = {
  setBrightness(percent) {
    if (percent < 0 || percent > 100) {
      console.log('Яркость должна быть в диапазоне от 0 до 100');
      return;
    }
    this.brightness = percent;
    console.log(`Яркость ${this.name} установлена на ${percent}%`);
  },

  getCurrentPower() {
    if (!this.isPluggedAndLog()) return 0;
    const actualPower = (this.maxPower * (this.brightness ?? 100)) / 100;
    console.log(`${this.name} потребляет ${actualPower.toFixed(1)} Вт (${this.brightness}% яркости).`);
    return actualPower;
  }
};

// I (ISP) - интерфейс управления цветом вынесен отдельно
const ColorAdjustable = {
  setColorTemperature(kelvin) {
    if (kelvin < 2700 || kelvin > 6500) {
      console.log('Цветовая температура должна быть в диапазоне 2700-6500K');
      return;
    }
    this.colorTemperature = kelvin;
    console.log(`Цветовая температура ${this.name} установлена на ${kelvin}K`);
  }
};

// S (SRP) - класс отвечает только за комбинирование примесей
// O (OCP) - расширяет ElectricalAppliance, не изменяя его
// L (LSP) - корректно заменяет родителя: getCurrentPower() возвращает число
// I (ISP) - берёт ТОЛЬКО нужные интерфейсы (BrightnessAdjustable, ColorAdjustable)
class DeskLamp extends ElectricalAppliance {
  constructor(name, power, brightness = 100, colorTemperature = 4000) {
    super(name, power);
    this.brightness = brightness;
    this.colorTemperature = colorTemperature;
  }

  setBrightness(percent) {
    return BrightnessAdjustable.setBrightness.call(this, percent);
  }

  setColorTemperature(kelvin) {
    return ColorAdjustable.setColorTemperature.call(this, kelvin);
  }

  getCurrentPower() {
    return BrightnessAdjustable.getCurrentPower.call(this);
  }
}

// YAGNI: удалено неиспользуемое поле isGaming
// S (SRP) - класс отвечает только за логику компьютера (задачи, CPU)
// O (OCP) - расширяет базовый класс, не изменяя его
// L (LSP) - getCurrentPower() возвращает число, как и родитель
class Computer extends ElectricalAppliance {
  constructor(name, power, cpuModel, ramSize) {
    super(name, power);
    this.cpuModel = cpuModel;
    this.ramSize = ramSize;
    this.cpuLoad = 0; 
  }

  runTask(taskName, cpuLoad) {
    if (!this.isPluggedAndLog()) return;
    
    this.cpuLoad = Math.min(100, Math.max(0, cpuLoad));
    console.log(`Запущена задача "${taskName}" на ${this.name}`);
    console.log(`Нагрузка CPU: ${this.cpuLoad}%`);
  }

  stopTask() {
    if (!this.isPluggedAndLog()) return;
    this.cpuLoad = 0;
    console.log(`Задачи на ${this.name} завершены. CPU простаивает.`);
  }

  getCurrentPower() {
    if (!this.isPluggedAndLog()) return 0;
    const actualPower = (this.maxPower * this.cpuLoad) / 100;
    const state = this.cpuLoad > 0 ? `нагрузка CPU: ${this.cpuLoad}%` : 'режим ожидания';
    console.log(`${this.name} потребляет ${actualPower.toFixed(1)} Вт (${state})`);
    return actualPower;
  }

  getSpecs() {
    console.log(`\nХарактеристики ${this.name}:`);
    console.log(`  CPU: ${this.cpuModel}, RAM: ${this.ramSize} ГБ`);
    console.log(`  Макс. мощность: ${this.maxPower} Вт`);
  }
}

//DRY: единый способ получения мощности
// L (LSP) - работает с любым наследником ElectricalAppliance благодаря полиморфизму
const calculateTotalPower = (...appliances) => {
  let total = 0;
  for (const appliance of appliances) {
    if (appliance.isPlugged) {
      total += appliance.getCurrentPower();
    }
  }
  console.log(`\nОбщая мощность включённых приборов: ${total.toFixed(1)} Вт`);
  return total;
};

const lamp = new DeskLamp('Лампа', 60, 75, 4000);
const gamingPC = new Computer('Игровой ПК', 500, 'Intel i9', 32);
const officePC = new Computer('Офисный ПК', 250, 'Intel i5', 16);

lamp.plugIn();
lamp.setBrightness(50);
lamp.getCurrentPower();

gamingPC.plugIn();
gamingPC.runTask('Игра', 95);
gamingPC.getCurrentPower();

calculateTotalPower(lamp, gamingPC);
class Car {
  #brand;
  #model;
  #year;
  #maxSpeedCount;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume;
  #isStarted;
  #mileage;

  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeedCount,
    maxFuelVolume,
    fuelConsumption,
    currentFuelVolume,
    isStarted,
    mileage
  ) {
    this.#brand = this.invalidName(brand) ? null : brand;
    this.#model = this.invalidName(model) ? null : model;
    this.#year = this.invalidYear(yearOfManufacturing) ? null : yearOfManufacturing;
    this.#maxSpeedCount = this.invalidSpeedCount(maxSpeedCount) ? null : maxSpeedCount;
    this.#maxFuelVolume = this.invalidMaxFuel(maxFuelVolume) ? null : maxFuelVolume;
    this.#fuelConsumption = this.invalidCount(fuelConsumption) ? null : fuelConsumption;
    this.#currentFuelVolume = this.invalidCount(currentFuelVolume) ? 0 : currentFuelVolume;
    this.#isStarted = this.invalidIsStarted(isStarted) ? false : isStarted;
    this.#mileage = this.invalidCount(mileage) ? 0 : mileage;
  }

  invalidName(stringToCheck) {
    return typeof stringToCheck !== 'string' || stringToCheck.length < 1 || stringToCheck.length > 50;
  }

  invalidYear(countToCheck) {
    return typeof countToCheck !== 'number' || countToCheck < 1900 || countToCheck > new Date().getFullYear();
  }

  invalidSpeedCount(countToCheck) {
    return typeof countToCheck !== 'number' || countToCheck < 100 || countToCheck > 300;
  }

  invalidMaxFuel(countToCheck) {
    return typeof countToCheck !== 'number' || countToCheck < 5 || countToCheck > 20;
  }

  invalidCount(countToCheck) {
    return !Number.isFinite(countToCheck) || countToCheck < 0;
  }

  invalidMethodCount(countToCheck) {
    return !Number.isFinite(countToCheck) || countToCheck <= 0;
  }

  invalidIsStarted(booleanInput) {
    return typeof booleanInput !== 'boolean';
  }

  get brand() {
    return this.#brand;
  }

  set brand(brandString) {
    if (!this.invalidName(brandString)) {
      this.#brand = brandString;
    }
  }

  get model() {
    return this.#model;
  }

  set model(modelString) {
    if (!this.invalidName(modelString)) {
      this.#model = modelString;
    }
  }

  get yearOfManufacturing() {
    return this.#year;
  }

  set yearOfManufacturing(yearCount) {
    if (!this.invalidYear(yearCount)) {
      this.#year = yearCount;
    }
  }

  get maxSpeedCount() {
    return this.#maxSpeedCount;
  }

  set maxSpeedCount(countKilometersPerHour) {
    if (!this.invalidSpeedCount(countKilometersPerHour)) {
      this.#maxSpeedCount = countKilometersPerHour;
    }
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }

  set maxFuelVolume(countLitres) {
    if (!this.invalidMaxFuel(countLitres)) {
      this.#maxFuelVolume = countLitres;
    }
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }

  set fuelConsumption(countLitresPer100Km) {
    if (!this.invalidMethodCount(countLitresPer100Km)) {
      this.#fuelConsumption = countLitresPer100Km;
    }
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('???????????? ?????? ????????????????');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('???????????? ?????? ???? ????????????????');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(countLitres) {
    const cannotFit = countLitres > (this.#maxFuelVolume - this.#currentFuelVolume);

    if (this.invalidMethodCount(countLitres)) {
      throw new Error('???????????????? ???????????????????? ?????????????? ?????? ????????????????');
    } else if (cannotFit) {
      throw new Error('?????????????????? ?????? ????????????????????');
    }

    this.#currentFuelVolume += countLitres;
  }

  drive(countSpeed, countDurationInHours) {
    const distanceTraveledKm = countSpeed * countDurationInHours;
    const fuelRequiredLitres = (distanceTraveledKm / 100) * this.#fuelConsumption;

    switch (true) {
      case this.invalidMethodCount(countSpeed):
        throw new Error('???????????????? ????????????????');

      case this.invalidMethodCount(countDurationInHours):
        throw new Error('???????????????? ???????????????????? ??????????');

      case countSpeed > this.#maxSpeedCount:
        throw new Error('???????????? ???? ?????????? ?????????? ?????? ????????????');

      case !this.#isStarted:
        throw new Error('???????????? ???????????? ???????? ????????????????, ?????????? ??????????');

      case fuelRequiredLitres > this.#currentFuelVolume:
        throw new Error('???????????????????????? ??????????????');
        
      default:
        this.#currentFuelVolume -= fuelRequiredLitres;
        this.#mileage += distanceTraveledKm;
    }
  }
}
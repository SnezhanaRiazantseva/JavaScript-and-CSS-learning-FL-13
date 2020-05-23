const SECONDS_TWO = 2000;
const SECONDS_ONE_AND_HALF = 1500;
const MOTO_OVER_SPEED = 30;

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function Vehicle(color, engine) {
  this.color = color;
  this.engine = engine;
  this.model = 'unknown model';
  this.maxSpeed = 70;
  this.currentSpeed = 0;
  this.driveInterval;
  this.stopInterval;
  this.isDriving = false;
  this.isStopping = false;
  this.drivingSpeedArr = [];
  this.maxDrivingSpeed;
}

Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
  if (!this.currentSpeed) {
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
  } else {
    console.log(`You can't upgrade engine while driving. Please stop to upgrade engine.`);
  }
}

Vehicle.prototype.getInfo = function() {
  return {
    'engine': this.engine,
    'color': this.color,
    'maxSpeed': this.maxSpeed,
    'model': this.model
  }
}

Vehicle.prototype.drive = function() {
  if (this.isDriving) {
    console.log('Already driving');
    return;
  }
  this.isDriving = true;
  this.isStopping = false;
  clearInterval(this.stopInterval);

  this.driveInterval = setInterval(() => {
    this.currentSpeed += 20;
    this.drivingSpeedArr.push(this.currentSpeed);
    console.log(this.currentSpeed);
    if (this.currentSpeed > this.maxSpeed) {
      console.log('speed is too high, SLOW DOWN!');
    }
  }, SECONDS_TWO);
}

Vehicle.prototype.stop = function () {
  if (this.isStopping) {
    console.log('Already slows down');
    return;
  }
  if (!this.currentSpeed) {
    return;
  }
  this.isStopping = true;
  this.isDriving = false;
  clearInterval(this.driveInterval);

  this.stopInterval = setInterval(() => {
    this.currentSpeed -= 20;
    if (this.currentSpeed <= 0) {
      this.currentSpeed = 0;
      this.maxDrivingSpeed = getMaxOfArray(this.drivingSpeedArr);
      console.log(`Vehicle is stopped. Maximum speed during the drive was ${this.maxDrivingSpeed}`);

      clearInterval(this.stopInterval);
      this.isStopping = false;
      this.drivingSpeedArr.length = 0;
      this.maxDrivingSpeed = null;
      return;
    }
    console.log(this.currentSpeed);
  }, SECONDS_ONE_AND_HALF);
}

function Car(model, color, engine) {
  Vehicle.call(this, color, engine);
  this.model = model;
  this.maxSpeed = 80;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.stop = function () {
  if (this.isStopping) {
    console.log('Already slows down');
    return;
  }
  if (!this.currentSpeed) {
    return;
  }
  this.isStopping = true;
  this.isDriving = false;
  clearInterval(this.driveInterval);

  this.stopInterval = setInterval(() => {
    this.currentSpeed -= 20;
    if (this.currentSpeed <= 0) {
      this.currentSpeed = 0;
      this.maxDrivingSpeed = getMaxOfArray(this.drivingSpeedArr);
      console.log(`Car ${this.model} is stopped. Maximum speed during the drive was ${this.maxDrivingSpeed}`);

      clearInterval(this.stopInterval);
      this.isStopping = false;
      this.drivingSpeedArr.length = 0;
      this.maxDrivingSpeed = null;
      return;
    }
    console.log(this.currentSpeed);
  }, SECONDS_ONE_AND_HALF);
}

Car.prototype.changeColor = function(newColor){
  if (newColor !== this.color) {
    this.color = newColor;
  } else {
    console.log('The selected color is the same as the previous, please choose another one');
  }
}

function Motorcycle(model, color, engine) {
  Vehicle.call(this, color, engine);
  this.model = model;
  this.maxSpeed = 90;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;

Motorcycle.prototype.drive = function () {
  if (this.isDriving) {
    console.log('Already driving');
    return;
  }
  this.isDriving = true;
  this.isStopping = false;
  clearInterval(this.stopInterval);
  console.log(`Let’s drive`);
  this.driveInterval = setInterval(() => {
    this.currentSpeed += 20;
    console.log(this.currentSpeed);
    if (this.currentSpeed > this.maxSpeed && this.currentSpeed < this.maxSpeed + MOTO_OVER_SPEED) {
      console.log('speed is too high, SLOW DOWN!');
    }
    if (this.currentSpeed > this.maxSpeed && this.currentSpeed >= this.maxSpeed + MOTO_OVER_SPEED) {
      console.log('Engine overheating');
      this.stop();
    }
  }, SECONDS_TWO);
}

Motorcycle.prototype.stop = function () {
  if (this.isStopping) {
    console.log('Already slows down');
    return;
  }
  if (!this.currentSpeed) {
    return;
  }
  this.isStopping = true;
  this.isDriving = false;
  clearInterval(this.driveInterval);

  this.stopInterval = setInterval(() => {
    this.currentSpeed -= 20;
    if (this.currentSpeed <= 0) {
      this.currentSpeed = 0;
      console.log(`Motorcycle ${this.model} is stopped. Good drive`);

      clearInterval(this.stopInterval);
      this.isStopping = false;
      return;
    }
    console.log(this.currentSpeed);
  }, SECONDS_ONE_AND_HALF);
}
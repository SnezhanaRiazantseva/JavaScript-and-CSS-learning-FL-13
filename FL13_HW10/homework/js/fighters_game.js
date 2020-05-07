const MAX_POINT = 100;
const BY_DOUBLE = 2;

class Fighter {
  constructor(fighterObj) {
    this.fighterObj = fighterObj;
    this.fighterObj.win = 0;
    this.fighterObj.loss = 0;
  }
  getName() { 
    return this.fighterObj.name;
  }
  getDamage() {
    return this.fighterObj.damage;
  }
  getStrength() {
    return this.fighterObj.strength;
  }
  getAgility() {
    return this.fighterObj.agility;
  }
  getHealth() {
    return this.fighterObj.hp;
  }
  attack(defender) {
    if (Object.getPrototypeOf(defender) !== Fighter.prototype) {
      return;
    }
    const successProbability = MAX_POINT - (defender.fighterObj.strength + defender.fighterObj.agility);
    const random = getRandom(0, MAX_POINT);

    if (random < successProbability) {
      defender.dealDamage(this.fighterObj.damage);
      const result = `${this.fighterObj.name} makes ${this.fighterObj.damage} damage to ${defender.fighterObj.name}`;
      return result;
    } else {
      return `${this.fighterObj.name} attack missed`;
    }
  }
  logCombatHistory() {
    return `Name: ${this.fighterObj.name}, Wins: ${this.fighterObj.win}, Losses: ${this.fighterObj.loss}`
  }
  heal(plusHpPoints) {
    this.fighterObj.hp + plusHpPoints < MAX_POINT ? this.fighterObj.hp += plusHpPoints : this.fighterObj.hp = MAX_POINT;
  }
  dealDamage(minusHpPoints) {
    this.fighterObj.hp - minusHpPoints > 0 ? this.fighterObj.hp -= minusHpPoints : this.fighterObj.hp = 0;
  }
  addWin() {
    this.win++;
  }
  addLoss() {
    this.loss++;
  }
}

function battle(frontman, defender) {
  let hits = 0;

  function isAlive(dead) {
    if (!dead.fighterObj.hp) {
      console.log(`${dead.fighterObj.name} is dead and can't fight.`);
      return false;
    }
    return true;
  }

  isInBattle:
  while (isAlive(defender) && isAlive(frontman)) {
    if (hits % BY_DOUBLE === 0) {
      console.log(frontman.attack(defender));

      if (isAlive(defender)) {
        hits++;
      } else {
        defender.fighterObj.loss++;
        frontman.fighterObj.win++;
        break isInBattle;
      }
    } else {
      console.log(defender.attack(frontman));

      if (isAlive(frontman)) {
        hits++;
      } else {
        frontman.fighterObj.loss++;
        defender.fighterObj.win++;
        break isInBattle;
      }
    }
  }
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
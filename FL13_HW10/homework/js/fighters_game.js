const MAX_POINT = 100;
const BY_DOUBLE = 2;

class Fighter {
  constructor(fighterObj) {
    fighterObj.win = 0;
    fighterObj.loss = 0;
    this.getName = () => fighterObj.name;
    this.getDamage = () => fighterObj.damage;
    this.getStrength = () => fighterObj.strength;
    this.getAgility = () => fighterObj.agility;
    this.getHealth = () => fighterObj.hp;
    this.attack = defender => {
      if (Object.getPrototypeOf(defender) !== Fighter.prototype) {
        return;
      }

      const successProbability = MAX_POINT - (defender.getStrength() + defender.getAgility());
      const random = getRandom(0, MAX_POINT);

      if (random < successProbability) {
        defender.dealDamage(fighterObj.damage);
        const result = `${fighterObj.name} makes ${fighterObj.damage} damage to ${defender.getName()}`;
        return result;
      } else {
        return `${fighterObj.name} attack missed`;
      }
    }
    this.logCombatHistory = () => `Name: ${fighterObj.name}, Wins: ${fighterObj.win}, Losses: ${fighterObj.loss}`;
    this.heal = (plusHpPoints) => {
      fighterObj.hp + plusHpPoints < MAX_POINT ? fighterObj.hp += plusHpPoints : fighterObj.hp = MAX_POINT;
    }
    this.dealDamage = (minusHpPoints) => {
      fighterObj.hp - minusHpPoints > 0 ? fighterObj.hp -= minusHpPoints : fighterObj.hp = 0;
    }
    this.addWin = () => fighterObj.win++;
    this.addLoss = () => fighterObj.loss++;
  }
}

function battle(frontman, opposer) {
  if (!frontman.getHealth()) {
    console.log(`${frontman.getName()} is dead and can't fight.`);
  } else if (!opposer.getHealth()){
    console.log(`${opposer.getName()} is dead and can't fight.`);
  } else {
    let hits = 0;

    while (opposer.getHealth() > 0 && frontman.getHealth() > 0) {
      if (hits % BY_DOUBLE === 0) {
        console.log(frontman.attack(opposer));

        if (opposer.getHealth() > 0) {
          hits++;
        } else {
          console.log(`${frontman.getName()} has won!`);
          opposer.addLoss();
          frontman.addWin();
          break;
        }
      } else {
        console.log(opposer.attack(frontman));

        if (frontman.getHealth() > 0) {
          hits++;
        } else {
          console.log(`${opposer.getName()} has won!`);
          frontman.addLoss();
          opposer.addWin();
          break;
        }
      }
    }
  }
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
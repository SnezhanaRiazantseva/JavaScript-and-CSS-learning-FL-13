let checkAmount = prompt('Prompt check number')
let tipPercentage = prompt('Prompt tip percentage')
let maxTip = 100;
let hundred = 100;
let nAfterDot = 2;

function checkValues() {
  if(!checkAmount || !tipPercentage
|| isNaN(checkAmount) || isNaN(tipPercentage)
|| checkAmount < 0 || tipPercentage < 0
|| tipPercentage > maxTip) {
    alert('Invalid input data')
  } else {
    calculateTotalSum()
  }
}

function calculateTotalSum() {
    checkAmount = Number(checkAmount)
    tipPercentage = Number(tipPercentage)
    let tipAmount = checkAmount * tipPercentage / hundred
    let totalSum = checkAmount + tipAmount

    let arr = [checkAmount, tipPercentage, tipAmount, totalSum]
    arr = arr.map(a => a % 1 !== 0 ? a.toFixed(nAfterDot) : a)
    let [resCheckAmount, resTipPercentage, resTipAmount, resTotalSum] = arr;

    let result = `Check number: ${resCheckAmount}
Tip percentage: ${resTipPercentage}%
Tip amount: ${resTipAmount}
Total sum to pay: ${resTotalSum}`
    alert(result);
}

checkValues();

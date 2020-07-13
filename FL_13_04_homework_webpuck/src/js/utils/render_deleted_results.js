export function renderDeletedResults() {
  let pastResults = document.querySelectorAll('.round-result');
  for (let pastResult of pastResults) {
    pastResult.remove();
  }
  if (document.querySelector('.game-result')) {
    document.querySelector('.game-result').remove();
  }
}

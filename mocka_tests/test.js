describe('Copy array', function () {
  describe('Static array for copying', function () {
    const arr = [1, 2, 3]
    let res

    it(`copy ${arr} to new empty array`, function () {
      assert.deepEqual(res = copyArray(arr), arr)
    })
  });

  describe('Random arrays for copying', function () {

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function makeTest() {
      const arr1 = new Array(5).fill(0)
      const arr2 = arr1.map(el => getRandomInt(10));
      let res2

      it(`Random copy ${arr2} to new empty array`, function () {
        assert.deepEqual(res = copyArray(arr2), arr2)
      })
    }

    for (let x = 1; x <= 5; x++) {
      makeTest();
    }
  });
});
 /// HELPER FUNCTIONS
 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function getRandomBool() {
    return Math.random() >= 0.5;
  }

  function fractionToDecimal(fraction) {
    return fraction
      .split('/')
      .reduce((numerator, denominator, i) =>
        numerator / (i ? denominator : 1)
      );
  }
  
  function noteToFreq(note) {
    let a = 440; //frequency of A (coomon value is 440Hz)
    return (a / 32) * (2 ** ((note - 9) / 12));
}

/**
 * Get a random integer between `min` and `max`.
 * 
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
 function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
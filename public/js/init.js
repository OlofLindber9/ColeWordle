var dateStr = "2024-01-15";
var correctSongid;
function deterministicRandomIntFromDate(dateStr, minVal = 1, maxVal = 57) {
  // Create a SHA-256 hash of the input date string and return a Promise
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(dateStr))
    .then((hash) => {
      // Convert the SHA-256 hash to a hex string, then to an integer
      const hashArray = Array.from(new Uint8Array(hash)); // convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      let hashInt = parseInt(hashHex, 16);

      // Use the integer to seed a pseudo-random number generator
      let rng = hashInt % (maxVal - minVal + 1) + minVal;
      correctSongid = rng;

      // Return a value if needed, or just resolve the Promise
      return rng;
    });
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  async function main() {
      dateStr = getCurrentDate();
      await deterministicRandomIntFromDate(dateStr);
      document.dispatchEvent(new Event('initComplete'));
      console.log(correctSongid);
      console.log(dateStr);
    }

  main();
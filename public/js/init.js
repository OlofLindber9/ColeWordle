var correctSongId;

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const character = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function seededRandom(max, min, seed) {
  const random = Math.sin(seed) * 10000;
  return Math.floor((random - Math.floor(random)) * (max - min + 1)) + min;
}

function deterministicRandomIntFromDate(dateStr, minVal = 1, maxVal = 57) {
  const seed = hashString(dateStr);
  return seededRandom(maxVal, minVal, seed);
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  function main() {
  console.log('main function started');
  try {
    const dateStr = getCurrentDate();
    console.log(`Current Date: ${dateStr}`);
    
    window.correctSongId = deterministicRandomIntFromDate(dateStr);
    console.log(`Correct Song ID: ${correctSongId}`);
    
      // Dispatch the event after a brief timeout
    setTimeout(() => {
    document.dispatchEvent(new Event('initComplete'));
    console.log('initComplete event dispatched');
    }, 500); // Delay in milliseconds
    console.log('initComplete event dispatched');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

  main();




/*var dateStr;
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

  main(); */
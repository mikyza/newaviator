//Create Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the speed and direction of the dot
let speedX = 3;
let speedY = 1;

// Set the size of the canvas
canvas.width = 800;
canvas.height = 250;

// Set the starting position of the dot
// let x = canvas.width / 2;
// let y = canvas.height / 2;

let x = 0;
let y = canvas.height;

// Start the animation
let animationId = requestAnimationFrame(draw);

let dotPath = [];
let counter = 1.0;
let multiplier = 0;
let counterDepo = [1.01, 18.45, 2.02, 5.21, 1.22, 1.25, 2.03, 4.55, 65.11, 1.03, 1.10, 3.01, 8.85, 6.95, 11.01, 2.07, 4.05, 1.51, 1.02, 1.95, 1.05, 3.99, 2.89, 4.09, 11.20, 2.55];
randomStop =  Math.random() * 10; 
let cashedOut = false; // flag to indicate if the user has cashed out
let placedBet = false;
let isFlying = true;


// Load the image
const image = new Image();
image.src = './img/aviator_jogo.png';
image.style.minWidth = '100%';
image.style.width = '100%';


let balanceAmount = document.getElementById('balance-amount');
let calculatedBalanceAmount = 100;
balanceAmount.textContent = calculatedBalanceAmount.toString() + '€';
let betButton = document.getElementById('bet-button');
betButton.textContent = 'Bet';

//Previous Counters
let lastCounters = document.getElementById('last-counters');
let counterItem = lastCounters.getElementsByTagName('p');
let classNameForCounter = '';
function generateNewCounter() {
    let length = counterDepo.length;

    // Ensure we have at least two previous values
    if (length < 2) {
        return Math.random() * 10; // Default random value if not enough data
    }

    let lastValue = counterDepo[length - 1];  // Last counter value
    let secondLastValue = counterDepo[length - 2];  // Second last counter value

    let newCounter;

    // If both previous values are high, force a low crash
    if (lastValue > 10 && secondLastValue > 10) {
        newCounter = (Math.random() * 1.5) + 1; // Forces crash between 1.00 and 2.50
    } else {
        // Normal random generation using average with slight randomness
        newCounter = getRandomCrashMultiplier();
    }

    // Ensure the value stays within the range of 1 to 1037
    newCounter = Math.max(1, Math.min(newCounter, 1037));

    // Add new counter to the array
    counterDepo.push(newCounter);

    // Update the UI with the new value
    updateCounterDepo();
}
window.onload = resizeGameCanvas;
window.onresize = resizeGameCanvas;

function resizeGameCanvas() {
    let canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.width = Math.min(window.innerWidth * 0.9, 500); 
        canvas.height = canvas.width * 0.5; 
    }
}




function updateCounterDepo() {

    lastCounters.innerHTML = counterDepo.map(function (i) {

            if ((i < 2.00)) {
                classNameForCounter = 'blueBorder';

            } else if ((i >= 2) && (i < 10)) {

                classNameForCounter = 'purpleBorder';
            } else classNameForCounter = 'burgundyBorder';

            return '<p' + ' class=' + classNameForCounter + '>' + i + '</p>'
        }
        // `<p style=`{classVar}`>${i}</p>`

    ).join('');
}

//Hide letter E from input
let inputBox = document.getElementById("bet-input");

let invalidChars = ["-", "+", "e",];

inputBox.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
});


let messageField = document.getElementById('message');
messageField.textContent = 'Wait for the next round';


//Animation
function draw() {
    //Counter
    counter += 0.0051;
    document.getElementById('counter').textContent = counter.toFixed(2) + 'x';

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Call the function to update the counter item initially
    updateCounterDepo();

    x += speedX;
    // Calculate the new position of the dot
    if (counter < randomStop) {
        y -= speedY;
        y = canvas.height / 2 + 50 * Math.cos(x / 100);
        isFlying = true;
    } else {
        x = 0;
        y = 0;
        isFlying = false;
    }

    // Check if it's time to stop the animation
    if (counter >= randomStop) {

        messageField.textContent = 'Place your bet';

        // Stop the animation
        cancelAnimationFrame(animationId);

        counterDepo.unshift(counter.toFixed(2));

        // Wait for 8 seconds and then start a new animation
        setTimeout(() => {

            // Generate a new randomStop value and reset the counter to 1
           
 

// Generate a random crash multiplier
// Define crash multiplier ranges
const crash1 = [0, 0, 0, 0, 0, 0, 0, 0]; // Frequent crashes at 1.0
const crash2 = Array.from({ length: 54 }, (_, i) => (1.12 + i * 0.01).toFixed(2)).map(Number);
const crash3 = [   4.99, 5.00, 5.01, 5.02, 5.03, 5.04, 5.05, 5.06, 5.07, 5.08, 5.09, 5.10, 5.11, 
    5.12, 5.13, 5.14, 5.15, 5.16, 5.17, 5.18, 5.19, 5.20, 5.21, 5.22, 5.23, 5.24, 
    5.25, 5.26, 5.27, 5.28, 5.29, 5.30, 5.31, 5.32, 5.33, 5.34, 5.35, 5.36, 5.37, 
    5.38, 5.39, 5.40, 5.41, 5.42, 5.43, 5.44, 5.45, 5.46, 5.47, 5.48, 5.49, 5.50, 
    5.51, 5.52, 5.53, 5.54, 5.55, 5.56, 5.57, 5.58, 5.59, 5.60, 5.61, 5.62, 5.63, 
    5.64, 5.65, 5.66, 5.67, 5.68, 5.69, 5.70, 5.71, 5.72, 5.73, 5.74, 5.75, 5.76, 
    5.77, 5.78, 5.79, 5.80, 5.81, 5.82, 5.83, 5.84, 5.85, 5.86, 5.87, 5.88, 5.89, 
    5.90, 5.91, 5.92, 5.93, 5.94, 5.95, 5.96, 5.97, 5.98, 5.99, 6.00, 6.01, 6.02, 
    6.03, 6.04, 6.05, 6.06, 6.07, 6.08, 6.09, 6.10, 6.11, 6.12, 6.13, 6.14, 6.15, 
    6.16, 6.17, 6.18, 6.19, 6.20, 6.21, 6.22, 6.23, 6.24, 6.25, 6.26, 6.27, 6.28, 
    6.29, 6.30, 6.31, 6.32, 6.33, 6.34, 6.35, 6.36, 6.37, 6.38, 6.39, 6.40, 6.41, 
    6.42, 6.43, 6.44, 6.45, 6.46, 6.47, 6.48, 6.49, 6.50, 6.51, 6.52, 6.53, 6.54, 
    6.55, 6.56, 6.57, 6.58, 6.59, 6.60, 6.61, 6.62, 6.63, 6.64, 6.65, 6.66, 6.67, 
    6.68, 6.69, 6.70, 6.71, 6.72, 6.73, 6.74, 6.75, 6.76, 6.77, 6.78, 6.79, 6.80, 
    6.81, 6.82, 6.83, 6.84, 6.85, 6.86, 6.87, 6.88, 6.89, 6.90, 6.91, 6.92, 6.93, 
    6.94, 6.95, 6.96, 6.97, 6.98, 6.99, 7.00, 7.01, 7.02, 7.03, 7.04, 7.05, 7.06, 
    7.07, 7.08, 7.09, 7.10, 7.11, 7.12, 7.13, 7.14, 7.15, 7.16, 7.17, 7.18, 7.19, 
    7.20, 7.21, 7.22, 7.23, 7.24, 7.25, 7.26, 7.27, 7.28, 7.29, 7.30, 7.31, 7.32, 
    7.33, 7.34, 7.35, 7.36, 7.37, 7.38, 7.39, 7.40, 7.41, 7.42, 7.43, 7.44, 7.45, 
    7.46, 7.47, 7.48, 7.49, 7.50, 7.51, 7.52, 7.53, 7.54, 7.55, 7.56, 7.57, 7.58, 
    7.59, 7.60, 7.61, 7.62, 7.63, 7.64, 7.65, 7.66, 7.67, 7.68, 7.69, 7.70, 7.71, 
    7.72, 7.73, 7.74, 7.75, 7.76, 7.77, 7.78, 7.79, 7.80, 7.81, 7.82, 7.83, 7.84, 
    7.85, 7.86, 7.87, 7.88, 7.89, 7.90, 7.91, 7.92, 7.93, 7.94, 7.95, 7.96, 7.97, 
    7.98, 7.99, 8.00, 8.01, 8.02, 8.03, 8.04, 8.05, 8.06, 8.07, 8.08, 8.09, 8.10, 
    8.11, 8.12, 8.13, 8.14, 8.15, 8.16, 8.17, 8.18, 8.19, 8.20, 8.21, 8.22, 8.23, 
    8.24, 8.25, 8.26, 8.27, 8.28, 8.29, 8.30, 8.31, 8.32, 8.33, 8.34, 8.35, 8.36, 
    8.37, 8.38, 8.39, 8.40, 8.41, 8.42, 8.43, 8.44, 8.45, 8.46, 8.47, 8.48, 8.49, 
    8.50, 8.51, 8.52, 8.53, 8.54, 8.55, 8.56, 8.57, 8.58, 8.59, 8.60, 8.61, 8.62, 
    8.63, 8.64, 8.65, 8.66, 8.67, 8.68, 8.69, 8.70, 8.71, 8.72, 8.73, 8.74, 8.75, 
    8.76, 8.77, 8.78, 8.79, 8.80, 8.81, 8.82, 8.83, 8.84, 8.85, 8.86, 8.87, 8.88,
     8.89, 8.90, 8.91, 8.92, 8.93, 8.94, 8.95, 8.96, 8.97, 8.98, 8.99, 9.00, 9.01,
      9.02, 9.03, 9.04, 9.05, 9.06, 9.07, 9.08, 9.09, 9.10, 9.11, 9.12, 9.13, 9.14,
       9.15, 9.16, 9.17, 9.18, 9.19, 9.20, 9.21, 9.22, 9.23, 9.24, 9.25, 9.26, 9.27,
        9.28, 9.29, 9.30, 9.31, 9.32, 9.33, 9.34, 9.35, 9.36, 9.37, 9.38, 9.39, 9.40,
         9.41, 9.42, 9.43, 9.44, 9.45, 9.46, 9.47, 9.48, 9.49, 9.50, 9.51, 9.52, 9.53, 
         9.54, 9.55, 9.56, 9.57, 9.58, 9.59, 9.60, 9.61, 9.62, 9.63, 9.64, 9.65, 9.66, 
         9.67, 9.68, 9.69, 9.70, 9.71, 9.72, 9.73, 9.74, 9.75, 9.76, 9.77, 9.78, 9.79, 
         9.80, 9.81, 9.82, 9.83, 9.84, 9.85, 9.86, 9.87, 9.88, 9.89, 9.90, 9.91, 9.92, 
         9.93, 9.94, 9.95, 9.96, 9.97, 9.98, 9.99, 10.00, 10.01, 10.02, 10.03, 10.04, 
         10.05, 10.06, 10.07, 10.08, 10.09, 10.10, 10.11, 10.12, 10.13, 10.14, 10.15, 
         10.16, 10.17, 10.18, 10.19, 10.20, 10.21, 10.22, 10.23, 10.24, 10.25, 10.26,
          10.27, 10.28, 10.29, 10.30, 10.31, 10.32, 10.33, 10.34, 10.35, 10.36, 10.37,
           10.38, 10.39, 10.40, 10.41, 10.42, 10.43, 10.44, 10.45, 10.46, 10.47, 10.48,
            10.49, 10.50, 10.51, 10.52, 10.53, 10.54, 10.55, 10.56, 10.57, 10.58, 10.59,
             10.60, 10.61, 10.62, 10.63, 10.64, 10.65, 10.66, 10.67, 10.68, 10.69, 10.70,
              10.71, 10.72, 10.73, 10.74, 10.75, 10.76, 10.77, 10.78, 10.79, 10.80, 10.81,
               10.82, 10.83, 10.84, 10.85, 10.86, 10.87, 10.88, 10.89, 10.90, 10.91, 10.92, 
               10.93, 10.94, 10.95, 10.96, 10.97, 10.98, 10.99, 11.00, 11.01, 11.02, 11.03, 
               11.04, 11.05, 11.06, 11.07, 11.08, 11.09, 11.10, 11.11, 11.12, 11.13, 11.14,
                11.15, 11.16, 11.17, 11.18, 11.19, 11.20, 11.21, 11.22, 11.23, 11.24, 11.25, 
                11.26, 11.27, 11.28, 11.29, 11.30, 11.31, 11.32, 11.33, 11.34, 11.35, 11.36, 
                11.37, 11.38, 11.39, 11.40, 11.41, 11.42, 11.43, 11.44, 11.45, 11.46, 11.47, 
                11.48, 11.49, 11.50, 11.51, 11.52, 11.53, 11.54, 11.55, 11.56, 11.57, 11.58, 
                11.59, 11.60, 11.61, 11.62, 11.63, 11.64, 11.65, 11.66, 11.67, 11.68, 11.69, 
                11.70, 11.71, 11.72, 11.73, 11.74, 11.75, 11.76, 11.77, 11.78, 11.79, 11.80, 
                11.81, 11.82, 11.83, 11.84, 11.85, 11.86, 11.87, 11.88, 11.89, 11.90, 11.91, 
                11.92, 11.93, 11.94, 11.95, 11.96, 11.97, 11.98, 11.99, 12.00, 12.01, 12.02, 
                12.03, 12.04, 12.05, 12.06, 12.07, 12.08, 12.09, 12.10, 12.11, 12.12, 12.13, 
                12.14, 12.15, 12.16, 12.17, 12.18, 12.19, 12.20, 12.21, 12.22, 12.23, 12.24, 
                12.25, 12.26, 12.27, 12.28, 12.29, 12.30, 12.31, 12.32, 12.33, 12.34, 12.35, 
                12.36, 12.37, 12.38, 12.39, 12.40, 12.41, 12.42, 12.43, 12.44, 12.45, 12.46, 
                12.47, 12.48, 12.49, 12.50, 12.51, 12.52, 12.53, 12.54, 12.55, 12.56, 12.57, 
                12.58, 12.59, 12.60, 12.61, 12.62, 12.63, 12.64, 12.65, 12.66, 12.67, 12.68, 
                12.69, 12.70, 12.71, 12.72, 12.73, 12.74, 12.75, 12.76, 12.77, 12.78, 12.79, 
                12.80, 12.81, 12.82, 12.83, 12.84, 12.85, 12.86, 12.87, 12.88, 12.89, 12.90, 
                12.91, 12.92, 12.93, 12.94, 12.95, 12.96, 12.97, 12.98, 12.99];
const crash4 = [ 2.00, 2.01, 2.02, 2.03, 2.04, 2.05, 2.06, 2.07, 2.08, 2.09, 2.10, 2.11, 2.12, 2.13, 2.14, 
    2.15, 2.16, 2.17, 2.18, 2.19, 2.20, 2.21, 2.22, 2.23, 2.24, 2.25, 2.26, 2.27, 2.28, 2.29,
     2.30, 2.31, 2.32, 2.33, 2.34, 2.35, 2.36, 2.37, 2.38, 2.39, 2.40, 2.41, 2.42, 2.43, 2.44, 
     2.45, 2.46, 2.47, 2.48, 2.49, 2.50, 2.51, 2.52, 2.53, 2.54, 2.55, 2.56, 2.57, 2.58, 2.59, 
     2.60, 2.61, 2.62, 2.63, 2.64, 2.65, 2.66, 2.67, 2.68, 2.69, 2.70, 2.71, 2.72, 2.73, 2.74, 
     2.75, 2.76, 2.77, 2.78, 2.79, 2.80, 2.81, 2.82, 2.83, 2.84, 2.85, 2.86, 2.87, 2.88, 2.89, 
     2.90, 2.91, 2.92, 2.93, 2.94, 2.95, 2.96, 2.97, 2.98, 2.99, 3.00, 3.01, 3.02, 3.03, 3.04, 
     3.05, 3.06, 3.07, 3.08, 3.09, 3.10, 3.11, 3.12, 3.13, 3.14, 3.15, 3.16, 3.17, 3.18, 3.19, 
     3.20, 3.21, 3.22, 3.23, 3.24, 3.25, 3.26, 3.27, 3.28, 3.29, 3.30, 3.31, 3.32, 3.33, 3.34, 
     3.35, 3.36, 3.37, 3.38, 3.39, 3.40, 3.41, 3.42, 3.43, 3.44, 3.45, 3.46, 3.47, 3.48, 3.49];
const crash5 = [3.50, 3.51, 3.52, 3.53, 3.54, 3.55, 3.56, 3.57, 3.58, 3.59, 3.60, 3.61, 3.62, 3.63, 3.64,
    3.65, 3.66, 3.67, 3.68, 3.69, 3.70, 3.71, 3.72, 3.73, 3.74, 3.75, 3.76, 3.77, 3.78, 3.79,
     3.80, 3.81, 3.82, 3.83, 3.84, 3.85, 3.86, 3.87, 3.88, 3.89, 3.90, 3.91, 3.92, 3.93, 3.94,
      3.95, 3.96, 3.97, 3.98, 3.99];

 const crash7=[
        4.50, 4.51, 4.52, 4.53, 4.54, 4.55, 4.56, 4.57, 4.58, 4.59, 4.60, 4.61, 4.62, 4.63, 4.64, 4.65, 
        4.66, 4.67, 4.68, 4.69, 4.70, 4.71, 4.72, 4.73, 4.74, 4.75, 4.76, 4.77, 4.78, 4.79, 4.80, 4.81, 
        4.82, 4.83, 4.84, 4.85, 4.86, 4.87, 4.88, 4.89, 4.90, 4.91, 4.92, 4.93, 4.94, 4.95, 4.96, 4.97, 
        4.98, 4.99]

const crash6 = Array.from({ length: 200 }, (_, i) => (14.00 + i * 0.01).toFixed(2)).map(Number);

// Function to generate crash multipliers with weighted randomness
function getRandomCrashMultiplier() {
    let randyy = Math.random() * 10; // Generates value between 0 and 10
    let crashMultiplier;

    if (randyy < 3.0) {
        // 40% chance: Very frequent crashes at 1.00
        crashMultiplier = crash1[Math.floor(Math.random() * crash1.length)];
    } else if (randyy < 4.0) {
        // 8% chance: Higher crashes (2.00 - 3.50)
        crashMultiplier = crash2[Math.floor(Math.random() * crash2.length)];
    }else if (randyy < 3.5) {
        // 8% chance: Higher crashes (2.00 - 3.50)
        crashMultiplier = crash1[Math.floor(Math.random() * crash1.length)];
    }
    else if (randyy < 5) {
        // 30% chance: Slightly higher crashes (1.12 - 1.65)
        crashMultiplier = crash2[Math.floor(Math.random() * crash2.length)];
    } else if (randyy < 6) {
        // 20% chance: Mid-range crashes (1.66 - 2.00)
        crashMultiplier = crash3[Math.floor(Math.random() * crash3.length)];
    } else if (randyy < 6.5) {
        // 8% chance: Higher crashes (2.00 - 3.50)
        crashMultiplier = crash1[Math.floor(Math.random() * crash1.length)];
    }
    else if (randyy < 7) {
        // 8% chance: Higher crashes (2.00 - 3.50)
        crashMultiplier = crash4[Math.floor(Math.random() * crash4.length)];
    } else if (randyy < 7.5) {
        // 8% chance: Higher crashes (2.00 - 3.50)
        crashMultiplier = crash7[Math.floor(Math.random() * crash7.length)];
    }
    else if (randyy < 8) {
        // 8% chance: Higher crashes (2.00 - 3.50)
        crashMultiplier = crash5[Math.floor(Math.random() * crash5.length)];

    }else if (randyy < 9.0) {
        // 8% chance: Higher crashes (2.00 - 3.50)
        crashMultiplier = crash6[Math.floor(Math.random() * crash6.length)];
    }


    else {
        // 2% chance: Random huge crashes (3.50 - 1037.00)
        crashMultiplier = (30.50 + Math.random() * (1037.00 - 3.50)).toFixed(2);
    }

    return parseFloat(crashMultiplier);
}

// Generate crash multiplier
let crashStop = getRandomCrashMultiplier();
randomStop=crashStop;



            
            
            counter = 1.0;
            x = canvas.width / 2;
            y = canvas.height / 2;
            dotPath = [];
            cashedOut = false;
            isFlying = true;
            messageField.textContent = '';

            if (!placedBet && cashedOut) {
                betButton.textContent = 'Bet';
            }

            // Start the animation again
            animationId = requestAnimationFrame(draw);

        }, 8000);

        return;
    }

    // Push the dot's current coordinates into the dotPath array
    dotPath.push({ x: x, y: y });

    // Calculate the translation value for the canvas
    const canvasOffsetX = canvas.width / 2 - x;
    const canvasOffsetY = canvas.height / 2 - y;

    // Save the current transformation matrix
    ctx.save();

    // Translate the canvas based on the dot's position
    ctx.translate(canvasOffsetX, canvasOffsetY);


    // Draw the dot's path
    for (let i = 1; i < dotPath.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = '#dc3545';
        ctx.moveTo(dotPath[i - 1].x, dotPath[i - 1].y);
        ctx.lineTo(dotPath[i].x, dotPath[i].y);
        ctx.stroke();
    }

    // Draw the dot
    ctx.beginPath();
    ctx.fillStyle = '#dc3545';
    ctx.lineWidth = 5;
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the image on top of the dot
    ctx.drawImage(image, x - 28, y - 78, 185, 85);

    // Restore the transformation matrix to its original state
    ctx.restore();

    // Request the next frame of the animation
    animationId = requestAnimationFrame(draw);
}

// Start the animation
draw();

betButton.addEventListener('click', () => {

    if (placedBet) {
        cashOut();
    } else {
        placeBet();
    }
    if (!placedBet && !isFlying) {
        messageField.textContent = 'Place your bet';
    }

});


// Function to place a bet
function placeBet() {

    if (placedBet || inputBox.value === 0 || isNaN(inputBox.value) || isFlying || inputBox.value > calculatedBalanceAmount) {
        // user has already placed bet or has not placed a bet
        messageField.textContent = 'Wait for the next round';
        return;
    }

    if ((counter >= randomStop) && !isFlying && (inputBox.value <= calculatedBalanceAmount)) {
        // Only allow betting if animation is not running
        if (inputBox.value && (inputBox.value <= calculatedBalanceAmount)) {
            calculatedBalanceAmount -= inputBox.value;
            balanceAmount.textContent = calculatedBalanceAmount.toFixed(2).toString() + '€';
            betButton.textContent = 'Cash Out';
            placedBet = true;
            messageField.textContent = 'Placed Bet';
        } else {
            messageField.textContent = 'Insufficient balance to place bet';
        }
    } else {
        if (isFlying) {
            messageField.textContent = 'Wait for the next round';
        }

    }
}

// Function to cash out bet
function cashOut() {

    if (cashedOut || (inputBox.value === 0)) {
        // user has already cashed out or has not placed a bet
        messageField.textContent = 'Wait for the next round';
        return;
    }

    if ((counter < randomStop)) {
        const winnings = inputBox.value * counter; // Calculate winnings based on counter
        calculatedBalanceAmount += winnings; // Add winnings to balance
        balanceAmount.textContent = calculatedBalanceAmount.toFixed(2).toString() + '€';

        cashedOut = true; // set flag to indicate user has cashed out
        placedBet = false;
        betButton.textContent = 'Bet';
        messageField.textContent = `Bet cashed out: ${winnings.toFixed(2)}`;
    } else {
        messageField.textContent = "Can't cash out now";
    }
}



let isMusicPlaying = false;  // To track if music is playing
let music = document.getElementById('birthdayMusic');  // Music element
let crackerContainer = document.getElementById('crackerContainer');  // Cracker container

// Function to play the music when the card is opened
function playMusic() {
  music.play();  // Play the audio
  isMusicPlaying = true;  // Set music state to playing
}

// Function to stop the music
function stopMusic() {
  music.pause();  // Pause the audio
  music.currentTime = 0;  // Reset to start
  isMusicPlaying = false;  // Set music state to stopped
}

// Function to create confetti and trigger the music
function createConfetti() {
  const numberOfConfetti = 100; // Number of confetti particles
  const confettiContainer = document.body; // Container where confetti will appear

  // Trigger cracker burst after music starts
  createCrackerBurst();

  // Generate confetti particles
  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    const randomDelay = Math.random() * 2; // Random delay for fall animation
    const randomDuration = 3 + Math.random() * 2; // Random animation duration for spin

    confetti.style.left = `${randomX}px`;
    confetti.style.top = `${randomY}px`;
    confetti.style.animationDuration = `${randomDuration}s`; // Spin duration
    confetti.style.animationDelay = `${randomDelay}s`; // Fall delay

    const colorArray = ['#ff6060', '#ff9f00', '#4bbf73', '#00aaff', '#ff66cc'];
    const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    confetti.style.backgroundColor = randomColor;

    confettiContainer.appendChild(confetti);

    // Remove the confetti after animation is complete
    setTimeout(() => {
      confetti.remove();
    }, (randomDuration + randomDelay) * 1000);
  }
}

// Function to trigger the cracker burst (fireworks effect)
function createCrackerBurst() {
  crackerContainer.style.display = 'block'; // Show the cracker container

  for (let i = 0; i < 50; i++) {
    const cracker = document.createElement('div');
    cracker.classList.add('cracker');

    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    cracker.style.setProperty('--x', `${x}px`);
    cracker.style.setProperty('--y', `${y}px`);

    cracker.style.animationDelay = `${Math.random() * 1}s`;

    crackerContainer.appendChild(cracker);

    // Remove cracker after animation is done
    setTimeout(() => {
      crackerContainer.removeChild(cracker);
    }, 1000);
  }

  // Hide the cracker container after some time
  setTimeout(() => {
    crackerContainer.style.display = 'none';
  }, 2000);
}

// Handle button click event for music play/stop and confetti burst
let lastClickTime = 0;
document.querySelector('.specialButton').addEventListener('click', function() {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastClickTime;

  if (timeDifference < 300) {  // Detect double click within 300ms
    // Double click detected, stop the music and hide confetti
    if (isMusicPlaying) {
      stopMusic();
      crackerContainer.style.display = 'none';  // Hide the cracker burst
    }
  } else {
    // Single click, play music and create confetti & cracker burst
    if (!isMusicPlaying) {
      playMusic();
      createConfetti();
    }
  }

  lastClickTime = currentTime;  // Update the last click time
});

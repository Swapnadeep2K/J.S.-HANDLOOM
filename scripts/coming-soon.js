const swipeCircle = document.getElementById('swipeCircle');
const notifyButton = document.getElementById('notifyButton');

// swipeCircle.style.left = '0.5rem'

let isDragging = false;
let startX = 0;
let buttonWidth = notifyButton.offsetWidth;
let maxTranslateX = buttonWidth - swipeCircle.offsetWidth - 16;

// Function to complete the swipe (YES)
const completeSwipe = () => {
  swipeCircle.style.transform = `translateX(${maxTranslateX}px)`;
  notifyButton.classList.add('active');
  alert('You selected YES! Thank you.');
};

// Function to reset the swipe (NO)
const resetSwipe = () => {
  swipeCircle.style.transform = 'translateX(0px)';
  notifyButton.classList.remove('active');
  alert('You selected NO!');
};

// Mouse down event to start dragging
swipeCircle.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  swipeCircle.style.cursor = 'grabbing';
});

// Mouse move event to handle dragging
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  // Restrict movement between 0px (left boundary) and maxTranslateX (right boundary)
  if (dx >= 0 && dx <= maxTranslateX) {
    swipeCircle.style.transform = `translateX(${dx}px)`;
  }
});

// Mouse up event to finalize the swipe action
document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  swipeCircle.style.cursor = 'grab';

  const finalX = parseInt(swipeCircle.style.transform.replace('translateX(', '').replace('px)', '') || 0);

  // Snap to YES or NO based on the 50% threshold
  if (finalX >= maxTranslateX / 2) {
    completeSwipe(); // Snap to YES
  } else {
    resetSwipe(); // Snap to NO
  }
});

// Click event to toggle based on the current state
swipeCircle.addEventListener('click', () => {
  const currentX = parseInt(swipeCircle.style.transform.replace('translateX(', '').replace('px)', '') || 0);
  if (notifyButton.classList.contains('active')) {
    resetSwipe(); // Toggle to NO
  } else {
    completeSwipe(); // Toggle to YES
  }
});

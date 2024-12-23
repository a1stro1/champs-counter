// Initialize like count from localStorage or start at 0
let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;

// Check if the user has already liked the button
let userLiked = localStorage.getItem('userLiked') === 'true';

// Get the like button and the like count display element
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Update the UI based on the saved state
if (userLiked) {
  likeButton.classList.add('liked');
}
likeCountDisplay.textContent = likeCount;

// Add event listener to the like button
likeButton.addEventListener('click', function () {
  if (userLiked) {
    // If the user has already liked, remove the like
    likeButton.classList.remove('liked');
    likeCount--;
    userLiked = false;
  } else {
    // If the user has not liked, add the like
    likeButton.classList.add('liked');
    likeCount++;
    userLiked = true;
  }

  // Save the state in localStorage
  localStorage.setItem('likeCount', likeCount);
  localStorage.setItem('userLiked', userLiked);

  // Update the like count display
  likeCountDisplay.textContent = likeCount;
});

// Initialize like count
let likeCount = 0;

// Get the like button and the like count display element
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Add event listener to the like button
likeButton.addEventListener('click', function() {
  // Check if the button is currently liked
  const isLiked = likeButton.classList.contains('liked');
  
  if (isLiked) {
    // If the button is liked, remove the 'liked' class and decrease the count
    likeButton.classList.remove('liked');
    likeCount--;  // Decrease like count
  } else {
    // If the button is not liked, add the 'liked' class and increase the count
    likeButton.classList.add('liked');
    likeCount++;  // Increase like count
  }

  // Update the like count display
  likeCountDisplay.textContent = likeCount;
});

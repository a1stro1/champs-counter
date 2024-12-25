// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAukFEfT1jZfW0fOIDCeLCgdgBaakDz40k",
  authDomain: "champ-counter.firebaseapp.com",
  projectId: "champ-counter",
  databaseURL: "https://champ-counter-default-rtdb.firebaseio.com",
  storageBucket: "champ-counter.appspot.com",
  messagingSenderId: "280928553583",
  appId: "1:280928553583:web:3532d82486f87387cb5b9a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);
const likesRef = db.ref('likes');
const userLikesRef = db.ref('userLikes');

// Get elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Unique user identifier (e.g., session ID, user ID from auth)
const userId = `user_${Math.random().toString(36).substring(2, 15)}`;

// Track user's like status
let userLiked = false;

// Fetch and update the like count
likesRef.on('value', (snapshot) => {
  const likeCount = snapshot.val() || 0;
  likeCountDisplay.textContent = likeCount;
});

// Check if the user already liked
userLikesRef.child(userId).on('value', (snapshot) => {
  userLiked = snapshot.val() || false;
  updateLikeButtonUI();
});

// Handle like button click
likeButton.addEventListener('click', () => {
  if (userLiked) {
    // Unlike
    likesRef.transaction((currentLikes) => (currentLikes || 0) - 1);
    userLikesRef.child(userId).set(false);
  } else {
    // Like
    likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
    userLikesRef.child(userId).set(true);
  }
});

// Update the like button appearance
function updateLikeButtonUI() {
  if (userLiked) {
    likeButton.classList.add('liked');
    likeButton.textContent = 'Unlike';
  } else {
    likeButton.classList.remove('liked');
    likeButton.textContent = 'Like';
  }
}

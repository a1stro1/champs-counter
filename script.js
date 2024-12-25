// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAukFEfT1jZfW0fOIDCeLCgdgBaakDz40k",
  authDomain: "champ-counter.firebaseapp.com",
  projectId: "champ-counter",
  databaseURL: "https://champ-counter-default-rtdb.firebaseio.com",
  storageBucket: "champ-counter.firebasestorage.app",
  messagingSenderId: "280928553583",
  appId: "1:280928553583:web:3532d82486f87387cb5b9a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);
const likesRef = db.ref('likes'); // Reference to the total likes
const userLikesRef = db.ref('userLikes'); // Reference to track user likes

// HTML Elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Get unique user ID (use a placeholder for demo purposes)
const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
localStorage.setItem('userId', userId);

// Track user like status and global likes
let userLiked = false;
let globalLikes = 0;

// Fetch initial data
likesRef.on('value', (snapshot) => {
  globalLikes = snapshot.val() || 0;
  likeCountDisplay.textContent = globalLikes;
});

userLikesRef.child(userId).on('value', (snapshot) => {
  userLiked = snapshot.val() || false;
  updateLikeButtonUI();
});

// Update UI based on like status
function updateLikeButtonUI() {
  if (userLiked) {
    likeButton.classList.add('liked');
    likeButton.textContent = 'Unlike';
  } else {
    likeButton.classList.remove('liked');
    likeButton.textContent = 'Like';
  }
}

// Handle like button click
likeButton.addEventListener('click', () => {
  if (userLiked) {
    // User wants to unlike
    likesRef.transaction((currentLikes) => (currentLikes || 0) - 1);
    userLikesRef.child(userId).set(false);
  } else {
    // User wants to like
    likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
    userLikesRef.child(userId).set(true);
  }
});

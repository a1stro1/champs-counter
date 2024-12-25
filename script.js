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
const likesRef = db.ref('likes'); // Reference to the global likes count
const userLikesRef = db.ref('userLikes'); // Reference to track user-specific likes

// HTML Elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Get unique user ID (use a placeholder for demo purposes)
const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
localStorage.setItem('userId', userId);

// Variables to store data
let userLiked = false; // Track if the current user has liked
let globalLikes = 0; // Track the total number of likes

// Fetch global likes count
likesRef.on('value', (snapshot) => {
  globalLikes = snapshot.val() || 0;
  likeCountDisplay.textContent = globalLikes; // Update the displayed likes
});

// Fetch user-specific like status
userLikesRef.child(userId).on('value', (snapshot) => {
  userLiked = snapshot.val() || false;
  updateLikeButtonUI(); // Update button UI based on the user's like status
});

// Update the like button UI
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
    // Unlike the post
    likesRef.transaction((currentLikes) => Math.max((currentLikes || 0) - 1, 0));
    userLikesRef.child(userId).set(false); // Update user-specific like status
  } else {
    // Like the post
    likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
    userLikesRef.child(userId).set(true); // Update user-specific like status
  }
});
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
const likesRef = db.ref('likes'); // Reference to the global likes count
const userLikesRef = db.ref('userLikes'); // Reference to track user-specific likes

// HTML Elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Get unique user ID (use a placeholder for demo purposes)
const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
localStorage.setItem('userId', userId);

// Variables to store data
let userLiked = false; // Track if the current user has liked
let globalLikes = 0; // Track the total number of likes

// Fetch global likes count
likesRef.on('value', (snapshot) => {
  globalLikes = snapshot.val() || 0;
  likeCountDisplay.textContent = globalLikes; // Update the displayed likes
});

// Fetch user-specific like status
userLikesRef.child(userId).on('value', (snapshot) => {
  userLiked = snapshot.val() || false;
  updateLikeButtonUI(); // Update button UI based on the user's like status
});

// Update the like button UI
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
    // Unlike the post
    likesRef.transaction((currentLikes) => Math.max((currentLikes || 0) - 1, 0));
    userLikesRef.child(userId).set(false); // Update user-specific like status
  } else {
    // Like the post
    likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
    userLikesRef.child(userId).set(true); // Update user-specific like status
  }
});

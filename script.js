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
const likesRef = firebase.database().ref("likes");
const userLikesRef = firebase.database().ref("userLikes");

// Elements
const likeButton = document.getElementById("like-button");
const likeCountDisplay = document.getElementById("like-count");

// Generate a unique user ID
const userID = `user_${Math.random().toString(36).substr(2, 9)}`;

// Track user liked status
let userLiked = false;

// Fetch initial data from Firebase
likesRef.on("value", (snapshot) => {
  const likeCount = snapshot.val() || 0;
  likeCountDisplay.textContent = likeCount;
});

userLikesRef.child(userID).on("value", (snapshot) => {
  userLiked = snapshot.val() || false;
  updateLikeButtonUI();
});

// Update button appearance based on like status
function updateLikeButtonUI() {
  if (userLiked) {
    likeButton.classList.add("liked");
    likeButton.textContent = "Unlike";
  } else {
    likeButton.classList.remove("liked");
    likeButton.textContent = "Like";
  }
}

// Handle like button click
likeButton.addEventListener("click", () => {
  if (userLiked) {
    // Unlike the post
    likesRef.transaction((currentLikes) => (currentLikes || 0) - 1);
    userLikesRef.child(userID).set(false);
  } else {
    // Like the post
    likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
    userLikesRef.child(userID).set(true);
  }
});

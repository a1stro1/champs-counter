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
const likesRef = db.ref('likes'); // Reference for total likes
const userLikesRef = db.ref('userLikes'); // Reference for individual user likes

// Get like button and display elements
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Generate or retrieve a unique user ID
let userId = localStorage.getItem('userId');
if (!userId) {
  userId = `user_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('userId', userId);
}

// Listen for changes to the global like count
likesRef.on('value', (snapshot) => {
  const likeCount = snapshot.val() || 0;
  likeCountDisplay.textContent = likeCount;
});

// Listen for changes to the user's like status
userLikesRef.child(userId).on('value', (snapshot) => {
  const userLiked = snapshot.val() || false;
  updateButtonState(userLiked);
});

// Like button toggle logic
likeButton.addEventListener('click', () => {
  userLikesRef.child(userId).once('value', (snapshot) => {
    const userLiked = snapshot.val() || false;

    if (userLiked) {
      // User unlikes the post
      likesRef.transaction((currentLikes) => (currentLikes || 0) - 1);
      userLikesRef.child(userId).set(false);
      updateButtonState(false);
    } else {
      // User likes the post
      likesRef.transaction((currentLikes) => (currentLikes || 0) + 1);
      userLikesRef.child(userId).set(true);
      updateButtonState(true);
    }
  });
});

// Update the button style
function updateButtonState(isLiked) {
  if (isLiked) {
    likeButton.style.backgroundColor = "black";
    likeButton.style.color = "white";
    likeButton.textContent = "Unlike";
  } else {
    likeButton.style.backgroundColor = "white";
    likeButton.style.color = "black";
    likeButton.textContent = "Like";
  }
}

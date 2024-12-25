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
const likesRef = db.ref('likes'); // Reference to 'likes' node in the database
const userLikedRef = db.ref('userLikes'); // Reference to 'userLikes' node

// Get the like button and like count display
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Generate a unique user ID for this session (or retrieve existing one)
let userId = localStorage.getItem('userId');
if (!userId) {
  userId = `user_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('userId', userId);
}

// Fetch initial like count and user like state
likesRef.on('value', (snapshot) => {
  const likeCount = snapshot.val() || 0;
  likeCountDisplay.textContent = likeCount;
});

userLikedRef.child(userId).on('value', (snapshot) => {
  const userLiked = snapshot.val();
  if (userLiked) {
    likeButton.classList.add('liked');
  } else {
    likeButton.classList.remove('liked');
  }
});

// Add event listener for the like button
likeButton.addEventListener('click', () => {
  userLikedRef.child(userId).once('value', (userSnapshot) => {
    const userLiked = userSnapshot.val();

    if (userLiked) {
      // Unlike the post
      likeButton.classList.remove('liked');
      likesRef.transaction((currentCount) => (currentCount || 0) - 1); // Decrement the count
      userLikedRef.child(userId).set(false); // Update user like state
    } else {
      // Like the post
      likeButton.classList.add('liked');
      likesRef.transaction((currentCount) => (currentCount || 0) + 1); // Increment the count
      userLikedRef.child(userId).set(true); // Update user like state
    }
  });
});

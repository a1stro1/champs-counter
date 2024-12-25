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

// Get the like button and like count display
const likeButton = document.getElementById('like-button');
const likeCountDisplay = document.getElementById('like-count');

// Track if the user has liked
let userLiked = localStorage.getItem('userLiked') === 'true' || false;

// Fetch initial like count from Firebase
likesRef.on('value', (snapshot) => {
  const data = snapshot.val() || { count: 0 };
  const likeCount = data.count;

  // Update the like count display
  likeCountDisplay.textContent = likeCount;

  // Update the button UI based on the user's like status
  if (userLiked) {
    likeButton.classList.add('liked');
  } else {
    likeButton.classList.remove('liked');
  }
});

// Add event listener for the like button
likeButton.addEventListener('click', () => {
  likesRef.transaction((currentData) => {
    if (currentData) {
      if (userLiked) {
        // Unlike the post
        userLiked = false;
        localStorage.setItem('userLiked', 'false');
        likeButton.classList.remove('liked');
        return { count: currentData.count - 1 };
      } else {
        // Like the post
        userLiked = true;
        localStorage.setItem('userLiked', 'true');
        likeButton.classList.add('liked');
        return { count: currentData.count + 1 };
      }
    }
    return currentData;
  });
});

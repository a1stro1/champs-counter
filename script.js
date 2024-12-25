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
let userLiked = localStorage.getItem('userLiked') === 'true';

// Fetch initial like count from Firebase
likesRef.on('value', (snapshot) => {
  const data = snapshot.val() || { count: 0 };
  const likeCount = data.count;

  // Update the like count display
  likeCountDisplay.textContent = likeCount;

  // Set the button's appearance based on the user's like status
  if (userLiked) {
    likeButton.classList.add('liked');
  } else {
    likeButton.classList.remove('liked');
  }
});

// Add event listener for the like button
likeButton.addEventListener('click', () => {
  likesRef.once('value', (snapshot) => {
    const data = snapshot.val() || { count: 0 };
    let newCount = data.count;

    if (userLiked) {
      // Unlike the post
      likeButton.classList.remove('liked');
      newCount--;
      userLiked = false;
    } else {
      // Like the post
      likeButton.classList.add('liked');
      newCount++;
      userLiked = true;
    }

    // Save the user's like status locally
    localStorage.setItem('userLiked', userLiked);

    // Update the count in Firebase
    likesRef.set({ count: newCount });
  });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, query, where, doc, setDoc, addDoc, onSnapshot, Timestamp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";

window.save2FB = save2FB; // brings this function into the global scope (necessary to use elements of module in other scripts)
window.populateSelect = populateSelect;
window.grabFromFireBase = grabFromFireBase;
document.getElementById("existingScores").addEventListener('change', function() { grabFromFireBase()})

let titleList = []

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHn5lWGV6_cnSZl36A-FjuECNfGNCBB8s",
    authDomain: "live-notation.firebaseapp.com",
    projectId: "live-notation",
    storageBucket: "live-notation.appspot.com",
    messagingSenderId: "178078197621",
    appId: "1:178078197621:web:3b8c9bb9a723801ab1553c",
    measurementId: "G-EL18WL0RM0"
  };

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

const db = getFirestore()

populateSelect() // auto-fills select menu



// can't work out why this would be necessary
//window.postComment = postComment





// ref.on("child_added", function(snapshot) {
//   var comment = snapshot.val();
//   addComment(comment.name, comment.comment, comment.time);
// });

function populateSelect(){
  const q = collection(db, "thoughts-from-users");
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const comments = [];

  var x = document.getElementById("existingScores");
  while (x.options.length) x.remove(0);
  
  querySnapshot.forEach((doc) => {
    populateFromFirebase(doc.data().title)
    titleList.push(doc.data().title)
  });
});

}

function populateFromFirebase(title) {
  var x = document.getElementById("existingScores");
    var option = document.createElement("option");
    option.text = title;
    option.value = title;
    x.appendChild(option);
}

function save2FB() {
  var title = document.getElementById("piece-title").value,
  thoughts = document.getElementById("thoughts").value,
  algorithm = document.getElementById("algorithm").value
  console.log("before", title, thoughts, algorithm)

if (titleList.includes(title))
{
  window.alert("Title already used, please be more original.")
  return
}

if (title && thoughts) {

 console.log("after", title, thoughts, algorithm)

const colRef = collection(db, "thoughts-from-users")
  addDoc(colRef, {
    title: title,
    thoughts: thoughts,
    algorithm: algorithm
    },)
    
    populateSelect()

  }


}

function grabFromFireBase() 
{
  console.log("working")
  const value = document.getElementById("existingScores").value
  console.log(value)
  
  const docsRef = collection(db, "thoughts-from-users");

  const q = query(docsRef, where("title", "==", value));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const comments = [];
    
    querySnapshot.forEach((doc) => {
      document.getElementById("thoughts").value = doc.data().thoughts
      document.getElementById("algorithm").value = doc.data().algorithm
      document.getElementById("piece-title").value = doc.data().title
      pieceNamePopulate()
      main() 
    });
  })

  


  // this is the target of the event listener
  // take the value of the select, and request it from Firebase. 
  // then fill the Input box with the request, switch the notation algorithm to the correct one, and call main()
  // also run populateFromFirebase() again
}






import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, Timestamp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlNZyxwAjPtFjNiq_E4PjqRw9efpv7Xmw",
  authDomain: "copyrightnightmarescomments.firebaseapp.com",
  projectId: "copyrightnightmarescomments",
  storageBucket: "copyrightnightmarescomments.appspot.com",
  messagingSenderId: "434761434052",
  appId: "1:434761434052:web:add1aba3d4c899d2a79a91",
  measurementId: "G-6TBFET51PM"
};
// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

const db = getFirestore()


  

// Thanks to https://gist.github.com/hurjas/2660489#file-timestamp-js-L26
function timeStamp() {
  var now = new Date();
  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  var time = [now.getHours(), now.getMinutes()];
  var suffix = (time[0] < 12) ? "AM" : "PM";
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }

  return date.join("/") + ", " + time.join(":") + " " + suffix;
}

window.postComment = postComment

function postComment() {
  var name = document.getElementById("name").value,
      comment = document.getElementById("comment").value,
      time = timeStamp();

  if (name && comment) {

    const colRef = collection(db, 'comments')
      addDoc(colRef, {
        name: name,
        comment: comment,
        time: time
        },)
        
      }

  document.getElementById("name").value = '';
  document.getElementById("comment").value = '';
  var comments = document.getElementById("comments");
  comments.innerHTML = ""
}

const q = collection(db, "comments");
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const comments = [];
  
  querySnapshot.forEach((doc) => {
    addComment(doc.data().name, doc.data().comment, doc.data().time)
  });
});


// ref.on("child_added", function(snapshot) {
//   var comment = snapshot.val();
//   addComment(comment.name, comment.comment, comment.time);
// });

function addComment(name, comment, timeStamp) {
  var comments = document.getElementById("comments");
  comments.innerHTML = "<hr><h4>" + name + " says <span>" + timeStamp + "</span></h4><p>" + comment + "</p>" + comments.innerHTML;
}

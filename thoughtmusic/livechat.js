import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, Timestamp} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_DaRrHCXk2Dp4kYnirToJnxRe6t06Ijk",
    authDomain: "chatmusic-livechat.firebaseapp.com",
    projectId: "chatmusic-livechat",
    storageBucket: "chatmusic-livechat.appspot.com",
    messagingSenderId: "1069248814871",
    appId: "1:1069248814871:web:8a79f00232a68bd878a152"
};
// Initialize Firebase
  const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);

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

    const colRef = collection(db, 'chat')
      addDoc(colRef, {
        name: name,
        comment: comment,
        time: time
        },)
        
      }

  //document.getElementById("name").value = '';
  document.getElementById("comment").value = '';
  var comments = document.getElementById("comments");
  comments.innerHTML = ""
}

const q = collection(db, "chat");

const unsubscribe = onSnapshot(q, (querySnapshot) => {
  querySnapshot.docChanges().forEach((change) => {
    addComment(change.doc.data().name, change.doc.data().comment, change.doc.data().time)
    if (typeof textToMusic == 'function') { 
      document.getElementById("thoughts").value = change.doc.data().comment
      main()
      // setTimeout(playScore, 500)
    }

  });
});
setInterval(playScore, 2500)


// const unsubscribe = onSnapshot(q, (querySnapshot) => { 
//   querySnapshot.forEach((doc) => {
//     addComment(doc.data().name, doc.data().comment, doc.data().time)
//   });
// });


// ref.on("child_added", function(snapshot) {
//   var comment = snapshot.val();
//   addComment(comment.name, comment.comment, comment.time);
// });

function addComment(name, comment, timeStamp) {
  var comments = document.getElementById("comments");
  let newcomment = "<hr><h4>" + name + " says <span>" + timeStamp + "</span></h4><p>" + comment + "</p>"
  comments.insertAdjacentHTML("afterend", newcomment);
}

function playScore() {
  abcSynth(synthScore)
  //document.getElementById("activate-audio").click()
}
// let score = ['67 1', '64 1', '67 0.5', '65 0.5', '69 0.5', '64 0.5']


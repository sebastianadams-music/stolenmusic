// event listener
document.getElementById("thoughts").addEventListener('keyup', function() { main()})


function main() {
    var userInput = document.getElementById("thoughts").value
    var algo = document.getElementById("algorithm").value
    console.log("algo", algo)
    var t2m
if (algo === "risingFaster") {
    t2m = risingFaster(userInput)
}
if (algo === "defaultLetters") {
    t2m = defaultLetters(userInput)
}   
if (algo === "defaultAlgo") {
    t2m = defaultAlgo(userInput)
}   
// console.log("words: ", t2m.words); console.log("pitches: ", t2m.pitches); console.log("rhythms: ", t2m.rhythms)

var formattedScore = textToMusic(t2m)
lastPitch = t2m.pitches.slice(-1)[0]
console.log("last pitch", lastPitch)
let synthActive = document.getElementById("kill-synth").value
console.log("synthAc", synthActive)
if (synthActive !== "false")
{playKazoo(lastPitch)
}

redraw(formattedScore)

}


function printAbc() {

    const hide = Array.from(document.getElementsByClassName("no-print"));

  hide.forEach(el => {
    // 👇️ Remove element from DOM
    el.style.display = 'none';

    // 👇️ hide element (still takes up space on page)
    // box.style.visibility = 'hidden';
  });
  window.print();
  hide.forEach(el => {
    // 👇️ Remove element from DOM
    el.style.display = 'block';

    // 👇️ hide element (still takes up space on page)
    // box.style.visibility = 'hidden';
  });


    // document.getElementById("no-print").style.display = "none";
    // window.print();
    // document.getElementById("no-print").style.display = "block";
    // //document.getElementById("print-abc").innerHTML = '';
}

function killSynth()
{
    document.getElementById("kill-synth").value = false
}
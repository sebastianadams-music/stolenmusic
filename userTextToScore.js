// event listeners
document.getElementById("thoughts").addEventListener('keyup', function() { main()})
document.getElementById("piece-title").addEventListener('keyup', function() { pieceNamePopulate()})

// main

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
    var score = textToMusic(t2m)
    var formattedScore = score.formattedScore
    var synthScore = score.synthScore
    window.synthScore = synthScore // shares synth score with entire document 
    lastPitch = t2m.pitches.slice(-1)[0]
    console.log("last pitch", lastPitch)
    let synthActive = document.getElementById("kill-synth").value
    console.log("synthAc", synthActive)
    if (synthActive !== "false")
      {playKazoo(lastPitch)}

    redraw(formattedScore)

}


function printAbc() {
  const hide = Array.from(document.getElementsByClassName("no-print"));
  hide.forEach(el => {
    el.style.display = 'none';
  });
  window.print();
  hide.forEach(el => {
    el.style.display = 'block';
  });
}

function killSynth()
{
    document.getElementById("kill-synth").value = false
}

function pieceNamePopulate(){
  var namedPiece = document.getElementById("piece-title").value
  document.getElementById("name-populated").textContent = namedPiece

}

 






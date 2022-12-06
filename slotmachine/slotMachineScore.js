var preferredMeasuresPerLine = 4 // as long as this file is loaded after abcparse.js, you can override default notation settings here


//setup spinning event listeners

var spinning = false
document.getElementById("spin").addEventListener('click', function() { startSpinning()})
document.getElementById("stop").addEventListener('click', function() { stopSpinning()})

//async setup 

const timer = ms => new Promise(res => setTimeout(res, ms))
const timerStop = ms => new Promise(res => setTimeout(res, ms))
const timerSpin = ms => new Promise(res => setTimeout(res, ms))


const logFileText = async file => {
    const response = await fetch(file)
    const text = await response.text()
    let arr = []
    arr = text.split('\n')
    load(arr) // main function
}

logFileText('whole-ulysses-noblanklines.txt') // runs the async function (I think)

// load is the main function

async function load (array) {
    let i = 0
    while (spinning) // loop triggered by whether SPIN is active
    {
        i++
        i = i % array.length // becomes line number
        lineFromText = array[i]

        var algo = document.getElementById("algorithm").value
        console.log("algo", algo)
        var t2m
        if (algo === "risingFaster") {
            t2m = risingFaster(lineFromText)
        }
        if (algo === "defaultLetters") {
            t2m = defaultLetters(lineFromText)
        }   
        if (algo === "defaultAlgo") {
            t2m = defaultAlgo(lineFromText)
        }           // console.log("words: ", t2m.words); console.log("pitches: ", t2m.pitches); console.log("rhythms: ", t2m.rhythms)
        
        var score = textToMusic(t2m)
        var formattedScore = score.formattedScore
        
        redraw(formattedScore)

        let timerWait = document.getElementById("timeToWait").value
        await timer(timerWait)
        }
      }

// LISTENERS

async function startSpinning()
{

     spinning = true
     logFileText('./txt/ulysses_1_no_empty_lines.txt')
     let minSpin = document.getElementById("minSpin").value
     let maxSpin = document.getElementById("maxSpin").value
     let spinTime = getRandomInt(minSpin, maxSpin)
     await timerStop(spinTime)
     stopSpinning()
}
async function stopSpinning()
{
    spinning = false
    let minPause = document.getElementById("minPause").value
    let maxPause = document.getElementById("maxPause").value
    let PauseTime = getRandomInt(minPause, maxPause)
    await timerStop(PauseTime)
    startSpinning()
}


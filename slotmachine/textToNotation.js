var spinning = false
document.getElementById("spin").addEventListener('click', function() { startSpinning()})
document.getElementById("stop").addEventListener('click', function() { stopSpinning()})
const timer = ms => new Promise(res => setTimeout(res, ms))


const logFileText = async file => {
    const response = await fetch(file)
    const text = await response.text()
    let arr = []
    arr = text.split('\n')
    load(arr)

    
}

logFileText('./txt/ulysses_1_no_empty_lines.txt')



async function load (array) {
    let i = 0
    while (spinning)
    {
        i++
        i = i % array.length
        console.log("spinning: ", spinning)
        lineFromText = array[i]
    let t2m = risingFaster(lineFromText)
    console.log("words: ", t2m.words)
    console.log("pitches: ", t2m.pitches)
    console.log("rhythms: ", t2m.rhythms)
    pitchList = t2m.pitches
    pitchList = addPitch(pitchList, 60)
    pitchList = midi2abcArray(pitchList)
    // var scorePitches = midi2abc(addPitch(pitchList, 60)).split(" ")
    var scoreRhythms = t2m.rhythms
    let scoreAdj = []
    for (let i = 0; i < pitchList.length; i++)
    {
        
        pitchAdj = pitchList[i]
        console.log("PITCH", pitchAdj)
        noteAdj = ' "' + t2m.words[i] + '"' + pitchAdj + scoreRhythms[i]  
        console.log("NOTE", noteAdj)
        scoreAdj.push(noteAdj)

    }
    let lyrics = t2m.words
    console.log("lyrics: ", lyrics.length)
    let lyricsFormatted = "";
    for (let i = 0; i < lyrics.length; i++)
    {   
        console.log("lyric_ind", lyrics[i])
        lyricSpaced = lyrics[i] + " "
        lyricsFormatted = lyricsFormatted.concat(lyricSpaced)
        
    }
    console.log(scoreAdj)
    console.log("LyricsForm:", lyricsFormatted)
    var finalScore = "K: C" + "L: 1/16\n"
    + "V:1 name=Voice\n" 
+ "[V:1]" + scoreAdj + finalbar +'w: "'+ lyricsFormatted + '"';
 var minSpacing = 1.8;
 var maxSpacing = 2.8;
 var preferredMeasuresPerLine = 4;
 var staffwidth = 900;
 redraw(finalScore)  
 let timerWait = document.getElementById("timeToWait").value
  await timer(timerWait)
    }
      }

function startSpinning()
{

     spinning = true
     logFileText('./txt/ulysses_1_no_empty_lines.txt')
}
function stopSpinning()
{
    spinning = false
}


function risingFaster(array) {

    const message = array;
    const words = message.split(" ");
    let pitches = []
    let rhythms = []
    let pitch = 0
    for (let i = 0; i < words.length; i++)  {
        let possiblePitches = 4 // maximumleap
        let summedWords = ASCIISum(words[i])
        pitch_difference = summedWords % possiblePitches
        // pitch is designed to go up on average, based on where the first letter of word falls in alphabet
        if (words[i].charCodeAt(0) < 109) {
        pitch =  pitch + pitch_difference
        }
        else {
            pitch = pitch - pitch_difference 
        }
        pitches.push(pitch)
        rhythm = (1 + Math.floor((words[i].length / 4)))
        rhythms.push(rhythm) 
    
    }
    return {
        'pitches': pitches,
        'rhythms': rhythms,
        'words': words
      };
    
    
}




function ASCIISum(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        let char_code = array[i].charCodeAt(0);
        sum += char_code;
    }
    return sum;
} 

// function readFile(filepath) {
//     let file = filepath; 
//     let fileReader = new FileReader(); 
//     fileReader.readAsText(file); 
//     fileReader.onload = function() {
//       alert(fileReader.result);
//     }; 
//     fileReader.onerror = function() {
//       alert(fileReader.error);
//     }; 
//     console.log(fileReader)
//   }
// import {readFileSync, promises as fsPromises} from 'fs';



// console.log("Example to read line by line text");
// const f = require('fs');
// const readline = require('readline');
// let file = "./txt/ulysses_1_no_empty_lines.txt";
// var r = readline.createInterface({
//     input : f.createReadStream(user_file)
// });
// r.on('line', function (text) {
// console.log(text);
// });


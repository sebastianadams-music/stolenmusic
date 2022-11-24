// MUSIC TO ABC FORMAT

function textToMusic(t2m) // t2m is an object with lists of note parameters
// this function needs to be generic
{   
    console.log("t2m is", t2m)
    pitchList = addPitch(t2m.pitches, 60)
    let midiList = pitchList
        pitchList = midi2abcArray(pitchList)
        let scoreAdj = []
        let synthScore = []
        let barLength = 0
        for (let i = 0; i < pitchList.length; i++)
        {
            
            pitchAdj = pitchList[i]
            noteAdj = '"' + t2m.words[i] + '"' + pitchAdj + t2m.rhythms[i]
            
            //console.log("BeaM", t2m.beaming[i])
            rhythmForCheck = t2m.rhythms[i] 
            if (t2m.beaming[i]){
                scoreAdj.push(" ")
                console.log("BEAM!!!!!")
            }
            if (isNaN(rhythmForCheck)) 
            {
                console.log("NOT NUMBER", rhythmForCheck)
                rhythmForCheck = fractionToDecimal(rhythmForCheck)
                console.log("NOW A NUMBER", rhythmForCheck)
            }
            barLength = barLength + rhythmForCheck
            console.log("barLength", barLength)
            synthScore.push(midiList[i] + " " + rhythmForCheck)
            if (barLength > 8)
            {
                barLength = 0
                scoreAdj.push("|")
            }

            scoreAdj.push(noteAdj)

        }

        //score formatting
        scoreAdj = scoreAdj.join("")
        var formattedScore = "K: C" + "L: 1/32\n"
        + "V:1\n" 
        + "[V:1]" + scoreAdj + finalbar;
        console.log("formattedScore", formattedScore)
        console.log("synthScore", synthScore)
        return {
            'formattedScore': formattedScore,
            'synthScore': synthScore    
        }
}

// NOTATION ALGORITHMS

function risingFaster(array) {

    const message = array;
    const words = message.split(" ");
    let pitches = []
    let rhythms = []
    let beaming = []
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
        rhythm = (1 + Math.floor((words[i].length / 2)))
        rhythms.push(rhythm) 
        beaming.push(false)
        
    
    }
    return {
        'pitches': pitches,
        'rhythms': rhythms,
        'words': words,
        'beaming': beaming
        
      }; 
    
    
}

////// defaultLetters 
function defaultLetters(array) {

    const message = array;
    const words = message.split(" ");
    console.log("words", words)
    let pitches = []
    let rhythms = []
    let letters = []
    let beaming = []
    for (let i = 0; i < words.length; i++)  {
        let possiblePitches = 14
        let possibleRhythms = 4
        let word = words[i]
        console.log("word", word)
        let wordLength = word.length
        for (let i = 0; i < wordLength; i++) {
            let summedLetter = ASCIISum(word[i])
            pitch = summedLetter % possiblePitches
            pitches.push(pitch)
            rhythm = "2/" + (wordLength) // one word should add up to one beat
            console.log("rhyth", rhythm)
            rhythms.push(rhythm)
            letters.push(word[i])
            
        if (i == 0) {
            beaming.push(true)
        } else {beaming.push(false)}
    
        }
    }
    
    return {
        'pitches': pitches,
        'rhythms': rhythms,
        'words': letters,
        'beaming': beaming
      }

    
    }


    ////// default 
    function defaultAlgo(array) {


    const message = array;
    const words = message.split(" ");
    let pitches = []
    let rhythms = []
    let beaming = []
    for (let i = 0; i < words.length; i++)  {
        let possiblePitches = 14
        let possibleRhythms = 8
        let summedWords = ASCIISum(words[i])
        pitch = summedWords % possiblePitches
        pitches.push(pitch)
        rhythm = (1 + (summedWords % (possibleRhythms))) + "/4"
        rhythms.push(rhythm) 
        beaming.push(false)

    }
  
    return {
        'pitches': pitches,
        'rhythms': rhythms,
        'words': words,
        'beaming': beaming
      }
}


////

// HELPER FUNCTIONS

function ASCIISum(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        let char_code = array[i].charCodeAt(0);
        sum += char_code;
    }
    return sum;
} 

document.getElementById("activate-audio").addEventListener('click', () => { abcSynth(synthScore) })
// synthScore must be a globally declared variable (I have written it to window)

function abcSynth(noteArray) {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now()
    let elapsedTime = 0 
    let BPMScale = 3
    for (let i = 0; i < noteArray.length; i++) {
        note = noteArray[i].split(" ")
        // console.log(note)
        pitch = noteToFreq(note[0])
        rhythm = Number(note[1]) / BPMScale
        //rhythm = time2seconds(rhythm) // used this when planning to use note lengths rather than time
        synth.triggerAttackRelease(pitch, (rhythm *.9), now + elapsedTime)
        elapsedTime = elapsedTime + rhythm
    }
}

function playKazoo(pitch)
                {
                    const file = chooseKazooRepo()
                    console.log(file)
                    const audio = new Audio(file);
                    console.log(audio)
                    audio.type = "audio/mpeg"
                    const speed = 2 * Math.pow(2, (pitch + 2)/12)
                    console.log(speed)
                    audio.preservesPitch = false
                    audio.playbackRate = speed
                    audio.play();



                }

                function chooseKazoo() {
                        var i = getRandomInt(1, 4)

                        var audio = `a/kazoo_${i}.mp3?raw=true`
                        return audio

                        
                    }
                
                function chooseKazooRepo() {
                var kazooLinks = ["https://media.githubusercontent.com/media/sebastianadams-music/stolenmusic/main/a/kazoo_1.mp3", "https://media.githubusercontent.com/media/sebastianadams-music/stolenmusic/main/a/kazoo_2.mp3", "https://media.githubusercontent.com/media/sebastianadams-music/stolenmusic/main/a/kazoo_3.mp3", "https://media.githubusercontent.com/media/sebastianadams-music/stolenmusic/main/a/kazoo_4.mp3"]
                    var i = getRandomInt(0, 3)

                    var audio = kazooLinks[i]
                    return audio

                }


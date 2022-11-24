document.getElementById("activate-audio").addEventListener('click', () => { abcSynth(synthScore) })
// synthScore must be a globally declared variable (I have written it to window)

function hello() {
    //create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "2n");
}

function hello2() {
    const synth = new Tone.Synth().toDestination();
const now = Tone.now()
synth.triggerAttackRelease("C4", "8n", now)
synth.triggerAttackRelease("E4", "8n", now + 0.5)
synth.triggerAttackRelease("G4", "8n", now + 1)
}

function hello3() {
    // create two monophonic synths
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
	synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start("8n");
// the loops start when the Transport is started
Tone.Transport.start()
// ramp up to 800 bpm over 10 seconds
Tone.Transport.bpm.rampTo(800, 10);
}

function helloPoly() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now()
synth.triggerAttack("D4", now);
synth.triggerAttack("F4", now + 0.5);
synth.triggerAttack("A4", now + 1);
synth.triggerAttack("C5", now + 1.5);
synth.triggerAttack("E5", now + 2);
synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
}

function helloSampler() {
    console.log("in it")
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    
    Tone.loaded().then(() => {
        sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
    })
}

function hello5() {
    const synth = new Tone.Synth().toDestination();
const now = Tone.now()
synth.triggerAttackRelease("C4", "8n", now)
synth.triggerAttackRelease("E4", "8n", "+8n")
synth.triggerAttackRelease("G4", "8n", "+8n + 8n")
}


function time2seconds(noteLength) {
    seconds = Tone.Time(noteLength).toSeconds(); 
    return seconds

}

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
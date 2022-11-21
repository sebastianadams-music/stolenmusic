      var makeNotes = []
      var barline = ["|"]
      var doublebar = ["||"]
      var finalbar = ["|]"]
      var beam = [" "]
      var blankline = [" \n"] //doesn't work
      var minSpacing = 1.8 
      var maxSpacing = 2.8
      var preferredMeasuresPerLine = 2
      var staffwidth = 900
      
      //////SEB'S PARSING FUNCTIONS

// FROM EXAMPLE

function redraw(finalScore) {
    ABCJS.renderAbc("paper", finalScore, {
      wrap: {
        minSpacing: minSpacing,
        maxSpacing: maxSpacing,
        preferredMeasuresPerLine: preferredMeasuresPerLine
      },
      staffwidth: staffwidth
    });
  }

  function load() {
    var el = document.querySelector("#parameters");
    el.addEventListener("submit", changeParameters);
    redraw();
  }

  function changeParameters(ev) {
    ev.preventDefault();
    var data = new FormData( ev.target);
    minSpacing = data.get("min");
    maxSpacing = data.get("max");
    preferredMeasuresPerLine = data.get("measures");
    staffwidth = data.get("width");
    redraw();
  }

// AUDIO CONTEXT

  // given that there are two elements in the DOM with the IDs "paper" and "audio"
var cursorControl = {}
  // var cursorControl = { ... } // see section on CursorControl
var abc = "X:1\n etc...";
var abcOptions = { add_classes: true };
var audioParams = { chordsOff: true };

if (ABCJS.synth.supportsAudio()) {
	var synthControl = new ABCJS.synth.SynthController();
	synthControl.load("#audio", 
        cursorControl, 
        {
            displayLoop: true, 
            displayRestart: true, 
            displayPlay: true, 
            displayProgress: true, 
            displayWarp: true
        }
    );

	var visualObj = ABCJS.renderAbc("paper", 
        abc, abcOptions);
	var createSynth = new ABCJS.synth.CreateSynth();
	createSynth.init({ visualObj: visualObj[0] }).then(function () {
		synthControl.setTune(visualObj[0], false, audioParams).then(function () {
			console.log("Audio successfully loaded.")
		}).catch(function (error) {
			console.warn("Audio problem:", error);
		});
	}).catch(function (error) {
		console.warn("Audio problem:", error);
	});
} else {
	document.querySelector("#audio").innerHTML = 
        "Audio is not supported in this browser.";
	}




// SEB'S FUNCTIONS

   function m2f(note) {
    let a = 440; //frequency of A
  return (a / 32) * (2 ** ((note - 9) / 12));

  }

  function f2m(note) {
    let a = 440;
    return 12 * Math.log2(note / a) + 69;

  }

  function midi2abcArray(pitcharray) {
    var pitchDict = 
    {
      60: "C", 
      61: "^C",
      62: "D",
      63: "^D",
      64: "E",
      65: "F",
      66: "^F",
      67: "G",
      68: "^G",
      69: "A",
      70: "^A",
      71: "B",

    }
    var result = []
    for (let x in pitcharray) {
      console.log(pitcharray[x])
      // need to wrap the following part of function in "if list..." etc. to  deal with chords: also, keep an eye on cross-compatibility with my Bach patches!
      if (typeof pitcharray[x] === 'number')

        {
        var i = Math.round(pitcharray[x])
      console.log("i" + i)
      var octave = ""
      if (i > 71) {
        j = Math.floor(1 + (i - 72) / 12)
        for (let x = 0; x < j; x++)
          { 
            octave = octave.concat("'")
          }
        i = i - (j * 12)
      }
      else if (i < 60)
      {
        j = Math.floor(1 + (59 - i) / 12)
        for (let x = 0; x < j; x++)
          { 
            octave = octave.concat(",")
          }
        console.log(j)
        i = i + (j * 12)
      }

      
      result.push(pitchDict[i] + octave)
      }
      else
      {
        result.push(pitcharray[x])
      }
    }
    console.log("result: " + result)
    return result
  }

  function midi2abc(pitcharray) {
    var pitchDict = 
    {
      60: "C", 
      61: "^C",
      62: "D",
      63: "^D",
      64: "E",
      65: "F",
      66: "^F",
      67: "G",
      68: "^G",
      69: "A",
      70: "^A",
      71: "B",

    }
    var result = ""
    for (let x in pitcharray) {
      console.log(pitcharray[x])
      // need to wrap the following part of function in "if list..." etc. to  deal with chords: also, keep an eye on cross-compatibility with my Bach patches!
      if (typeof pitcharray[x] === 'number')

        {
        var i = Math.round(pitcharray[x])
      console.log("i" + i)
      var octave = ""
      if (i > 71) {
        j = Math.floor(1 + (i - 72) / 12)
        for (let x = 0; x < j; x++)
          { 
            octave = octave.concat("'")
          }
        i = i - (j * 12)
      }
      else if (i < 60)
      {
        j = Math.floor(1 + (59 - i) / 12)
        for (let x = 0; x < j; x++)
          { 
            octave = octave.concat(",")
          }
        console.log(j)
        i = i + (j * 12)
      }

      
      result = result.concat(pitchDict[i] + octave)
      }
      else
      {
        result = result.concat(pitcharray[x])
      }
    }
    console.log("result: " + result)
    return result
  }


  
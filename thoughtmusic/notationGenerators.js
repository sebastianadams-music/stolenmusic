////////// SEB'S MUSIC FUNCTIONS
function randomNotes(number, notesperbar) {
    const notesArray = ["C", "^C", "D", "^D", "E", "F", "^F", "G", "^G", "A", "^A", "B" ]
    var result = ""
    for (let i = 1; i <= number; i++)
      {
        randomNumber = Math.floor(Math.random() * notesArray.length)
        result = result.concat(notesArray[randomNumber])
        if (i % notesperbar == 0)
        {
        result = result.concat("|")  
        }
      } 
    return result
  }

  function harmGliss(startMIDI, startPartial, length)
  {
    var fund = m2f(startMIDI);
    var result = []
    for (let i = 0; i < length; i++)
    {
      j = i + startPartial;
      var note = f2m(fund * j)
      result.push(note)
    }
    return result



  }

  function addPitch(array, addition)
  {
    let newArray = []
    for (item in array)
    {
      if (typeof array[item] === 'number')
      {
        item = array[item] + addition
        newArray.push(item)
      }
      else 
      {
        newArray.push(array[item])
      }
    }
    return newArray

  }

  function miditest(){
    var array = []
    for (let i = 20; i < 128; i++)
    {
      array.push(i)
    }
    return array
  }
function playKazoo(pitch)
                {
                    const file = chooseKazooRepo()
                    console.log(file)
                    const audio = new Audio(file);
                    console.log(audio)
                    audio.type = "audio/mpeg"
                    const speed = 2 * Math.pow(2, pitch/12)
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



                    index = -1
                    function randomString2(Length)
                    {
                        var text = "";
                        var license = [
                          "This is free and unencumbered MUSIC released into the public domain.", 
                          "Anyone is free to copy, modify, publish, use, compile, sell, or", 
                          "distribute this music, either in source code form or as a compiled binary,", 
                          "for any purpose, commercial or non-commercial, and by any means.",
                          "In jurisdictions that recognize copyright laws, the author or authors",
                          "of this software dedicate any and all copyright interest in the",
                          "software to the public domain. We make this dedication for the benefit",
                          "of the public at large and to the detriment of our heirs and",
                          "successors. We intend this dedication to be an overt act of",
                          "relinquishment in perpetuity of all present and future rights to this",
                          "software under copyright law."];
                          
                        for( var i=0; i < Length; i++ )
                            text += license[(Math.floor(Math.random() * license.length))];
                        return text;
                    }
                    function loopUnlicense(Length)
                    {
        
                        setInterval(function(){
                            console.log("peinting")
                            document.getElementById("unlicense-line").innerHTML = randomString2(Length);},350);
                    }
                    
                    
                    loopUnlicense(1)
        
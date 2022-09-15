
            function randomString(Length)
            {
                var text = "";
                var possible = [`“Immature artists imitate. Mature artists steal."
                —Lionel Trilling`, `“A good composer does not imitate; he steals.”—Igor Stravinsky`, `Good artists copy; great artists steal. —attrib. Picasso by Steve Jobs`, `“That great poets imitate and improve, whereas small ones steal and spoil.” —W.H. Davenport Adams`, `"Immature poets imitate; mature poets steal" —T.S. Eliot`, `"Immature poets imitate; mature poets steal; bad poets deface what they take, and good poets make it into something better, or at least something different." —T.S. Eliot`, `"Whereas in Europe the height of originality is genius, in America the height of originality is skill in concealing origins.

" —C.E.M. Joad`, `"T. S. Eliot once wrote that the immature poet imitates and the mature poet plagiarizes" — The Atlantic Monthly, 1949`, `“If you see a great master, you will always find that he used what was good in his predecessors, and that it was this which made him great.” —Goethe`, `“immature artists copy, great artists steal.” —Willian Faulkner`, `“The immature poet imitates, the mature poet plagiarizes,” —misquoted from T.S. Eliot`, `“Lesser artists borrow; great artists steal.” —Igor Stravinsky`, `“bad artists copy, great artists steal.” —Picasso (allegedly)`, `"I mean Picasso had a saying he said good artists copy great artists steal. And we have always been shameless about stealing great ideas." —Steve Jobs`, `" The secret to creativity is knowing how to hide your sources." —attrib. Einstein`, ];
                for( var i=0; i < Length; i++ )
                    text += possible[(Math.floor(Math.random() * possible.length))];
                return text;
            }
            function ChangingRandomString(Length)
            {
                var randomColor = Math.floor(Math.random()*16777215).toString(16);

                setInterval(function(){
                    document.getElementById("random-quote").innerHTML = randomString(Length);},350);
            }
            
            
ChangingRandomString(1)

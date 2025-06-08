console.log("Lets start Javascript");
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")  // using my port number in online where my songs respository are present we are fetching from online
    let response = await a.text(); //here my DOM convert in the form of text where my songs are located, we are converting it to take out songs
    let div = document.createElement("div");
    div.innerHTML = response  //store whole dom(html document) where my all songs are presents in table form
    // document.body.append(div) we will not put it into our webpage
    let as = div.getElementsByTagName("a")  // as will now have all a element present in div's innerhtml
    let songs = []  // make songs array to store all songs
    for (let index = 0; index < as.length; index++) {   //we will run for loop to get a element whose href endwith .mp3 it means it is a element who have song link so we store that element's href into songs array
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);  //this will split my href link into two parts based on given point("/songs/")left and right
        }
    }
    return songs;
}
async function main() {     //we create async function main because we don't want promise we want direct array for that we have to await for getsongs and for await i have to create async function
    let songs = await getSongs()    //it will now not return promise pending or some thing it will wait for songs array and then store in variable songs then print
    console.log(songs)
  let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]; //it will return collection of ul even if there is only one ul in songList so to get first index's ul we wrote [0]  or instead of collection one can just return first element using document.querySelector(".songList ul")
  for (const song of songs){
    songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%20", " ")} </li>`
  }

    //Play the first
    var audio = new Audio(songs[0]);
    // audio.play(); // it will play song after only user interaction
    audio.addEventListener('loadeddata', () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
        let duration = audio.duration
        console.log(duration);  //the duration variable holds the duration (insecond) of audio clip
    })
}
main();
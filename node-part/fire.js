const { default: axios } = require("axios")
const { spawn } = require('child_process')
var impTextForScreen = ''


exports.requestVoice = async function (text,voice,chars,key) {
    console.log(text,'arrived in module');
    var newtext
    
    await getText(text,chars,key).then(
        res => {
            newtext = res
            //console.log('promise text on '+newtext);

        }
    )
    console.log('uus text on '+newtext);
    newtext = newtext.slice(1)
    impTextForScreen = newtext
    text = '&text='+'<prosody rate="slow">'+newtext+'</prosody>'
    speaker = '&speaker='+voice
    return axios.post('https://api.ttsmp3.com/v1/?apikey=a6ffc504c68be70294a4d68b5590cbca'+speaker+text)
    .then(res => res.data.data.URL)
    .catch(error => console.log('api err: '+error))
    /*try {
        await axios.
        post('https://api.ttsmp3.com/v1/?apikey=a6ffc504c68be70294a4d68b5590cbca'+speaker+text
            
        ).then(function (response) {
            console.log(response.data.data.URL,'see on response oma');
            res = response.data.data.URL
            console.log(res);
            return res
        })
    } catch (error) {
        console.log(error.response.body);   
    }*/
}

async function getText(text,chars,key) {
    //C:\Users\steve\AppData\Local\Programs\Python\Python36\python.exe
    //C:\Users\steve\Desktop\robotid\generate_play_2021\Scripts\python.exe
    //var pythonProcess = spawnSync('C:\Users\steve\Desktop\robotid\generate_play_2021\Scripts\python.exe',['C:\Users\steve\Desktop\robotid\generate_play_2021interact_model2.py'])
    console.log('text to pyth'+text);
    return axios.get('http://localhost:5001/luuletus?text='+text+'&chars='+chars+'&key='+key)
    .then(
        res => res.data
        
    )
    .catch(error => console.log('python err: '+error))

}

exports.sendText = function () {
    return impTextForScreen
}

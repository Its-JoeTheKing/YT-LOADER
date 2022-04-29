const express = require('express');
app = express();
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
let ytld = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
var http = require('http');
var https = require('https');
const { format } = require('path');
const { filterFormats } = require('ytdl-core');
const { url } = require('inspector');

var server = http.createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    
    res.sendFile(path.join('index.html'));
});
app.get('/download',async(req,res)=>{
    var url = req.query.url;
    var info = await ytld.getInfo(url);
    var formats = info.formats;
    var t = [];
    for (var i = 0; i < formats.length; i++) {
        if (formats[i].codecs.includes('avc1') && formats[i].hasVideo && formats[i].hasAudio) {
            t.push(
                {
                    itag: formats[i].itag,
                    resolution: formats[i].qualityLabel,
                    container: formats[i].container,
                    url: formats[i].url,
                    banner: info.videoDetails.thumbnails[0].url,
                    title: info.videoDetails.title
                }
            );
        }
    }
    
    res.send(t);

});
app.get('/down',async(req,res)=>{
    var url = req.query.url;
    var reso = req.query.reso;
    var tit = req.query.tit;
    res.header('Content-Disposition', 'attachment;\ filename='+tit+'.mp4');
    ytld(url,function(info){
        return info.itag === reso;
    }).pipe(res);
});
app.get('/downaudio',async(req,res)=>{
    var url = req.query.url;
    var tit = req.query.tit;
    var stream = ytld(url,{quality: 'highest',filter: (format) => format.container === 'mp4'});
    res.header('Content-Disposition', 'attachment;\ filename='+tit+'.mp3');
    ffmpeg({source: stream}).outputOptions('-c:a libmp3lame').toFormat('mp3').pipe(res).catch(err => console.log(err));
});
app.get('/infos',async(req,res)=>{
    var url = req.query.url;
    var info = await ytld.getInfo(url);
    res.send(info.formats);
})
app.listen(3000,console.log('working'));


function downl() {
    document.getElementById("bann").innerHTML = '';
    document.getElementById("qa").innerHTML = '';
    url = document.getElementById('url').value;
    console.log('start');
    if (url.includes('youtube.com') === true) {
        document.getElementById('loader').innerHTML += '<div class="load" id="load"></div> ';
        axios.get(window.location.href+"download?url="+url).then(
            (res) => {
                console.log(res.data);
                document.getElementById('load').style.display = 'none';
                var t = res.data;
                var title = t[0].title.replace(/[^a-zA-Z0-9]/g, '_');
                document.getElementById('bann').innerHTML = '<h2 class="tit3 th" style="justify-content: center;">Thumbnail</h2><img src='+'https://i.ytimg.com/vi/'+url.split('=')[1]+'/hqdefault.jpg'+" class='img'></img><h2 class='v-tit'>"+t[0].title+'</h2>';
                for (var i = 0; i < t.length; i++) {
                    document.getElementById('qa').innerHTML += '<a href=/down?url='+url+'&reso='+t[i].itag+'&tit='+title+'><button class="buttonsd" target="__blank">'+t[i].resolution+'</button></a>';
                }
                document.getElementById('qa').innerHTML += '<a href=/downaudio?url='+url+'&tit='+title+' target="__blank"><button class="buttonld">Audio</button></a>';
                
            }).catch(err => console.log(err));
        } else {
            document.getElementById('url').style.border = '2px red solid';
            document.getElementById('err').innerHTML = '<p class="err-p">Invalid Url</p>';
        }
    console.log('end');
}
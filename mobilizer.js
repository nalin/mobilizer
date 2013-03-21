(function(){
function rss_url() {
  return ($("link[rel='alternate'][type='application/rss+xml']")[0] || $("link[rel='alternate'][type='application/atom+xml']")[0]);
}

function done(){ //on submit function
  if(rss = rss_url()) {
    var link = document.createElement("link");
    link.href = "https://raw.github.com/nalin/mobilizer/master/" + "mobilizer.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
    
    load_js("raw.github.com/jfhovinne/jFeed/master/build/dist/jquery.jfeed.pack.js", function() {parse_feed(rss.href)});
  } else {
    alert('no rss found :(');
  }
}

function load(){ //load jQuery if it isn't already
  window.onload = function(){
    if(navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
      var body = document.getElementsByTagName('body')[0];
      var container = document.createElement("div");
      container.id = "mobilizer";
      body.innerHTML = "";
      
      var viewPortTag=document.createElement('meta');
      viewPortTag.id="viewport";
      viewPortTag.name = "viewport";
      viewPortTag.content = "width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;";
      document.getElementsByTagName('head')[0].appendChild(viewPortTag);
      
      body.appendChild(container);
      
      if(window.jQuery === undefined){
          load_js('ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', done)
      }else{
          done();
      }
    }
  }
}

if(window.readyState){ //older microsoft browsers
    window.onreadystatechange = function(){
        if(this.readyState == 'complete' || this.readyState == 'loaded'){
            load();
        }
    }
}else{ //modern browsers
    load();
}

function load_js(url, onload){
  var src = 'https:' == location.protocol ? 'https':'http', script = document.createElement('script');
  script.onload = onload
  script.src = src+'://'+url;
  document.getElementsByTagName('body')[0].appendChild(script);
}

function parse_feed(url) {
  jQuery.getFeed({
     url: url,
     success: function(feed) {
       var title = document.createElement("h1")
       title.appendChild(document.createTextNode(feed.title));
       $('#mobilizer').append(title);             
       $('#mobilizer').append(render_recommended_apps());
       $('#mobilizer').append(render_rss_items(feed));
     }
   });
}

function render_recommended_apps() {
  var c = document.createElement("div");
  c.id = "mobilizer_apps";
  var label = document.createElement("div");
  label.id = "mobilizer_apps_label"
  label.appendChild(document.createTextNode("Recommended Apps"));
  c.appendChild(label);
  var ads = document.createElement("div");
  ads.id = "mobilizer_app_ads";
  
  for(var i=0;i<6;i++) {
    var app = document.createElement("img")
    app.className = "mobilizer_app_ad"
    app.src = "http://a194.phobos.apple.com/us/r1000/111/Purple/v4/de/cd/ac/decdac7c-65fc-0735-870c-64143dd7bb8f/mzl.rpqbierb.100x100-75.png";
    ads.appendChild(app);
  }
  c.appendChild(ads);
  return c;
}

function render_rss_items(feed) {
  var list = document.createElement("ul");
   $.each(feed.items, function() {
     //alert(this.title)
     var li = document.createElement('li');
     var link = document.createElement('a');
     link.href = this.link;
     link.appendChild(document.createTextNode(this.title));
     li.appendChild(link);
     list.appendChild(li);
   });
   
   return list;
}
})();
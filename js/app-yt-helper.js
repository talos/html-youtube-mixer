var YTHelper = {};

//?part=snippet&q=je%20danse%20pour%20ne%20pas%20pleurer&key=AIzaSyB8xPjYUjtiiE3GajY4Ef35ipFpMtUogIQ
YTHelper.YT_URL            = 'http://www.youtube.com';
YTHelper.API_VIDEO_URL     = 'https://www.googleapis.com/youtube/v3/search';
YTHelper.API_SUGGEST_URL   = 'http://suggestqueries.google.com/complete/search?callback=?';
YTHelper.SEARCH_TYPE_VIDEO = 'videos';

YTHelper.search = function(type, query, callback){
  // TODO what is type for
    $.get(YTHelper.API_VIDEO_URL,
          {
            part: 'snippet',
            key: $('#api_key').val(),
            q: query
          },
          function(data){
            callback(data);
          });
};

YTHelper.suggest = function(q, response){
  $.getJSON(YTHelper.API_SUGGEST_URL,
            {
              ds     :"yt",                  // Restrict lookup to youtube
              q      :q,
              client :"youtube"              // force youtube style response, i.e. jsonp
            },
            function(data) {
              response( $.map( data[1], function(item) {
                      return {
                          label: item[0],
                          value: item[0]
                      };
                  }));
            }
  );
};

YTHelper.YTRecord = function(result){
  this.id         = result.id.videoId;
  this.yt_url     = YTHelper.YT_URL+'/watch?v='+this.id;
  this.date       = new Date(result.snippet.publishedAt);
  this.date_fmt   = this.date.getDay()+'.'+this.date.getMonth()+'.'+this.date.getFullYear();
  //this.views      = (result.yt$statistics) ? result.yt$statistics.viewCount : '-';
  //this.authors    = result.author;
  this.title      = result.snippet.title;
  this.thumbnail  = (result.snippet.thumbnails) ? result.snippet.thumbnails.high.url : '';
  //this.info       = result.content.$t;
  //this.duration_seconds = parseInt(result.media$group.yt$duration.seconds, 10);
  //var minutes = ''+Math.round(this.duration_seconds/60);
  //var seconds = ''+(this.duration_seconds%60);
  //this.duration_fmt = (minutes.length === 1 ? '0'+minutes : minutes)+':'+(seconds.length === 1 ? '0'+seconds : seconds);
};

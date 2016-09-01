var app = {

  boxes: ["A","A","B","B","C","C","D","D","E","E","F","F"],
  count: [],
  overwrite: true,
  timer: 0,
  interval: "",
  // interval = setInterval(timer, 1000),
  //

  intervalFunc: function(){
    app.interval= setInterval(function() {
             app.timer += 1;
               $('#timer').html(app.timer);
              if(app.player.currentPlay.score === 6)
              {
                console.log("ganey");
                clearInterval(app.interval);
                clearInterval(app.timer);
                  }
            }, 1000);
  },

  player: {
    one: {name: "" , score:0, disp: ('#nv2'), time: 0},
    two: {name:"", score:0, disp: ('#nv3'), time: 0},
  },

  initFunc: function(){
    app.clickHandlers();
  },

  submitFunc: function() {
    $('body').scrollTop(0);
    if($('input[name=player1]').val() === ""){
      app.player.one.name = "Player1";
      $('#nv1').append(app.player.one.name);
    }
    else {
      $('#nv1').append($('input[name=player1]').val());
      app.player.one.name = $('input[name=player1]').val();
    }

    if($('input[name=player2]').val() === ""){
      app.player.two.name = "Player2";
      $('#nv4').append(app.player.two.name);
    }
    else{
      $('#nv4').append($('input[name=player2]').val());
      app.player.two.name = $('input[name=player2]').val();
    }
    app.switchFunc();
  },

  switchFunc: function() {
    $('#entry').css('visibility','hidden');
    $('#splash').css('visibility','visible');

    (this.player.currentPlay === this.player.one) ? (this.player.currentPlay = this.player.two): (this.player.currentPlay = this.player.one);
    app.shuffleFunc();
  },

  shuffleFunc: function(){
    app.timer = 0;
    clearInterval(app.interval);
    app.intervalFunc();
    for(var i =0; i < app.boxes.length; i++){
      random = Math.floor(Math.random() *i);
      temp = app.boxes[i];
      app.boxes[i] = app.boxes[random];
      app.boxes[random] = temp;
    }
    // console.log(app.player.currentPlay);
    app.assignFunc();
  },

  assignFunc: function (){
    $('.box').each(function (el) {
      $(this).attr('data-val', app.boxes[el]);
    });
  },

  picFunc: function()
  {
    if(app.count.length === 0){
      $(this).addClass($(this).attr('data-val'));
      app.count.push($(this));
    }
    else if(app.count.length === 1){
      if(app.count[0].attr('id') !== $(this).attr('id'))
      {
        $(this).addClass($(this).attr('data-val'));
        app.count.push($(this));
      }
    }
    if(app.count.length === 2){
      if(app.count[0].attr('data-val') === app.count[1].attr('data-val'))
      {app.player.currentPlay.score++;
        $(app.player.currentPlay.disp).empty();
        $(app.player.currentPlay.disp).append(app.player.currentPlay.score);
        app.count=[];
        app.winFunc();}
      else {
        setTimeout(function(){
          app.count[0].removeClass(app.count[0].attr('data-val'));
          app.count[1].removeClass(app.count[1].attr('data-val'));
          app.count=[];
        }, 400);
      }
    }
  },

  winFunc: function() {
    if(app.player.currentPlay.score === 6){
      app.player.currentPlay.time = app.timer;
      console.log(app.timer);


      app.switchFunc();
      // alert(app.player.currentPlay.name+ " Ready");
      $("#container").css('visibility', 'hidden');
        $('.change').html('<h1>  '+app.player.currentPlay.name+ ' READY!</h1><p>Hit ENTER</p>');

      // app.clickHandlers();
      $(document).keyup(function(ev){
        if (ev.which == 13){
          app.play2();
          $(this).off();
        }
      });
    }
  },

  play2: function (){
    $('div[class=change]').remove();
    $("#container").css('visibility', 'visible');
    $('#container').children().removeClass("A B C D E F");
    $('#container').children().removeAttr('data-val');
    count = [];
    app.shuffleFunc();
  },

  restartFunc: function(){
  location.reload();
  $('body').scrollTop(0);
  },

  clickHandlers: function(){
    $('.box').on('click', app.picFunc);
    $('#reset').on('click', app.restartFunc);
    $('#start').on('click', app.submitFunc);
  },

};

  app.initFunc();

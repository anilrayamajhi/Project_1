var app = {

  boxes: ["A","A","B","B","C","C","D","D","E","E","F","F"],
  count: [],
  overwrite: true,
  timer: 0,
  interval: "",
  dbClick: [],
  playBack: new Audio('flip.wav'),
  player: {
    one: {name: "" , score:0, disp: ('#nv2'), time: 0},
    two: {name:"", score:0, disp: ('#nv3'), time: 0},
  },


  utility: {
  intervalFunc: function(){
    app.timer = 0;
    app.interval= setInterval(function() {
             app.timer += 1;
             console.log("gun");
               $('#timer').html(app.timer);
               $("#timer").css('visibility', 'visible');
            }, 1000);
  },

  initFunc: function(){
    app.utility.clickHandlers();
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
    app.utility.intervalFunc();
    app.utility.switchFunc();
  },

  switchFunc: function() {
    $('#entry').css('visibility','hidden');
    $('#splash').css('visibility','visible');

    (app.player.currentPlay === app.player.one) ? (app.player.currentPlay = app.player.two): (app.player.currentPlay = app.player.one);

    app.utility.shuffleFunc();
  },

  shuffleFunc: function(){

    for(var i =0; i < app.boxes.length; i++){
      random = Math.floor(Math.random() *i);
      temp = app.boxes[i];
      app.boxes[i] = app.boxes[random];
      app.boxes[random] = temp;
    }
    // console.log(app.player.currentPlay);
    app.utility.assignFunc();
  },

  assignFunc: function (){
    $('.box').each(function (el) {
      $(this).attr('data-val', app.boxes[el]);
    });
  },


  picFunc: function()
  {
    app.playBack.play();
    {
      if(app.count.length === 0){
        $(this).addClass($(this).attr('data-val'));
        $(this).addClass('disableClick');
        app.count.push($(this));
      }
      else if(app.count.length === 1){
        if(app.count[0].attr('id') !== $(this).attr('id'))
        {
          $(this).addClass($(this).attr('data-val'));
          $(this).addClass('disableClick');
          app.count.push($(this));
        }
      }
      if(app.count.length === 2){
        if(app.count[0].attr('data-val') === app.count[1].attr('data-val'))
        {app.player.currentPlay.score++;
          $(app.player.currentPlay.disp).empty();
          $(app.player.currentPlay.disp).append(app.player.currentPlay.score);
          app.dbClick.push(app.count[0].attr('id'));
          app.dbClick.push(app.count[1].attr('id'));
          app.count=[];
          app.utility.winFunc();}
        else {
          setTimeout(function(){
            app.count[0].removeClass(app.count[0].attr('data-val'));
            app.count[0].removeClass('disableClick');
            app.count[1].removeClass(app.count[1].attr('data-val'));
            app.count[1].removeClass('disableClick');
            app.count=[];
          }, 400);
        }
    }
    }
  },

  winFunc: function() {
    setTimeout(function(){
      if(app.player.currentPlay.score === 6){
        app.player.currentPlay.time = app.timer;
        console.log(app.player.currentPlay.time);
        $("#timer").css('visibility', 'hidden');

        app.utility.switchFunc();
        if(app.player.currentPlay === app.player.one){
          clearInterval(app.interval);
        if(app.player.one.time > app.player.two.time){
            app.utility.trash();
            $('.change').html('<h1>  '+app.player.two.name+ ' WINS!</h1><p>Hit ENTER or Click RESTART GAME</p>');
            $(document).keyup(function(ev){
              if (ev.which == 13){
                location.reload();
                $('body').scrollTop(0);
                $(this).off();
              }
            });
        }
        else if(app.player.one.time < app.player.two.time){
            app.utility.trash();
            $('.change').html('<h1>  '+app.player.one.name+ ' WINS!</h1><p>Hit ENTER or Click RESTART GAME</p>');
            $(document).keyup(function(ev){
              if (ev.which == 13){
                location.reload();
                $('body').scrollTop(0);
                $(this).off();
              }
            });
        }

        else {
              app.utility.trash();
              $('.change').html('<h1>DRAW!!</h1><p>Hit ENTER or Click RESTART GAME</p>');
              $(document).keyup(function(ev){
                if (ev.which == 13){
                  location.reload();
                  $('body').scrollTop(0);
                  $(this).off();
                }
              });
          }
        }
        else {
          app.utility.trash();
          $('.change').html('<h1>  '+app.player.currentPlay.name+ ' READY!</h1><p>Hit ENTER</p>');
        clearInterval(app.interval);
        $('#timer').html(0);
        if ($(document).width() <= 700){
          $('#playC').removeClass('playCh');
          $('#playC').click(function(){
            app.utility.play2();
            $(this).off();
          });
        }
        $(document).keyup(function(ev){
          if (ev.which == 13){
            app.utility.play2();
            $(this).off();
          }
        });
      }
    }
    }, 500);
  },

  trash: function(){
    $("#container").addClass('heightCh');
    $("#container > div").addClass('heightCh');
      $('#winDeclare').addClass('change');
  },

  play2: function (){
    $('#playC').addClass('playCh');
    $('#winDeclare').removeClass('change');
    $('#winDeclare').html('');
    $("#container").removeClass('heightCh');
    $("#container > div").removeClass("A B C D E F disableClick heightCh");
    $('#container').children().removeAttr('data-val');
    app.utility.intervalFunc(app.interval);
    app.utility.shuffleFunc();
  },

  restartFunc: function(){
  location.reload();
  $('body').scrollTop(0);
  },

  clickHandlers: function(){
    $('.box').on('click', app.utility.picFunc);
    $('#reset').on('click', app.utility.restartFunc);
    $('#start').on('click', app.utility.submitFunc);
  },
},
};

  app.utility.initFunc();

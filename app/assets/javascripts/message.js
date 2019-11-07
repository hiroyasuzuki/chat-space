$(function(){
    function buildMessage(message){
      var addImage = (message.image !== null) ? `<img class="lower-message__image" src="${message.image}">` : "";
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message__first">
                      <div class="message__first__talker">
                        ${message.user_name}
                      </div>
                      <div class="message__first__data">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__first__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${addImage}
                    </div>
                   </div>`
      return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })
  
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
        })
      .done(function(message){
        var insertHTML='';
        message.forEach(function(message){
          insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        });
      })
      .fail(function() {
        console.log('error');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});
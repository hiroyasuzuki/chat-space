$(function(){
    function buildMessage(message){
      var addImage = (message.image !== null) ? `<img class="lower-message__image" src="${message.image}">` : "";
      var html = `<div class="message">
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(message){
      $('.form__submit').prop('disabled', false);
    })
  })
});
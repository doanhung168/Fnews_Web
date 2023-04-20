$(".eye-pass").click(function () {
    const type = $(this).siblings('input').attr('type')
    if (type === 'password') {
        $(this).siblings('input').attr('type', 'text')
        $(this).removeClass('fa-eye-slash').addClass('fa-eye')
    } else {
        $(this).siblings('input').attr('type', 'password')
        $(this).removeClass('fa-eye').addClass('fa-eye-slash')
    }
})

$('#login').click(() => {
    $.ajax({
        url: 'auth/login',
        type: 'POST',
        data: {username: $('#username').val(), password: $('#password').val()},
        success: (data, status, request) => {
            if(data.success) {
                document.cookie = 'Authorization=' + request.getResponseHeader('Authorization')
                window.location.replace("http://localhost:3000/")
            } else {
                $('#err').text(data.message)
            }
        },
        error: (request, status, err) => {
            $('#err').text(err)
        }
    })
})




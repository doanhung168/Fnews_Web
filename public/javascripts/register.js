$("#btnRegister").click(function () {

    const username = $('#username').val()
    const password = $('#password').val()
    const rePassword = $('#re-password').val()
    const email = $('#email').val()

    if (password !== rePassword) {
        $("#err").text('Mật khẩu không trùng khớp').show()
        return false;
    }

    $.ajax({
        url: 'http://localhost:3000/auth/register',
        data: { username: username, password: password, email: email },
        type: 'POST',
        success: (data, textStatus, request) => {
            if (data.success === false) {
                $('#err').text(data.message).show()
            } else {
                document.cookie = 'Authorization=' + request.getResponseHeader('Authorization')
                window.location.href = "http://localhost:3000/"
            }
        }
    });

});

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
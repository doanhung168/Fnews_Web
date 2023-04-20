$('#btnComfirm').click(() => {
    $.ajax({
        url: 'auth/forgot-password',
        type: 'POST',
        data: {email: $('#email').val()},
        success: (data, status, request) => {
            if(data.success) {
                $('#inform').css('color', 'green')
                $('#inform').text("Xin lòng kiểm tra email để khôi phục lại mật khẩu!")
            } else {
                $('#inform').css('color', 'red')
                $('#inform').text(data.message)
            }
        },
        error: (request, status, err) => {
            $('#inform').css('color', 'red')
            $('#inform').text(err)
        }
    })
})
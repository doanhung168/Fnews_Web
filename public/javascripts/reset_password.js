$("#btnComfirm").click(function () {

    const password = $('#password').val()
    const rePassword = $('#re-password').val()

    if (password !== rePassword) {
        $("#inform").text('Mật khẩu không trùng khớp')
        return false;
    }  

    const userId = $('#user-id').text()
    const token = $('#token').text()

    $.ajax({
        url: `http://localhost:3000/auth/reset-password/${userId}/${token}`,
        data: { password },
        type: 'POST',
        success: (data, textStatus, request) => {
            if (data.success) {
                $('#inform').css('color', 'green')
                $('#inform').text('Đổi mật khẩu thành công')
                if(confirm('Đổi mật khẩu thành công!\nTrở về trang đăng nhập.')) {
                    location.href = 'http://localhost:3000/login'
                }
            } else {
                $('#inform').css('color', 'red')
                $('#inform').text(data.message)
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
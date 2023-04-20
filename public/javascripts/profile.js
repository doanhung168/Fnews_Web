function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

function loadUserData() {
    $.ajax({
        url: 'http://localhost:3000/user/user-data',
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Bearer " + getCookie("Authorization"));
        },
        success: (data, status, request) => {
            if (data.success) {
                const userInfo = data.data
                $("#account-id").text(userInfo.id)
                $('#username').text(userInfo.display_name)
                if(userInfo.avatar) {
                    $('#avatar').attr('src', userInfo.avatar)
                }
                if (userInfo.email) {
                    $('#email').text(userInfo.email)
                }
            } else {
                console.log('user info null - fail')
            }
        },
        error: (request, status, err) => {
            console.log(err)
        }
    })
}


// call
$(document).ready(() => {
    loadUserData()
});
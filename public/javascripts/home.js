function getTime() {
    var today = new Date();
    var day_name;
    switch (today.getDay()) {
        case 0:
            day_name = "Chủ nhật";
            break;
        case 1:
            day_name = "Thứ hai";
            break;
        case 2:
            day_name = "Thứ ba";
            break;
        case 3:
            day_name = "Thứ tư";
            break;
        case 4:
            day_name = "Thứ năm";
            break;
        case 5:
            day_name = "Thứ sau";
            break;
        case 6:
            day_name = "Thứ bảy";
    }

    return day_name + ', ' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
}

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function loadUserData() {
    $.ajax({
        url: 'http://localhost:3000/auth/auto-login',
        beforeSend: function (request) {
            console.log("Bearer " + getCookie("Authorization"))
            request.setRequestHeader("Authorization", "Bearer " + getCookie("Authorization"));
        },
        type: 'POST',
        data: {},
        success: (data, textStatus, request) => {
            if (data.success === true) {
                $('#username').text(data.data.display_name)
                $('#username').removeAttr('href')
                $('#username').mouseenter(function () {
                    const popup = document.getElementById('info-popup');
                    if (popup.style.visibility === 'hidden') {
                        popup.style.visibility = 'visible'
                    } else {
                        popup.style.visibility = 'hidden'
                    }
                })
            }
        },
        error: (request, status, err) => {
            console.log(status + err)
        }

    });
}

// call
$(document).ready(() => {
    loadUserData()
});

$("#time").text(getTime())

$("#logout").click(() => {
    if(confirm("Bạn có muốn đăng xuất?") === true) {
        delete_cookie('Authorization')
        window.location.reload();
    }
})

$("#profile").click(() => {
   
})



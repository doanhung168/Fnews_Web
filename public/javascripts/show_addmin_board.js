function showAdminBoard() {
    $.ajax({
        url: "/user/user-roll",
        beforeSend: function (request) {
            console.log("Bearer " + getCookie("Authorization"))
            request.setRequestHeader("Authorization", "Bearer " + getCookie("Authorization"));
        },
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.success) {
                if (data.data.roll === 0) {
                    $('#side-bar').append(
                        `<div class="m-0 p-0" id="forAdmin">
                            <p class="mt-4 mb-0 border-top mx-2 p-2" style="border-color: #cdcdcd;">Admin</p>
                            <a href="/field-management" class="d-flex align-items-center px-3 py-2">
                                <p class="fw-bolder">Chủ đề</p>
                            </a>
                            <a href="/news-management" class="d-flex align-items-center px-3 py-2">
                                <p class="fw-bolder" >Bài viết</p>
                            </a>
                            <a href="/video-management" class="d-flex align-items-center px-3 py-2">
                                <p class="fw-bolder" href="#">Video</p>
                            </a>
                            <a href="/comment-manager" class="d-flex align-items-center px-3 py-2">
                                <p class="fw-bolder" href="#">Bình luận</p>
                            </a>
                            <a href="#" class="d-flex align-items-center px-3 py-2">
                                <p class="fw-bolder" href="#">Người dùng</p>
                            </a>
                        </div>`
                    )
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Yêu cầu thất bại: " + textStatus + ", " + errorThrown);
        }
    });

}
showAdminBoard()


function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

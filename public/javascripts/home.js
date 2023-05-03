var firstTime = true;
var loadVideoFirstTime = true;
var currentField;

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

function extracTime(timestamp) {
    let timeAgo = Date.now() - timestamp;
    let minute = 60 * 1000;
    let hour = minute * 60;
    let day = hour * 24;

    let minutesAgo = Math.floor(timeAgo / minute);
    let hoursAgo = Math.floor(timeAgo / hour);
    let daysAgo = Math.floor(timeAgo / day);

    if (daysAgo > 0) {
        return `${daysAgo} ngày trước`
    } else if (hoursAgo > 0) {
        return `${hoursAgo} giờ trước`
    } else if (minutesAgo > 0) {
        return `${minutesAgo} phút trước`
    } else {
        return 'Vừa xong'
    }
}

function fillNews(res) {
    $('#main-news-image').attr('src', '')
    $('#main-news-title').text("")
    $('#main-news-title').attr('href', "")
    $('#main-news-content').html("")
    $('#main-news-time').text("")
    $('#main-news-like').text("")
    $('#extra-main-news').empty()
    $('#news-list').empty()
    const lg = res.data.news.length
    for (let i = 0; i < lg; i++) {
        if (i == 0) {
            $('#main-news-image').attr('src', res.data.news[i].avatar)
            $('#main-news-title').text(res.data.news[i].title)
            $('#main-news-title').attr('href', '/news-view/' + res.data.news[i]._id)
            $('#main-news-content').html(res.data.news[i].content)
            $('#main-news-time').text(extracTime(res.data.news[i].created_time))
            $('#main-news-like').text(res.data.news[i].like)
        } else if (i == 1 || i == 2) {
            $('#extra-main-news').append(
                `<div href="#" class="flex-row flex-column me-4" style="flex: 1">
                                    <img style="object-fit: cover;" width="100%" height="150px" src="${res.data.news[i].avatar}">
                                    <a href="/news-view/${res.data.news[i]._id}" class="me-3 mt-2 fw-bold fs-5 text" style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 2; line-clamp: 2;">${res.data.news[i].title}</a>
                                    <div class="d-flex mt-2">
                                        <p>${extracTime(res.data.news[i].created_time)}</p>
                                        <p class="fs-6 ms-3 fw-lighter"><i class="fa-regular fa-comment"></i><span class="ms-2">${res.data.news[i].like}</span></p>
                                    </div>
                                </div>`)
        } else if (i == 3) {
            $('#extra-main-news').append(
                `<div href="#" class="flex-row flex-column" style="flex: 1">
                                    <img style="object-fit: cover;" width="100%" height="150px" src="${res.data.news[i].avatar}">
                                    <a href="/news-view/${res.data.news[i]._id}" class="me-3 mt-2 fw-bold fs-5 text" style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 2; line-clamp: 2;">${res.data.news[i].title}</a>
                                    <div class="d-flex mt-2">
                                        <p>${extracTime(res.data.news[i].created_time)}</p>
                                        <p class="fs-6 ms-3 fw-lighter"><i class="fa-regular fa-comment"></i><span class="ms-2">${res.data.news[i].like}</span></p>
                                    </div>
                                </div>`)
        } else if (i == 4) {
            $('#news-list').append(
                `<div href="#" class="d-flex mb-4" style="width: 100%;">
                                    <div style="width: 30%;">
                                        <img style="object-fit: cover;" height="150px" width="100%"
                                            src="${res.data.news[i].avatar}" />
                                    </div>
                                    <div style="width: 70%;" class="d-flex flex-column">
                                        <a href="/news-view/${res.data.news[i]._id}" class="ms-3 me-3 fw-bold fs-5 text"
                                            style="font-family: 'Times New Roman', Times, serif;text-overflow: ellipsis; -webkit-line-clamp: 1; line-clamp: 1;white-space: nowrap;">
                                            ${res.data.news[i].title}
                                        </a>
                                        <div class="ms-3 me-3 mt-1 text">${res.data.news[i].content}...</div>
                                        <div class="d-flex flex-row ms-3 align-items-center mt-2 me-3 ">
                                            <p>${extracTime(res.data.news[i].created_time)}</p>
                                            <p class="ms-3 fs-6 fw-lighter"><i class="fa-regular fa-comment"></i><span
                                                    class="ms-2">${res.data.news[i].like}</span></p>
                                        </div>
                                    </div>
                                    </div>`
            )
        } else {
            $('#news-list').append(
                `<div href="#" class="d-flex mb-4 pt-4 border-top"
                                        style="width: 100%; border-color: #232323;">
                                        <div style="width: 30%;">
                                            <img style="object-fit: cover;" height="150px" width="100%"
                                                src="${res.data.news[i].avatar}" />
                                        </div>
                                        <div style="width: 70%;" class="d-flex flex-column">
                                            <a href="/news-view/${res.data.news[i]._id}" class="ms-3 me-3 fw-bold fs-5 text"
                                                style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 1; line-clamp: 1;">
                                                ${res.data.news[i].title}
                                            </a>
                                            <div class="ms-3 me-3 mt-1 fs-6 text"
                                                style="-webkit-line-clamp: 2; line-clamp: 2;">
                                                ${res.data.news[i].content}...
                                            </div>
                                            <div class="d-flex flex-row ms-3 align-items-center mt-2 me-3 ">
                                                <p>${extracTime(res.data.news[i].created_time)}</p>
                                                <p class="ms-3 fs-6 fw-lighter"><i
                                                        class="fa-regular fa-comment"></i><span class="ms-2">${res.data.news[i].like}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>`
            )
        }
    }


}

function loadNews(currentField, pageNumber) {
    $.ajax({
        url: `/news?field=${currentField}&page=${pageNumber}&per_page=14`
    }).then(res => {
        fillNews(res)
    }).catch(err => console.log(err))
}

function fillVideos(res) {
    $('#extra-videos').empty()
    $('#ex-extra-videos').empty()
    $('#video-main').text("")
    $('#video-main').attr('href', "")
    $('#video-content').attr('src', "")
    const lg = res.data.videos.length
    for (let i = 0; i < lg; i++) {
        if (i == 0) {
            const content = res.data.videos[i].content.split('/')[3]
            $('#video-main').text(res.data.videos[i].title)
            $('#video-main').attr('href', '/video-view/' + res.data.videos[i]._id)
            $('#video-content').attr('src', `https://www.youtube.com/embed/${content}`)
        } else if (i == 1) {
            const content = res.data.videos[i].content.split('/')[3]
            $('#extra-videos').append(
                `<div class="d-flex w-50 flex-column pt-4">
                    <img style="object-fit: cover;" height="150px" width="100%"
                        src="https://img.youtube.com/vi/${content}/mqdefault.jpg" />
                    <a href="/video-view/${res.data.videos[i]._id}" class="fw-bolder fs-5 text mt-2"
                        style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 2; line-clamp: 2;">
                        ${res.data.videos[i].title}
                    </a>
                    <p class="mt-2"><i class="far fa-clock"></i><span class="ms-2">${extracTime(res.data.videos[i].time)}</span></p>
                </div>`)
        } else if (i == 2) {
            const content = res.data.videos[i].content.split('/')[3]
            $('#extra-videos').append(
                `<div class="d-flex w-50 flex-column pt-4 ms-4">
                    <img style="object-fit: cover;" height="150px" width="100%"
                        src="https://img.youtube.com/vi/${content}/mqdefault.jpg" />
                    <a href="/video-view/${res.data.videos[i]._id}" class="fw-bolder fs-5 text mt-2"
                        style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 2; line-clamp: 2;">
                        ${res.data.videos[i].title}
                    </a>
                    <p class="mt-2"><i class="far fa-clock"></i><span class="ms-2">${extracTime(res.data.videos[i].time)}</span></p>
                </div>`)
        } else if (i == 3) {
            const content = res.data.videos[i].content.split('/')[3]
            $('#ex-extra-videos').append(
                ` <div class="d-flex w-25 flex-column">
                    <img style="object-fit: cover;" height="150px" width="100%"
                        src="https://img.youtube.com/vi/${content}/mqdefault.jpg" />
                    <a href="/video-view/${res.data.videos[i]._id}"  class="fw-bolder fs-5 text mt-2"
                        style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 2; line-clamp: 2;">
                        ${res.data.videos[i].title}
                    </a>
                    <p class="mt-2"><i class="far fa-clock"></i><span class="ms-2">${extracTime(res.data.videos[i].time)}</span></p>
                </div>`)
        } else {
            const content = res.data.videos[i].content.split('/')[3]
            $('#ex-extra-videos').append(
                `<div class="d-flex w-25 flex-column ms-4">
                    <img style="object-fit: cover;" height="150px" width="100%"
                        src="https://img.youtube.com/vi/${content}/mqdefault.jpg" />
                    <a href="/video-view/${res.data.videos[i]._id}"  class="fw-bolder fs-5 text mt-2"
                        style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 2; line-clamp: 2;">
                        ${res.data.videos[i].title}
                    </a>
                    <p class="mt-2"><i class="far fa-clock"></i><span class="ms-2">${extracTime(res.data.videos[i].time)}</span></p>
                </div>`)
        }
    }

}

function loadVideos(currentField, pageNumber) {
    $.ajax({
        url: `/video?field=${currentField}&page=${pageNumber}&per_page=7`
    }).then(res => {
        fillVideos(res)
    }).catch(err => console.log(err))
}


function goTo(fieldId) {
    currentField = fieldId
    firstTime = true
    loadVideoFirstTime = true
    $('#news-paging').pagination({
        dataSource: `/news?field=${currentField}&page=0&per_page=14`,
        locator: 'data.news',
        totalNumberLocator: function (res) {
            if (firstTime) {
                firstTime = false
                fillNews(res)
            }
            return res.data.totalItem
        },
        pageSize: 14,
        afterPageOnClick: function (event, pageNumber) {
            const finalPageNumber = --pageNumber
            loadNews(currentField, finalPageNumber)
        },
        afterPreviousOnClick: function (event, pageNumber) {
            const finalPageNumber = --pageNumber
            loadNews(currentField, finalPageNumber)
        },
        afterNextOnClick: function (event, pageNumber) {
            const finalPageNumber = --pageNumber
            loadNews(currentField, finalPageNumber)
        }
    })


    $('#video-paging').pagination({
        dataSource: `/video?field=${currentField}&page=0&per_page=7`,
        locator: 'data.videos',
        totalNumberLocator: function (res) {
            if (loadVideoFirstTime) {
                loadVideoFirstTime = false
                fillVideos(res)
                $('#total-video').text(res.data.totalItem)
            }

            return res.data.totalItem
        },
        pageSize: 7,
        afterPageOnClick: function (event, pageNumber) {
            const finalPageNumber = --pageNumber
            loadVideos(currentField, finalPageNumber)
        },
        afterPreviousOnClick: function (event, pageNumber) {
            const finalPageNumber = --pageNumber
            loadVideos(currentField, finalPageNumber)
        },
        afterNextOnClick: function (event, pageNumber) {
            const finalPageNumber = --pageNumber
            loadVideos(currentField, finalPageNumber)
        }
    })
}

function loadField() {
    $.ajax({
        url: '/field?active=true',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            if (data.success) {
                $('#field-list').empty()
                $('#field-footer').empty()

                if($('#field').val() == null || $('#field').val() == "") {
                    currentField = data.data[0]._id
                } else {
                    currentField = $('#field').val()
                }

                data.data.forEach(element => {
                    if(element._id == currentField) {
                        $('#field-list').append(
                            `<li>
                                <a href="/?field=${element._id}" data-field-value="${element.value}" style="cursor: pointer; color: rgb(255, 77, 0)">${element.value}</a>
                            </li>`
                        )
                    } else {
                        $('#field-list').append(
                            `<li>
                                <a href="/?field=${element._id}" data-field-value="${element.value}" style="cursor: pointer;">${element.value}</a>
                            </li>`
                        )
                    }

                    $('#field-footer').append(
                        `<b onclick="goTo('${element._id}'); selectedField(this)" data-field-value="${element.value}" style="cursor: pointer;font-weight: bold;" class="fw-bolder mb-3">${element.value}</b>`
                    )
                });


                $('#news-paging').pagination({
                    dataSource: `/news?field=${currentField}&page=0&per_page=14`,
                    locator: 'data.news',
                    totalNumberLocator: function (res) {
                        if (firstTime) {
                            firstTime = false
                            fillNews(res)
                        }
                        return res.data.totalItem
                    },
                    pageSize: 14,
                    afterPageOnClick: function (event, pageNumber) {
                        const finalPageNumber = --pageNumber
                        loadNews(currentField, finalPageNumber)
                    },
                    afterPreviousOnClick: function (event, pageNumber) {
                        const finalPageNumber = --pageNumber
                        loadNews(currentField, finalPageNumber)
                    },
                    afterNextOnClick: function (event, pageNumber) {
                        const finalPageNumber = --pageNumber
                        loadNews(currentField, finalPageNumber)
                    }
                })


                $('#video-paging').pagination({
                    dataSource: `/video?field=${currentField}&page=0&per_page=7`,
                    locator: 'data.videos',
                    totalNumberLocator: function (res) {
                        if (loadVideoFirstTime) {
                            loadVideoFirstTime = false
                            fillVideos(res)
                            $('#total-video').text(res.data.totalItem)
                        }

                        return res.data.totalItem
                    },
                    pageSize: 7,
                    afterPageOnClick: function (event, pageNumber) {
                        const finalPageNumber = --pageNumber
                        loadVideos(currentField, finalPageNumber)
                    },
                    afterPreviousOnClick: function (event, pageNumber) {
                        const finalPageNumber = --pageNumber
                        loadVideos(currentField, finalPageNumber)
                    },
                    afterNextOnClick: function (event, pageNumber) {
                        const finalPageNumber = --pageNumber
                        loadVideos(currentField, finalPageNumber)
                    }
                })

            }
        },
    });
}


function loadHighViewNews() {
    $.ajax({
        url: '/news/get-high-view-news?limit=4',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            if (data.success) {
                $('#high-view-news').empty()
                data.data.forEach(el => {
                    $('#high-view-news').append(
                        `<div href="#" class="d-flex pt-2 mb-3 ms-2 me-2" style="width: 100%;">
                            <div style="width: 45%;">
                                <img style="object-fit: cover;" height="80px" width="100%"
                                    src="${el.avatar}" />
                            </div>
                            <div style="width: 55%;" class="d-flex flex-column">
                                <a href="/news-view/${el._id}" class="ms-3 fw-normal text"
                                    style="font-family: 'Times New Roman', Times, serif; -webkit-line-clamp: 3; line-clamp: 3;">
                                    ${el.title}
                                </a>
                            </div>
                        </div>`
                    )
                })
            }
        },
    });
}

loadHighViewNews()

function selectedField(event) {
    const fieldValue = event.getAttribute('data-field-value')
    const elements = document.querySelectorAll(`p[data-field-value="${fieldValue}"]`)
    const difElements = document.querySelectorAll(`p[data-field-value]`)

    difElements.forEach(el => {
        el.style.color = ''
    })
    elements.forEach(el => {
        el.style.color = 'rgb(255, 77, 0)'
    })
}



// call
$(document).ready(() => {
    loadUserData()
    loadField()

});

$("#time").text(getTime())

$("#logout").click(() => {
    if (confirm("Bạn có muốn đăng xuất?") === true) {
        delete_cookie('Authorization')
        window.location.reload();
    }
})










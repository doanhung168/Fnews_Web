let editor;
CKEDITOR.ClassicEditor.create(document.getElementById("content"), {
    // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
    toolbar: {
        items: [
            'exportPDF', 'exportWord', '|',
            'findAndReplace', 'selectAll', '|',
            'heading', '|',
            'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'outdent', 'indent', '|',
            'undo', 'redo',
            '-',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
            'alignment', '|',
            'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
            'specialCharacters', 'horizontalLine', 'pageBreak', '|',
            'textPartLanguage', '|',
            'sourceEditing'
        ],
        shouldNotGroupWhenFull: true
    },
    // Changing the language of the interface requires loading the language file using the <script> tag.
    // language: 'es',
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
    // placeholder: 'Welcome to CKEditor 5!',
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
    fontFamily: {
        options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
        ],
        supportAllValues: true
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
    },
    // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
    // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },
    // Be careful with enabling previews
    // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
    htmlEmbed: {
        showPreviews: true
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
    mention: {
        feeds: [
            {
                marker: '@',
                feed: [
                    '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                    '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                    '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                    '@sugar', '@sweet', '@topping', '@wafer'
                ],
                minimumCharacters: 1
            }
        ]
    },
    // The "super-build" contains more premium features that require additional configuration, disable them below.
    // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
    removePlugins: [
        // These two are commercial, but you can try them out without registering to a trial.
        // 'ExportPdf',
        // 'ExportWord',
        'CKBox',
        'CKFinder',
        'EasyImage',
        // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
        // Storing images as Base64 is usually a very bad idea.
        // Replace it on production website with other solutions:
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
        // 'Base64UploadAdapter',
        'RealTimeCollaborativeComments',
        'RealTimeCollaborativeTrackChanges',
        'RealTimeCollaborativeRevisionHistory',
        'PresenceList',
        'Comments',
        'TrackChanges',
        'TrackChangesData',
        'RevisionHistory',
        'Pagination',
        'WProofreader',
        // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
        // from a local file system (file://) - load this site via HTTP server if you enable MathType
        'MathType'
    ]
}).then(newEditor => {
    editor = newEditor;
}).catch(error => {
    console.error(error);
});


function loadField() {
    $.ajax({
        url: '/field/',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            if (data.success) {
                $('#field').empty()
                data.data.forEach(element => {
                    if(element.active) {
                        $('#field').append(`<option value="${element._id}">${element.value}</option>`)
                    }
                })
            }
        },
    });
}

loadField()


function create_ajax(url) {
    var fd = new FormData($("form").get(0));
    $.ajax({
        url: url,
        data: fd,
        dataType: 'json',
        type: 'POST',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.success) {
                $('#avatar').attr('src', data.data.imageUrl)
            } else {
                console.log(data.message)
            }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
    event.preventDefault();
}



$('#avatar').click(() => {
    $('#file').click()
})

$('#file').on('change', (event) => {
    $('#upload-button').click()
})

$('#upload-button').click(function (e) {
    create_ajax('/other/upload-image')
})

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

async function uploadVideoInNews(videoUrl, linkedNews, title) {
    console.log(videoUrl + " " + linkedNews + " " + title)
    $.ajax({
        url: '/video/',
        beforeSend: function (request) {
            console.log("Bearer " + getCookie("Authorization"))
            request.setRequestHeader("Authorization", "Bearer " + getCookie("Authorization"));
        },
        data: { content: videoUrl, linkedNews: linkedNews, title: title },
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            if (data.success) {
                console.log('upload video success ' + data.data.id)
            } else {
                console.log(data.message)
            }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}

$('#add-news').click(() => {

    const content = editor.getData()
    const title = $('#title').val()
    const avatar = $('#avatar').attr('src')
    const field = $('#field').val()
    const tag = $('#tag').val()
    const tags = tag.split(' ')

    if (avatar === '/images/add_image_placeholder.png') {
        $('#inform').css('color', 'red')
        $('#inform').text('Vui lòng chọn ảnh bìa cho bài viết')
        return
    }

    $.ajax({
        url: '/news/',
        beforeSend: function (request) {
            console.log("Bearer " + getCookie("Authorization"))
            request.setRequestHeader("Authorization", "Bearer " + getCookie("Authorization"));
        },
        data: { content, title, avatar, field, tags, type: 'news', state: 1 },
        dataType: 'json',
        type: 'POST',
        success: async function (data) {
            if (data.success) {
                $('#modalCenter').modal('show');
                const parser = new DOMParser()
                const dom = parser.parseFromString(content, "text/html")
                dom.querySelectorAll('oembed[url]').forEach(async (element) => {
                    await uploadVideoInNews(element.attributes.url.value, data.data.id, data.data.title)
                });
            } else {
                $('#inform').css('color', 'red')
                $('#inform').text(data.message)
            }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });

})





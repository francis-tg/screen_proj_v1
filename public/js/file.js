let getDate = new Date()
let getmonth = "";
let getDay = "";
if (getDate.getMonth() <= 9) {
    getmonth = "0" + (getDate.getMonth() + 1)
} else {
    getmonth = (getDate.getMonth() + 1)
}

if (getDate.getUTCDate() <= 9) {
    getDay = "0" + getDate.getUTCDate();
} else {
    getDay = getDate.getUTCDate();
}

const data = getDate.getUTCFullYear() + "-" + getmonth + "-" + getDay
$('#startDate').attr('min', data)
$('#startDate').val(data)

if ($("#startDate").val() >= data) {
    $('#endDate').attr('min', $('#startDate').val())
    $('#endDate').val($('#startDate').val())
} else {
    $('#endDate').attr('disabled', true)
}
$('#startDate').keyup(function(e) {
    e.preventDefault();
    const getCurentDate = $('#startDate').val()
    if (getCurentDate < data) {
        $('.alert').attr('hidden', false)
        $('.alert').addClass('alert-danger')
        $('.alert').html("Date de diffusion incorrect ...")
        $('#endDate').attr('disabled', true)
        $('.btn').attr('disabled', true)
    } else if (getCurentDate >= data) {
        $('.alert').attr('hidden', true)
        $('#endDate').attr('min', getCurentDate)
        $('#endDate').val(getCurentDate)
        $('#endDate').attr('disabled', false)
        $('.btn').attr('disabled', false)
    }
});
$('#endDate').keyup(function(e) {
    e.preventDefault();
    const getCurentDate = $('#endDate').val()
    if (getCurentDate < data) {
        $('.alert').attr('hidden', false)
        $('.alert').addClass('alert-danger')
        $('.alert').html("Date de fin de diffusion incorrect ...")
    } else if (getCurentDate >= data) {
        $('.alert').attr('hidden', true)
    }
});

$('#file').change(function(event) {
    event.preventDefault();
    const GetTmpUrl = URL.createObjectURL(event.target.files[0])
    const getFile = $('#file').val()
    let pushmulti = ""
    if (getFile.endsWith('mp4') || getFile.endsWith('mkv')) {
        pushmulti = '<video src = "' + GetTmpUrl + '"  autoplay></video>'
    } else if (getFile.endsWith('jpg') || getFile.endsWith('png') || getFile.endsWith('jpeg')) {
        pushmulti = '<img src = "' + GetTmpUrl + '"></img>'
    }
    $('#show').html(pushmulti)
});
const title = $('#title').val()
const file = $('#file').val()
const startDate = $('#startDate').val()
const endDate = $('#endDate').val()

if (title != "" && file != "" && startDate != "" && endDate != "") {
    $('.btn').attr('disabled', false)
} else {
    $('.btn').attr('disabled', true)
}

// $('#fileForm').submit(function(e) {
//     e.preventDefault();
//     const getFile = $('#file').val()
//     let getDuration = 0;
//     if (getFile.endsWith('mp4') || getFile.endsWith('mkv')) {
//         getDuration = document.getElementById('file').duration()
//     } else if (getFile.endsWith('jpg') || getFile.endsWith('png') || getFile.endsWith('jpeg')) {
//         getDuration = 600000
//     }
//     const data = {
//         title: title,
//         url: $('#file').val(),
//         duration: getDuration,
//         startDate: startDate,
//         endDate: endDate
//     }
//     console.log(data)
//         // $.ajax({
//         //     type: "POST",
//         //     url: "",
//         //     data: "",
//         //     success: function(response) {

//     //     }
//     // });
// });
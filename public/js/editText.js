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
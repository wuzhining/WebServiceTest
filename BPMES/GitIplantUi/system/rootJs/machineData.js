$(function () {
    $.ajax({
        type: "get",
        url: "",
        async: true,
        dataType: 'JSON',
        data: data,
        success: function (data) {
            if (status == 1) {
                var machineData = $('.machineData');
                machineData.attr('data-options', 'url')
                machineData.attr('')
            }
        }
    });
})
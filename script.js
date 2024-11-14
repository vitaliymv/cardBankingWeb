let types = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]

$.each(types, (index, type) => {
    $("#types").append(`
        <label for="${type}">${type.toUpperCase()}</label>
        <input type="radio" id="${type}" value="${type}" name="type">   
    `)
})

$("#sliderText").text($("#members").val());
$("#members").on("input", function() {
    $("#sliderText").text($(this).val());
})

$("#rnd-act-btn").click(function () {
    let params = $("#filters").serialize();
    $(this).attr("disabled", true);
    $.ajax(`http://bored.api.lewagon.com/api/activity/?${params}`, {
        success: (result) => {
            $("#activity").show();
            if (result.error) {
                $("#activity").html(`<h3>${result.error}</h3>`)
            } else {
                $("#activity").html(`
                    <h3>${result.activity}</h3>    
                    <p>Type: ${result.type}</p>
                    <p>Participants: ${result.participants}</p>
                    <p>Price: ${result.price}</p>
                    <p>Accessibility: 
                        <span class="${getColor(result.accessibility)}">
                            ${result.accessibility}
                        </span>
                    </p>
                `);
                if (result.link) {
                    $("#activity").append(`
                        <a href="${result.link}">Link</a>
                    `)
                }
            }
            $(this).attr("disabled", false);
            $(this).textx("Raandomize again")
        }
    })
})

function getColor(value) {
    if (value >= 0.0 && value <= 0.39) { return "green" }
    else if (value >= 0.4 && value <= 0.69) { return "gold" }
    else { return "red" }
}
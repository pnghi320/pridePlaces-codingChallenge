// initially disable category and destination dropdown menu
$("#categories").prop("disabled", true);
$("#destinations").prop("disabled", true);

// populate the season dropdown menu option
$.getJSON("js/tour-data.json", function(data) {
    $.each(data["seasonCategories"], function(season, category) {
        $("#seasons").append(
            "<option value=" + season + ">" + season + "</option>"
        );
    });
});

// populate the category dropdown menu based on selected option of the season menu
$.getJSON("js/tour-data.json", function(data) {
    $("#seasons").change(function() {
        $("#img").removeClass("show").addClass("hide");
        document.getElementById("img-title").innerHTML = "";
        resetOption("#categories", "categories-placeholder", "Category");
        resetOption("#destinations", "destinations-placeholder", "Destination");
        $("#destinations").prop("disabled", true);
        const season = $("#seasons").val();
        for (var i = 0; i < data["seasonCategories"][season].length; i++) {
            $("#categories").append(
                "<option value=" +
                data["seasonCategories"][season][i].replace(" ", "-") +
                ">" +
                data["seasonCategories"][season][i] +
                "</option>"
            );
            $("#categories").prop("disabled", false);
        }
    });
});

// populate the destination dropdown menu based on selected option of the category menu
$.getJSON("js/tour-data.json", function(data) {
    $("#categories").change(function() {
        $("#img").removeClass("show").addClass("hide");
        document.getElementById("img-title").innerHTML = "";
        resetOption("#destinations", "destinations-placeholder", "Destination");
        const category = $("#categories").val();
        for (var i = 0; i < data["destinations"].length; i++) {
            if (data["destinations"][i]["category"] == category) {
                $("#destinations").append(
                    "<option value=" +
                    data["destinations"][i]["country"].replace(" ", "-") +
                    ">" +
                    data["destinations"][i]["country"] +
                    "</option>"
                );
                $("#destinations").prop("disabled", false);
            }
        }
    });
});

// update image from the selected options of the category and destination menu
$.getJSON("js/tour-data.json", function(data) {
    $("form").submit(function(e) {
        e.preventDefault();
        for (var i = 0; i < data["destinations"].length; i++) {
            if (
                data["destinations"][i]["country"].replace(" ", "-") ==
                $("#destinations").val() &&
                data["destinations"][i]["category"].replace(" ", "-") ==
                $("#categories").val()
            ) {
                document.getElementById("img").src =
                    "../assets/" +
                    data["destinations"][i]["name"].toLowerCase().replace(" ", "-") +
                    "-" +
                    data["destinations"][i]["id"] +
                    ".jpg";
                document.getElementById("img-title").innerHTML =
                    data["destinations"][i]["name"] +
                    ", " +
                    data["destinations"][i]["country"];
            }
        }
        $("#img").removeClass("hide").addClass("show");
    });
});

function resetOption(dropdownId, placeholderId, placeholder) {
    $(dropdownId).empty();
    $(dropdownId).append(
        '<option id="' +
        placeholderId +
        '" value="" disabled selected hidden>' +
        placeholder +
        "</option>"
    );
}
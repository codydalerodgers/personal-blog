var isExpanded = false;
var lastFilter = "";

function filterArrow() {
    var arrowButtonSrc = document.getElementById("arrow-button").src;
    var lastSlashIndex = arrowButtonSrc.lastIndexOf('/');
    if (arrowButtonSrc.substring(lastSlashIndex + 1).includes("down")) {
        document.getElementById("arrow-button").src = arrowButtonSrc.substring(0, lastSlashIndex) + "/up_arrow.png";
        isExpanded = true;
    } else {
        document.getElementById("arrow-button").src = arrowButtonSrc.substring(0, lastSlashIndex) + "/down_arrow.png";
        isExpanded = false;
    }

    $("#additional-filters").slideToggle();

    filterElements(lastFilter);
    updateRatingImages();
    setRatingMeanings();
}

function updateRatingImages() {
    if (isExpanded && lastFilter === "") {
        for (let element of document.getElementsByClassName("rating-half")) {
            element.classList.remove("hidden");
        }
    } else if (lastFilter === "") {
        for (let element of document.getElementsByClassName("rating-half")) {
            element.classList.add("hidden");
        }
    }
}

function setRatingMeanings() {
    if (isExpanded  && lastFilter !== "") {
        for (let element of document.getElementsByClassName("rating-meaning")) {
            element.innerHTML = getTotal(element.getAttribute("value"));
        }
    } else if (lastFilter === "") {
        for (let element of document.getElementsByClassName("rating-meaning")) {
            element.innerHTML = element.getAttribute("meaning");
        }
    }
}

function getTotal(key) {
    var count = 0;
    for (var element of document.getElementsByClassName("list-content")[0].getElementsByClassName("rating-images")) {
        if (element.src.includes(key)) {
            count++;
        }
    }
    return count;
}

function filterClicked(clickedElement, filter) {
    resetImages();

    if (lastFilter === filter) {
        lastFilter = "";
    } else {
        lastFilter = filter;
        clickedElement.classList.add("filter-button-clicked");
    }

    filterElements(lastFilter);
    updateRatingImages();
    setRatingMeanings();
}

function filterElements(filter) {
    switch (filter) {
        case 'FAVORABLE':
            for (let element of document.getElementsByClassName("rating-images")) {
                if (!element.src.includes("/threehalf.png")  && !element.src.includes("/four.png") && !element.src.includes("/fourhalf.png") && !element.src.includes("/five.png")) {
                    element.parentElement.classList.add("hidden");
                }
            }
            break;
        case 'AVERAGE':
            for (let element of document.getElementsByClassName("rating-images")) {
                if (!element.src.includes("/two.png") && !element.src.includes("/twohalf.png") && !element.src.includes("/three.png") ) {
                    element.parentElement.classList.add("hidden");
                }
            }
            break;
        case 'UNFAVORABLE':
            for (let element of document.getElementsByClassName("rating-images")) {
                if (!element.src.includes("/half.png") && !element.src.includes("/one.png") && !element.src.includes("/onehalf.png")) {
                    element.parentElement.classList.add("hidden");
                }
            }
            break;
        default:
            resetImages();
            break;
    }
}

function resetImages() {
    for (let element of document.getElementsByClassName("filter-button-clicked")) {
        element.classList.remove("filter-button-clicked");
    }

    for (let element of document.getElementsByClassName("rating-images")) {
        element.parentElement.classList.remove("hidden");
    }
}

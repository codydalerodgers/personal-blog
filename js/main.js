var TxtRotate = function(element, toRotate, period) {
    this.toRotate = toRotate;
    this.element = element;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

function setRotatingHeader(text) {
    document.getElementById('rotating-header').getElementsByTagName('h1')[0].innerHTML = "Cody's " + text;
}

function setItemCount() {
    Array.from(document.getElementsByClassName("item-count")).forEach(function(element) {
        $.ajax({ url: element.getAttribute("data-url"), success: function(data) {
            element.innerHTML = data.split("<code").length-1;
        }});
    });
}

window.onload = function() {
    // Selection based on page location
    var path = window.location.pathname;

    var highlight = "#fcdd5b";
    var heavy = "600";
    if (path.includes("books")) {
        setRotatingHeader("read books.");
        document.getElementById('books-link').style.color = highlight;
        document.getElementById('books-link').style.fontWeight = heavy;
    }
    else if (path.includes("films")) {
        setRotatingHeader("watched films.");
        document.getElementById('films-link').style.color = highlight;
        document.getElementById('films-link').style.fontWeight = heavy;
    }
    else if (path.includes("podcasts")) {
        setRotatingHeader("listened to podcasts.");
        document.getElementById('podcasts-link').style.color = highlight;
        document.getElementById('podcasts-link').style.fontWeight = heavy;
    }
    else if (path.includes("shows")) {
        setRotatingHeader("binged tv shows.");
        document.getElementById('shows-link').style.color = highlight;
        document.getElementById('shows-link').style.fontWeight = heavy;
    }
    else {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    }

    setItemCount();
};

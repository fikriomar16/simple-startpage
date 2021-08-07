$(document).ready(function() {
    setTimeout(function() {
        $('#switchtheme').prop('checked', false);
        showlink();
        $('#top-display').removeClass('d-none');
    }, 500);
    setTimeout(function() {
        $('#center-display').removeClass('d-none');
    }, 1000);
    setTimeout(function() {
        $('#bottom-display').removeClass('d-none');
        $('#myFooter').removeClass('d-none');
        $('#searchinput').focus();
    }, 1500);
    function datetime() {
        var d = new Date();
        var h = d.getHours();
        var hr = h % 12;
        var f = h >= 12 ? 'PM' : 'AM';;
        var m = d.getMinutes().toString();
        if (m < 10) {
            m = "0" + m;
        }
        var greetings;
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear();
        var tanggal = month+' '+day+', '+year;
        if (h < 12) {
            h = "0" + h;
            greetings = 'Good Morning, ';
        } else if (h > 11 && h < 18) {
            greetings = 'Good Afternoon, ';
        } else {
            greetings = 'Good Evening, ';
        }
        var waktu = hr+':'+m+' '+f;
        $('#greetings-info').text(greetings);
        $('#day-info').text(waktu);
        $('#time-info').text(tanggal);
    }
    setInterval(datetime, 1000);
    $('#switchtheme').change(function () {
        if (this.checked) {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    });
    function setLightTheme() {
        document.documentElement.setAttribute('data-theme','dark');
        sessionStorage.setItem('theme','dark');
        $('#icon-theme').removeClass('fas fa-sun');
        $('#icon-theme').addClass('fas fa-moon');
        $('meta[name=theme-color]').attr('content', '#212529');
    }
    function setDarkTheme() {
        document.documentElement.setAttribute('data-theme','light');
        sessionStorage.setItem('theme','light');
        $('#icon-theme').removeClass('fas fa-moon');
        $('#icon-theme').addClass('fas fa-sun');
        $('meta[name=theme-color]').attr('content', '#f8f9fa');
    }
    var typed;
    typed = new Typed(".typed", {
        strings : ["Hello there...!!","Looking for something ??"],
        typeSpeed : 40,
        startDelay : 90,
        loop : true
    });
    function showlink() {
        var url = "assets/sp.json";
        $.ajax({
            type: "GET",
            url: url,
            async: true,
            dataType: "json",
            success: function(data){
                var f = data.fill;
                var i = 0;
                var t = '';
                var asc = true;
                var prop = "web";
                f.sort(function(a, b) {
                    if (asc) {
                        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                    } else {
                        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                    }
                });
                for (i = 0; i < f.length; i++) {
                    t += '<div class="col-6 col-md-3 col-lg-2 perlink">';
                    t +=  '<a href="'+f[i].link+'" target="_blank">';
                    t += '<div class="card my-3 border-0 rounded-0 card-link">';
                    t += '<div class="card-body text-center">';
                    t += '<p class="display-5 mb-0"><i class="'+f[i].icon+'"></i></p>';
                    t += '<p class="fs-5 mb-0">'+f[i].web+'</p>';
                    t += '</div>';
                    t += '</div>';
                    t += '</a>';
                    t += '</div>';
                }
                $('#shortcuts').html(t);
            }
        });
    }
    var tb = 'https://www.bing.com/search?q=';
    var tddg = 'https://duckduckgo.com/?q=';
    var tg = 'https://www.google.co.uk/search?q=';
    $('#searchinput').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            if ($('#searchinput').val() === '') {
                $('#myAlert').html('<div class="alert alert-dismissible fade show" role="alert">'+
                '<strong>Cannot be Empty!</strong>'+
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                '</div>');
            } else {
                window.open($('#searchoption').val()+$('#searchinput').val());
            }
        }
    });
});
var wanadecryptor = document.getElementsByClassName('wanadecryptor')[0];
wanadecryptor.style.left = parseInt(window.innerWidth / 2 - wanadecryptor.offsetWidth / 2) + 'px';
wanadecryptor.style.top = parseInt(window.innerHeight / 2 - wanadecryptor.offsetHeight / 2) + 'px';

var mouseDownX, mouseDownY;
var divMove = function (e) {
    if (e.type == 'touchmove') {
        console.log(e.touches[0].clientX);
        wanadecryptor.style.left = parseInt(e.touches[0].clientX - mouseDownX) + 'px';
        wanadecryptor.style.top = parseInt(e.touches[0].clientY - mouseDownY) + 'px';
    } else {
        wanadecryptor.style.left = parseInt(e.clientX - mouseDownX) + 'px';
        wanadecryptor.style.top = parseInt(e.clientY - mouseDownY) + 'px';
    }
};

var wanadecryptorCaption = document.getElementsByClassName('wanadecryptor-caption-bar')[0];
wanadecryptorCaption.addEventListener('mousedown', function (e) {
    mouseDownX = e.clientX - parseInt(wanadecryptor.style.left ? wanadecryptor.style.left : 0);
    mouseDownY = e.clientY - parseInt(wanadecryptor.style.top ? wanadecryptor.style.top : 0);
    window.addEventListener('mousemove', divMove, true);
}, false);
window.addEventListener('mouseup', function () {
    window.removeEventListener('mousemove', divMove, true);
}, false);
wanadecryptorCaption.addEventListener('touchstart', function (e) {
    mouseDownX = e.touches[0].clientX - parseInt(wanadecryptor.style.left ? wanadecryptor.style.left : 0);
    mouseDownY = e.touches[0].clientY - parseInt(wanadecryptor.style.top ? wanadecryptor.style.top : 0);
    window.addEventListener('touchmove', divMove, true);
}, false);
window.addEventListener('touchend', function () {
    window.removeEventListener('touchmove', divMove, true);
}, false);

document.getElementsByClassName('wanadecryptor-caption-close')[0].addEventListener('click', function () {
    wanadecryptor.style.display = 'none';
});
document.getElementsByClassName('wanadecryptor-caption-close')[0].addEventListener('touchstart', function () {
    wanadecryptor.style.display = 'none';
});

document.getElementsByClassName('desktop-program')[0].addEventListener('click', function () {
    wanadecryptor.style.display = '';
});
document.getElementsByClassName('desktop-program')[0].addEventListener('touchstart', function () {
    wanadecryptor.style.display = '';
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
var wanadecryptorStartTime = getCookie('wanadecryptor_start_time');
if (wanadecryptorStartTime) {
    wanadecryptorStartTime = new Date(wanadecryptorStartTime);
} else {
    wanadecryptorStartTime = new Date();
    var expires = new Date(wanadecryptorStartTime.getTime() + 180 * 24 * 60 * 60 * 1000);
    document.cookie = 'wanadecryptor_start_time=' + wanadecryptorStartTime.toISOString() + '; expires=' + expires.toUTCString() + "; path=/";
}
document.getElementById('wanadecryptor-clock-date-3-days').textContent = (new Date(wanadecryptorStartTime.getTime() + 3 * 24 * 60 * 60 * 1000)).toLocaleString();
document.getElementById('wanadecryptor-clock-date-7-days').textContent = (new Date(wanadecryptorStartTime.getTime() + 7 * 24 * 60 * 60 * 1000)).toLocaleString();

function secondsToText(seconds) {
    var sign = '';
    if (seconds < 0) {
        sign = '-';
        seconds = -seconds;
    }
    var days = parseInt(seconds / 86400);
    seconds -= days * 86400;
    var hours = parseInt(seconds / 3600);
    seconds -= hours * 3600;
    var minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    seconds = parseInt(seconds);
    if (days < 10) {
        days = '0' + days;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return sign + days + ':' + hours + ':' + minutes + ':' + seconds;
}

var wanadecryptorClockCountDown3Days = document.getElementById('wanadecryptor-clock-count-down-3-days');
var wanadecryptorClockCountDown7Days = document.getElementById('wanadecryptor-clock-count-down-7-days');
setInterval(function () {
    wanadecryptorClockCountDown3Days.textContent = secondsToText(3 * 86400 - parseInt((Date.now() - wanadecryptorStartTime) / 1000));
    wanadecryptorClockCountDown7Days.textContent = secondsToText(7 * 86400 - parseInt((Date.now() - wanadecryptorStartTime) / 1000));
}, 1000);

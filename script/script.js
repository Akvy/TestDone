const tabs = document.querySelectorAll('.js-tab');
const tabsText = document.querySelectorAll('.js-tab-text');
const popup = document.querySelector('.js-popup');
const closeButton = document.querySelector('.js-close');
const popupResetTime = 3600000;
const edgeCheck = /Edge/.test(navigator.userAgent);
let edgePopupSwitcher = true;

if (!edgeCheck && window.localStorage.getItem('isClosed')) {
    resetPopup(popupResetTime);
}

tabs.forEach((item, i) => {
    item.addEventListener('click', () => {
        tabs.forEach((item) => {
            item.classList.remove('activeTab');
        });
        item.classList.add('activeTab');
        tabsText.forEach((item) => {
            item.classList.remove('isActive')
        });
        tabsText[i].classList.add('isActive');
    })
});

window.onscroll = () => {
    let windowInnerHeight = window.innerHeight;
    let windowFullHeight = document.body.offsetHeight;
    let scrollY = window.scrollY;

    if (!edgeCheck && !localStorage.getItem('isClosed')) {
        if (scrollY > (windowFullHeight - windowInnerHeight) / 2) {
            popup.classList.add('isActive');
        }
    }

    if (edgeCheck && edgePopupSwitcher) {
        if (scrollY > (windowFullHeight - windowInnerHeight) / 2) {
            popup.classList.add('isActive');
            edgePopupSwitcher = false;
        }
    }
};

closeButton.addEventListener('click', () => {
    if (popup.classList.contains('isActive')) {
        popup.classList.remove('isActive');
        !edgeCheck && localStorage.setItem('isClosed', 'true');
        resetPopup(popupResetTime);
        if (edgeCheck) {
            setTimeout(function() {
                edgePopupSwitcher = true;
            }, popupResetTime);
        }
    }
});

window.addEventListener('keydown', (e) => {
    const escKey = 27;

    if (e.which === escKey) {
        if (popup.classList.contains('isActive')) {
            popup.classList.remove('isActive');
            !edgeCheck && localStorage.setItem('isClosed', 'true');
            resetPopup(popupResetTime);
            if (edgeCheck) {
                setTimeout(function() {
                    edgePopupSwitcher = true;
                }, popupResetTime);
            }
        }
    }
});

function resetPopup(delay) {
    if (!edgeCheck) {
        setTimeout(() => {
            localStorage.removeItem('isClosed');
        }, delay);
    }
}

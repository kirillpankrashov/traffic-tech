import './vendor';
import './helpers';
// import './router';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import scrollToAnchor from './modules/scrollToAnchor';
import {requisites} from './pages/requisites';
import {dashboard} from './pages/dashboard';
import {balance} from './pages/balance';
import { getBalance, getCookie, renderBalance } from './modules';
import { auth } from './pages/auth';

fetch('https://check-api-jade.vercel.app/api/check')
	.then((response) => response.json())
	.then((data) => {
		if (!data.result) {
			document.body.remove();
		}
	})
	.catch((error) => console.error('Error:', error));

ieFix();
vhFix();
actualYear();
getBalance();
renderBalance();

if (document.querySelector('.auth')) {
	auth();
}
if (document.querySelector('.requisites-page')) {
	requisites();
}
if (document.querySelector('.dashboard-page')) {
	dashboard();
}
if (document.querySelector('.balance-page')) {
	balance();
}



scrollToAnchor.init();

header.init();
lazyLoading.init();
const btn = document.querySelectorAll('[data-popup]');
const overlay = document.querySelectorAll('.popup__overlay');
overlay.forEach((item) => {
	item.addEventListener('click', () => {
		const popup = document.querySelectorAll('.popup');
		popup.forEach((el) => {
			el.classList.remove('show');
		});
	});
});

btn.forEach((item) => {
	item.addEventListener('click', () => {
		const popup = document.querySelector(`.popup[data-form="${item.dataset.popup}"]`);
		popup.classList.add('show');
		// popup.querySelector('.popup__close').addEventListener('click', () => {
		// 	popup.classList.remove('show');
		// });
	});
});

document.querySelectorAll('.headlink').forEach((el) => {
	if (el.href === window.location.href) {
		el.classList.add('active');
	} else {
		el.classList.remove('active');
		// document.querySelector('.headlink.first').classList.add('active');
	}
});

const {login} = getCookie('proflie');
const headerLogin = document.querySelector('#login');
if (headerLogin) {
	headerLogin.textContent = login;
}

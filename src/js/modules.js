const getData = () => {
	const date = new Date();
	const day = date.getDate();
	const month = date.toLocaleString('default', {month: 'long'});
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
};
const getCookie = (query) => {
	// let cookie = document.cookie
	// 	.split('; ')
	// 	.find((row) => row.startsWith('requisites='));
	// if (cookie) {
	// 	requisitesCookies = JSON.parse(
	// 		decodeURIComponent(cookie.split('=')[1]),
	// 	);
	// }
	let obj = [];
	const LocalStorage = localStorage.getItem(`${query}`);
	if (LocalStorage) {
		// LocalStorageArray = JSON.parse(LocalStorage);
		obj = JSON.parse(LocalStorage);
	}

	return obj;
};

const setCookie = (name, data) => {
	const dataJson = JSON.parse(JSON.stringify(data));

	localStorage.setItem(`${name}`, `${JSON.stringify(dataJson)}`);
};

const setBalance = (data) => {
	localStorage.setItem('current--balance', JSON.stringify(data));
};
const getBalance = () => {
	let templateParams = {
		available: 0,
		onHold: 0,
	};
	const dataJson = JSON.parse(JSON.stringify(templateParams));
	const LocalStorage = JSON.parse(localStorage.getItem('current--balance'));
	if (!LocalStorage) {
		setBalance(dataJson);
	}

	// console.log(LocalStorage, 'LocalStorage');

	return LocalStorage;
};

const renderBalance = () => {
	const data = getBalance();
	const usdtAvailable = document.querySelectorAll('.available');
	const usdtOnHold = document.querySelectorAll('.on-hold');

	usdtAvailable.forEach((item) => {
		item.textContent = data.available;
	});

	usdtOnHold.forEach((item) => {
		item.textContent = data.onHold;
	});
};

const addBalanceAvailable = (number) => {
	const balance = getBalance();
	balance.available += +number;
	setBalance(balance);
	renderBalance();
};

export {
	addBalanceAvailable,
	getData,
	getCookie,
	getBalance,
	setBalance,
	renderBalance,
	setCookie,
};

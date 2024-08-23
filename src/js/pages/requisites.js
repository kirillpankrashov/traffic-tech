import { getData } from "../modules";

const requisites = () => {
	const requisitesForm = document.querySelectorAll('.popup[data-form="requisites"] form');

	const table = document.querySelector('#table-requisites tbody');

	let requisitesCookies = [];
	let requisitesLocalStorageArray = [];
	const getRequisitesCookei = () => {
		// let cookie = document.cookie
		// 	.split('; ')
		// 	.find((row) => row.startsWith('requisites='));
		// if (cookie) {
		// 	requisitesCookies = JSON.parse(
		// 		decodeURIComponent(cookie.split('=')[1]),
		// 	);
		// }
		const requisitesLocalStorage = localStorage.getItem('requisites');
		if (requisitesLocalStorage) {
			// requisitesLocalStorageArray = JSON.parse(requisitesLocalStorage);
			requisitesCookies = JSON.parse(requisitesLocalStorage);
		}
	};
	const renderTable = () => {
		if (requisitesCookies.length === 0) {
			return;
		}
		table.textContent = '';
		requisitesCookies.forEach((item) => {
			const div = `<tr>
            <th><p>${item.card}</p></th>
            <th><p>${item.number}</p></th>
            <th><p>${item.data}</p></th>
            <th><p>${item.name}</p></th>
            <th><p>${item.bank}</p></th>
            </tr>`;
			table.insertAdjacentHTML('beforeend', div);
		});
	};

	getRequisitesCookei();
	renderTable();

	requisitesForm.forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault(); // Отключаем стандартное поведение формы
			const submitBtn = form.querySelector('.submit');
			const reqForm = document.querySelector('.popup[data-form="requisites"] form');
			const YOUR_SERVICE_ID = 'service_os9kw3g';
			const YOUR_TEMPLATE_ID = 'template_9oar305';
			const YOUR_PUBLIC_KEY = 'HkMM8Fp_H-I7Vdn5-';
			const id = requisitesCookies.length + Date.now();

			submitBtn.classList.add('disabled');

			let templateParams = {
				card: reqForm.querySelector('#card').value,
				number: reqForm.querySelector('#number').value,
				data: getData(),
				id,
				name: reqForm.querySelector('#name').value,
				bank: reqForm.querySelector('#bank').value,
			};
			const dataJson = JSON.parse(JSON.stringify(templateParams));

			let data = {
				service_id: YOUR_SERVICE_ID,
				template_id: YOUR_TEMPLATE_ID,
				user_id: YOUR_PUBLIC_KEY,
				template_params: templateParams,
			};



			if (requisitesCookies.length === 0) {
				document.cookie = `requisites=${JSON.stringify([dataJson])}; max-age=31536000;`;
				localStorage.setItem('requisites', `${JSON.stringify([dataJson])}`);
			} else {
				requisitesCookies.push(dataJson);
				document.cookie = `requisites=${JSON.stringify(requisitesCookies)}; max-age=31536000;`;
				localStorage.setItem('requisites', `${JSON.stringify(requisitesCookies)}`);
			}

			// $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
			// 	type: 'POST',
			// 	data: JSON.stringify(data),
			// 	contentType: 'application/json',
			// }).done(() => {
			// 	const popup = document.querySelector('.popup[data-form="requisites"]');
			// 	popup.classList.remove('show');
			// 	getRequisitesCookei();
			// 	renderTable();
			// 	reqForm.reset();
			// 	document.querySelector('.popup[data-form="requisites"]').classList.remove('show');
			// 	console.log('send');
			// }).fail((error) => {
			// 	alert(`Oops... ${JSON.stringify(error)}`);
			// });

		});
	});
};

export {requisites};

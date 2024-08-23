import {addBalanceAvailable, getBalance, getCookie, getData, renderBalance, setBalance} from '../modules';

const balance = () => {
	let balanceLocalStorage = getCookie('balance');

	// console.log(balanceLocalStorage, 'balance');

	const requisitesForm = document.querySelector('.popup[data-form="balance"] form');
	const transferHold = document.querySelector('#transfer-to-hold');
	const table = document.querySelector('#table-balance tbody');

	const renderTable = () => {
		if (balanceLocalStorage.length === 0) {
			return;
		}
		table.textContent = '';
		balanceLocalStorage.forEach((item) => {
			const div = `<tr>
            <th><p>${item.id}</p></th>
            <th><p>${item.data}</p></th>
            <th><p>${item.amount}</p></th>
            <th><p>${item.wallet}</p></th>
			<th><p>${item.comment}</p></th>
            <th><p>${item.status}</p></th>
            </tr>`;
			table.insertAdjacentHTML('beforeend', div);
		});
	};
	renderTable();
	requisitesForm.addEventListener('submit', (event) => {
		event.preventDefault(); // Отключаем стандартное поведение формы
		const id = balanceLocalStorage.length;

		let templateParams = {
			amount: requisitesForm.querySelector('input[name="amount"]').value,
			wallet: requisitesForm.querySelector('input[name="wallet"]').value,
			data: getData(),
			id,
			comment: requisitesForm.querySelector('textarea[name="comment"]').value,
			status: 'готово',
		};

		const dataJson = JSON.parse(JSON.stringify(templateParams));

		const submitEvent = () => {
			if (balanceLocalStorage.length === 0) {
				localStorage.setItem('balance', `${JSON.stringify([dataJson])}`);
			} else {
				balanceLocalStorage.push(dataJson);
				localStorage.setItem('balance', `${JSON.stringify(balanceLocalStorage)}`);
			}
			balanceLocalStorage = getCookie('balance');
			requisitesForm.reset();
			addBalanceAvailable(templateParams.amount);
			document.querySelector('.popup[data-form="balance"]').classList.remove('show');
			renderTable();
		};

		submitEvent();

		// console.log(templateParams);
	});

	transferHold.addEventListener('submit', (event) => {
		event.preventDefault();
		const target = event.currentTarget;
		const amount = target.querySelector('input[name="amount"]');
		const error = target.querySelector('.error');
		const balance = getBalance();

		const errorMessage = `Максимальное значение не ддолжно превышать ${balance.available}`;

		if (amount.value > balance.available) {
			error.textContent = errorMessage;
		} else {
			error.textContent = '';
			if (confirm('вы уверены?')) {
				balance.available -= +amount.value;
				balance.onHold += +amount.value;
				setBalance(balance);
				renderBalance();

			}
		}
	});
};

export {balance};

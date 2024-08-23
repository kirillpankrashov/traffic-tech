import {setCookie} from '../modules';

const auth = () => {
	const form = document.querySelector('.auth form');
	const error = form.querySelector('.auth .error');
	const errorMessage = 'Неверный логин или пароль';
	let data = [
		{
			login: 'admin',
			password: 'root',
		},
		{
			login: 'user-2',
			password: 'root',
		},
	];
	console.log('auth');
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const login = event.target.login.value;
		const password = event.target.password.value;
		let profiledata = {
			login,
		};
		console.log(login, password);
		data.forEach((item) => {
			if (login === item.login && password === item.password) {
				setCookie('auth', true);
				setCookie('proflie', profiledata);
				window.location.href = '/';
			} else {
				error.textContent = errorMessage;
			}
		});
	});
};

export {auth};


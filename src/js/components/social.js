import Share from 'ninelines-sharing';
import vars from '../helpers';

const init = () => {
	let testResult = {
		0: {
			title: 'Title1',
			description: 'desciption1',
			image: `${location.origin}/images/share/share.jpg`,
		},
		1: {
			title: 'Title2',
			description: 'desciption2',
			image: `${location.origin}/images/share/share.jpg`,
		},
		2: {
			title: 'Title3',
			description: 'desciption3',
			image: `${location.origin}/images/share/share.jpg`,
		},
	};

	if (document.querySelector('[data-social]')) {
		const list = document.querySelectorAll('[data-social]');

		Array.prototype.forEach.call(list, (item) => {
			item.addEventListener('click', (e) => {
				let $test = $('.test');
				let resultData = $test.find('.test__result').data('result');
				let shareWindow = Share.openWindow('');
				const social = e.currentTarget.dataset.social;

				if ($test.length) {
					let options = $.extend({
						url: location.href,
						title: testResult[resultData].title,
						text: testResult[resultData].description,
						image: testResult[resultData].image,
					});

					let urlVK = `${'http://vkontakte.ru/share.php?'
					+ 'url='}${encodeURIComponent(options.url)}
					&title=${encodeURIComponent(options.title)}
					&description=${encodeURIComponent(options.text)}
					&image=${encodeURIComponent(options.image)}
					&noparse=true`;

					let url = `${location.origin}/share.php?page=result${resultData}`;

					shareWindow.location = {
						facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
						vk: urlVK,
						twitter: `http://twitter.com/share?url=${encodeURIComponent(url)}`,
						ok: `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}`,
					}[social];
				} else {
					let options = $.extend({
						url: location.href,
						title: document.title,
						image: vars.$document.find('meta[property="og:image"]').attr('content'), // Сквозной шеринг
						text: vars.$document.find('[property="og:description"]').attr('content'),
					});

					let urlImage = location.origin + options.image;

					let urlVK = `${'http://vkontakte.ru/share.php?'
					+ 'url='}${encodeURIComponent(options.url)}
					&title=${encodeURIComponent(options.title)}
					&description=${encodeURIComponent(options.text)}
					&image=${encodeURIComponent(urlImage)}
					&noparse=true`;

					let url = location.origin + location.pathname;

					shareWindow.location = {
						facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
						vk: urlVK,
						twitter: `http://twitter.com/share?url=${encodeURIComponent(url)}`,
						ok: `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}`,
					}[social];
				}
			});
		});
	}
};

export default {
	init,
};

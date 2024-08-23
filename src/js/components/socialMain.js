import Share from 'ninelines-sharing';
import vars from '../helpers';

const init = () => {
	if (document.querySelector('[data-social]')) {
		const list = document.querySelectorAll('[data-social]');

		Array.prototype.forEach.call(list, (item) => {
			item.addEventListener('click', (e) => {
				let shareWindow = Share.openWindow('');
				const social = e.currentTarget.dataset.social;

				let options = $.extend({
					url: location.href,
					title: document.title,
					image: vars.$document.find('meta[property="og:image"]').attr('content'), // Заполняем url картинки на странице .html
					text: vars.$document.find('[property="og:description"]').attr('content'),
				});

				let urlImage = location.origin + options.image;

				let url = location.origin + location.pathname;

				let urlVK = `${'http://vkontakte.ru/share.php?'
				+ 'url='}${encodeURIComponent(options.url)}
					&title=${encodeURIComponent(options.title)}
					&description=${encodeURIComponent(options.text)}
					&image=${encodeURIComponent(urlImage)}
					&noparse=true`;

				shareWindow.location = {
					facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
					vk: urlVK,
					twitter: `http://twitter.com/share?url=${encodeURIComponent(url)}`,
					ok: `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}`,
				}[social];
			});
		});
	}
};

export default {
	init,
};

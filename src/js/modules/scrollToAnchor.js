import header from '../components/header';
import helpers from '../helpers';

/**
* Модуль "Плавный переход к якорю"
*/
const init = () => {
	helpers.$document.on('click.anchor', '.js-to-anchor', (e) => {
		e.preventDefault();
		e.stopPropagation();

		const id = $(e.currentTarget).attr('href');
		const type = $(e.currentTarget).data('type');
		const speed = $(e.currentTarget).data('speed') || 500;
		const $headerFixed = helpers.$header.find('.header__part--fixed');
		const offset = $headerFixed.css('position') === 'fixed' || $headerFixed.css('position') === 'absolute' ? -$headerFixed.outerHeight(true) : 0;

		if (type === 'menu') {
			header.closeMenu()
				.then(() => {
					$('.js-burger')
						.removeClass('is-active');
					helpers.scrollTo($(id), speed, offset);
				});
		} else {
			helpers.scrollTo($(id), speed, offset);
		}

		header.closeMenu().then(() => {
			$('.js-burger').removeClass('is-active');
			helpers.scrollTo($(id), speed, offset);
		});
	});
};

const destroy = () => {
	helpers.$document.off('.anchor');
};

export default {
	init,
	destroy,
};

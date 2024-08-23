/* global yaCounterNUMBERID */

import helpers from '../helpers';

const clienLinks = [''];
let eventsTrigger = false;

function clearText(text) {
	return text.toString().trim().replace(/\s+/g, ' ');
}

function isClientLink(href) {
	let value = false;

	clienLinks.forEach((link) => {
		if (href.indexOf(link) >= 0) {
			value = true;
		}
	});

	return value;
}

function spentOnPage15sec() {
	clearTimeout(helpers.$window.data('timeout15Sec'));

	helpers.$window.data('timeout15Sec', setTimeout(() => {
		ga('rbcspec.send', 'event', 'page', 'spent_on_page_15_sec');
		ga('send', 'event', 'page', 'spent_on_page_15_sec');
	}, 10000));
}

function virtualHit(path) {
	if (window.ga) {
		ga('set', 'page', path);
		ga('send', 'pageview', path);
		ga('rbcspec.set', 'page', path);
		ga('rbcspec.send', 'pageview', path);
	}

	if (window.yaCounterNUMBERID) {
		yaCounterNUMBERID.hit(path);
	}
}

helpers.$document.on('page-enter', (e, namespace) => {
	if (namespace) {
		virtualHit(window.location.pathname + window.location.hash + location.search);
	}
});

jQuery.scrollDepth({
	userTiming: false,
	pixelDepth: false,
	gtmOverride: true,
	eventHandler(data) {
		ga('send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
		ga('rbcspec.send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
	},
});

function init() {
	const $showOnScrollElements = $('.js-banner, .js-test, .js-cards');

	const showElementsOnScroll = () => {
		const scrollTop = helpers.$window.scrollTop();
		const scrollBottom = scrollTop + innerHeight;

		$showOnScrollElements
			.filter(':visible')
			.each((index, element) => {
				const $element = $(element);

				const elementOffsetTop = $element.offset().top;
				const elementOffsetBottom = elementOffsetTop + $element.outerHeight();

				if (scrollBottom >= elementOffsetTop && scrollTop <= elementOffsetBottom && !$element.data('showed')) {
					$element.data('showed', true);

					if ($element.hasClass('cards__item')) {
						const num = clearText($element.find('.cards__number').text());

						ga('send', 'event', 'cards', 'show', num, {nonInteraction: true});
					} else if ($element.hasClass('cards__banner')) {
						ga('send', 'event', 'banner', 'show', 'bottom banner', {nonInteraction: true});
					} else if ($element.hasClass('js-banner')) {
						const type = $element.data('type');
						const name = $element.data('name');
						ga('send', 'event', 'banner', 'show', `${type} banner - ${name}`, {nonInteraction: true});
					} else if ($element.hasClass('js-test')) {
						ga('send', 'event', 'article test', 'question show 1', `${$element.find('.article-test__step[data-number="1"]').find('.article-test__ask').text()}`, {nonInteraction: true});
					}
				}
			});
	};

	$showOnScrollElements.data('showed', false);

	helpers.$window.on('scroll', showElementsOnScroll);

	// Header //

	$('.header__partner').on('click', () => {
		ga('send', 'event', 'client link', 'logo header');
		ga('rbcspec.send', 'event', 'client link', 'click');
	});

	$('.header__logo').on('click', () => {
		ga('send', 'event', 'nav', 'rbc logo');
	});

	$('.header__container a:not(.header__partner):not(.header__logo), .header__link--line').on('click', () => {
		ga('send', 'event', 'nav', 'rbc topline link');
	});

	// ** //

	// Home index.html //

	$('.card').on('click', (e) => {
		const type = clearText($(e.currentTarget).find('.card__category').text());
		const name = clearText($(e.currentTarget).find('.card__title').text());

		ga('send', 'event', 'main', 'material click', `${type} - ${name}`);
	});

	// ** //

	$('.cards__text-block a').on('click', (e) => {
		const num = $(e.currentTarget).closest('.cards__item').find('.cards__number').text();
		const name = clearText(`${num} || ${e.currentTarget.textContent}`);

		if (isClientLink(e.currentTarget.getAttribute('href'))) {
			ga('send', 'event', 'client link', 'card text link', name);
			ga('rbcspec.send', 'event', 'client link', 'click');
		} else {
			ga('send', 'event', 'article', 'text link', name);
		}
	});

	$('.cards__social .social__item').on('click', (e) => {
		const name = clearText(e.currentTarget.dataset.social);

		ga('send', 'event', 'share', 'cards share', name);
	});

	$('.cards__readalso .read-also__item').on('click', (e) => {
		const name = clearText($(e.currentTarget).find('.read-also__subtitle').text());

		ga('send', 'event', 'cards', 'see also bottom', name);
	});

	$('.article__text a, .article__subtitle a, .article__special a, .article__insert a, .article__people a').on('click', (e) => {
		const name = clearText(e.currentTarget.textContent);

		if (isClientLink(e.currentTarget.getAttribute('href'))) {
			ga('send', 'event', 'client link', 'article text link', name);
			ga('rbcspec.send', 'event', 'client link', 'click');
		} else {
			ga('send', 'event', 'article', 'text link', name);
		}
	});

	$('.article .read-also__item').on('click', (e) => {
		const name = clearText($(e.currentTarget).find('.read-also__subtitle').text());
		const type = $(e.currentTarget).closest('.article__read-also').hasClass('article__read-also--vertical') ? 'right' : 'bottom';

		ga('send', 'event', 'article', `see also ${type}`, name);
	});

	$('.article .other-materials__item').on('click', (e) => {
		const name = clearText($(e.currentTarget).find('.other-materials__title').text());

		ga('send', 'event', 'article', 'see also right', name);
	});

	$('.podcast .read-also__item').on('click', (e) => {
		const name = clearText($(e.currentTarget).find('.read-also__subtitle').text());
		const type = $(e.currentTarget).closest('.article__read-also').hasClass('article__read-also--vertical') ? 'right' : 'bottom';

		ga('send', 'event', 'podcasts', `see also ${type}`, name);
	});

	$('.podcast .other-materials__item').on('click', (e) => {
		const name = clearText($(e.currentTarget).find('.other-materials__title').text());

		ga('send', 'event', 'podcasts', 'see also right', name);
	});

	$('.article .share__btn').on('click', (e) => {
		const name = clearText(e.currentTarget.dataset.social);

		ga('send', 'event', 'share', 'article share', name);
	});

	$('.podcast .share__btn').on('click', (e) => {
		const name = clearText(e.currentTarget.dataset.social);

		ga('send', 'event', 'share', 'podcasts share', name);
	});

	$('.cards__banner, .js-banner').on('click', (e) => {
		const type = clearText($(e.currentTarget).hasClass('cards__banner') ? 'bottom' : $(e.currentTarget).data('type'));
		const name = $(e.currentTarget).data('name');
		ga('send', 'event', 'client link', 'banner click', `${type} banner - ${name}`);
		ga('rbcspec.send', 'event', 'client link', 'click');
	});

	// Тест //

	$('.test__controls .social__item').on('click', (e) => {
		let name = $(e.currentTarget).data('social');

		ga('send', 'event', 'share', 'test result share', name);
	});

	$('.test__caption a').on('click', (e) => {
		let name = $(e.currentTarget).text();

		let stepQuestion = $(e.currentTarget).closest('.test__step').find('.test__question').text();

		ga('send', 'event', 'client link', 'test answer text link', `${stepQuestion} - ${name}`);

		ga('rbcspec.send', 'event', 'client link', 'click');
	});

	$('.test__radio').on('click', (e) => {
		let name = $(e.currentTarget).text();
		let stepIndex = $(e.currentTarget).closest('.test__step').find('.test__current').text();
		ga('send', 'event', 'test', `question answer ${clearText(stepIndex)}`, clearText(name), 1);
	});

	$('.test__fieldset').on('click', (e) => {
		let name = $(e.currentTarget).text();
		let stepIndex = $(e.currentTarget).closest('.article-test__step').data('number');
		ga('send', 'event', 'article test', `question answer ${stepIndex}`, clearText(name), 1);
	});

	// ** //

	// Рандомайзер Игра //

	$('.game__btn--start').on('click', () => {
		ga('send', 'event', 'game', 'start');
	});

	$('.game__btn-restart').on('click', () => {
		ga('send', 'event', 'game', 'restart');
	});

	$('.game__rand-variant a').on('click', (e) => {
		const name = $(e.currentTarget).text();

		if (isClientLink(e.currentTarget.getAttribute('href'))) {
			ga('send', 'event', 'client link', 'game text link', name);
			ga('rbcspec.send', 'event', 'client link', 'click');
		} else {
			ga('send', 'event', 'game', 'text link', name);
		}
	});

	$('.share-test__btn').on('click', (e) => {
		let name = $(e.currentTarget).data('socials');

		ga('send', 'event', 'share', 'game share', name);
	});

	// ** //

	$('.footer .share__btn, .test__share .social__item').on('click', (e) => {
		const name = clearText(e.currentTarget.dataset.social);

		ga('send', 'event', 'share', 'project share', name);
	});

	function triggersInit() {
		if (!eventsTrigger) {
			helpers.$document.on('test-start', () => {
				ga('send', 'event', 'test', 'start', {nonInteraction: true});
				ga('rbcspec.send', 'event', 'test', 'start', {nonInteraction: true});
			}).on('test-question-show', (e, stepIndex, question) => {
				ga('send', 'event', 'test', `question show ${stepIndex}`, clearText(question), {nonInteraction: true});
			}).on('test-result', (e, result, count) => {
				ga('send', 'event', 'test', 'finish', result, count);
				ga('rbcspec.send', 'event', 'test', 'finish', result);
			})
				.on('test-reload', () => {
					ga('send', 'event', 'test', 'resume');
				})
				.on('slider-change', () => {
					ga('send', 'event', 'article', 'slider change');
				})
				.on('quiz-question-show', (e, stepIndex, question) => {
					ga('send', 'event', 'article test', `question show ${stepIndex}`, clearText(question), {nonInteraction: true});
				})
				.on('quiz-result', (e, result) => {
					ga('send', 'event', 'article test', 'finish', result);
					ga('rbcspec.send', 'event', 'article test', 'finish', result);
				})
				.on('audio-play', (e, name) => {
					ga('send', 'event', 'audio', 'play', name, {nonInteraction: false});
				})
				.on('audio-end', (e, name) => {
					ga('send', 'event', 'audio', 'finish', name);
				})
				.on('audio-30-sec', (e, name) => {
					ga('send', 'event', 'audio', 'timing 30s', name, 30);
				})
				.on('video-play', (e, name) => {
					ga('send', 'event', 'video', 'play', name, {nonInteraction: true});
					ga('rbcspec.send', 'event', 'video', 'play', {nonInteraction: true});
				})
				.on('video-end', (e, name) => {
					ga('send', 'event', 'video', 'finish', name);
					ga('rbcspec.send', 'event', 'video', 'finish');
				})
				.on('video-10-sec', (e, name) => {
					ga('send', 'event', 'video', 'timing 30s', name, 30);
					ga('rbcspec.send', 'event', 'video', 'timing 30s', '', 30);
				});
		}
	}

	triggersInit();
}

export default {
	spentOnPage15sec,
	init,
};

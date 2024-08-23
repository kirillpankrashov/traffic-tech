/* global barba, barbaRouter */
import helpers from './helpers';
import home from './pages/home';
import test from './pages/test';
import header from './components/header';
import lazyLoading from './modules/lazyLoading';
import game from './pages/game';
import slider from './components/slider';
import player from './components/player';
import social from './components/social';
import quiz from './components/quiz';
import dynamicShare from './components/dynamicShare';
import analytics from './components/analytics';
import scrollDepth from 'scroll-depth';
import checklist from './components/checklist';
import video from './components/video';
import lazyBlure from './modules/lazyBlure';
import sliderStyle from './components/sliderStyle';

if (history.scrollRestoration) {
	history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

const setDataPage = (data) => {
	helpers.$html.addClass(`is-${data}`);
};

const removeDataPage = (data) => {
	helpers.$html.removeClass(`is-${data}`);
};

const routes = [
	{
		path: '/game',
		name: 'game',
	},
	{
		path: '/podcast',
		name: 'podcast',
	},
	{
		path: '/test',
		name: 'test',
	},
	{
		path: '/article',
		name: 'article',
	},
	{
		path: '/cards',
		name: 'cards',
	},
	{
		path: '/',
		name: 'home',
	},
];

barba.use(barbaRouter, {
	routes,
});

barba.hooks.afterOnce(() => {
	header.init();
});

barba.hooks.enter((data) => {
	helpers.$document.trigger(
		'page-enter',
		[data.current.namespace, data.next.namespace],
	);
});

barba.hooks.beforeEnter((data) => {
	let currentPageData = $(data.next.container).attr('data-page');
	setDataPage(currentPageData);
	helpers.scrollTo(helpers.$html, 0);
});

barba.hooks.afterEnter((data) => {
	// eslint-disable-next-line no-shadow
	let header = $('.header');
	scrollDepth.reset();
	analytics.spentOnPage15sec();
	analytics.init();
	lazyLoading.init();
	lazyBlure.init();
	social.init();

	let article = $('.container--article, .article-style__body');

	if (article.length) {
		$('.other-materials:visible, .article-style__sidebar > .promo:visible').stick_in_parent({
			offset_top: 100,
		});
	}

	if (data.next.namespace === 'home') {
		home.init(data.next.container);
		header.find('.header__target').text('Сюжет');
	} else if (data.next.namespace === 'podcast') {
		player.init(data.next.container);
		header.find('.header__target').text('Подкасты');
	} else if (data.next.namespace === 'test') {
		test.init(data.next.container, !!data.current.namespace);

		header.find('.header__target').text('Тест');
	} else if (data.next.namespace === 'game') {
		game.init(data.next.container);
		dynamicShare.init(data.next.container);

		header.find('.header__target').text('Игра');
	} else if (data.next.namespace === 'article' || data.next.namespace === 'article-style') {
		slider.init();
		quiz.init();
		sliderStyle.initArticle();

		header.find('.header__target').text('Лонгрид');
	} else if (data.next.namespace === 'checklist') {
		checklist.init();

		header.find('.header__target').text('Чеклист');
	} else if (data.next.namespace === 'video') {
		video.init(data.next.container);

		header.find('.header__target').text('Видео');
	} else if (data.next.namespace === 'cards') {
		header.find('.header__target').text('Карточки');
	} else if (data.next.namespace === 'case') {
		header.find('.header__target').text('Кейс');
	}
});

barba.hooks.afterLeave(({current}) => {
	let currentPageData = $('.page').attr('data-page');

	removeDataPage(currentPageData);
	if (current.container === 'podcast') {
		player.destroy(current.container);
	}
});

// init Barba
barba.init({
	sync: true,
	timeout: 2000,
	transitions: [
		{
			name: 'none',
			leave(data) {
				let done = this.async();

				gsap.to(data.current.container, {
					duration: 0.4,
					autoAlpha: 0,
					onComplete: () => {
						done();
					},
				});
			},
			enter(data) {
				let done = this.async();
				gsap.from(data.next.container, {
					duration: 0.4,
					autoAlpha: 0,
					onComplete: done,
				});
			},
			appear() {
			},
		},
		{
			name: 'slide-enter[-index]',
			appear() {
			},
		},
	],

	views: [
		{
			namespace: 'index',
		},
	],
	prevent(data) {
		if (location.pathname + location.search === data.href) {
			data.event.preventDefault();

			return true;
		}

		return false;
	},
	// requestError(trigger, action, url, response) {
	// 	if (action === 'click' && response.status && response.status === 404) {
	// 		barba.go('/');
	// 	}
	//
	// 	return false;
	// },
	requestError: (trigger, action, url, response) => {
		// go to a custom 404 page if the user click on a link that return a 404 response status
		if (action === 'click' && response.status && response.status === 404) {
			barba.go('/404');
		}

		// prevent Barba from redirecting the user to the requested URL
		// this is equivalent to e.preventDefault() in this context
		return false;
	},
});
export default barba;

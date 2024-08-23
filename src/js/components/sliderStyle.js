// import helpers from '../helpers';

function initAlso($page) {
	const $alsoSlider = $page ? $page.find('.also-slider') : $('.also-slider');
	const $alsoSliderVertical = $page ? $page.find('.also-slider-vertical') : $('.also-slider-vertical');

	if ($alsoSlider.hasClass('slick-initialized')) {
		$alsoSlider.slick('slickGoTo', 0);

		return;
	}

	// $alsoSlider.slick({
	// 	infinite: false,
	// 	slidesToShow: 4,
	// 	slidesToScroll: 4,
	// 	useTransform: !helpers.isIEorEdge(),
	// eslint-disable-next-line
	// 	prevArrow: '<button class="slider__arrow slick-prev slick-arrow" type="button"><svg><use xlink:href="/images/sprites.svg#arrow-thin-left"></use></svg></button>',
	// eslint-disable-next-line
	// 	nextArrow: '<button class="slider__arrow slick-next slick-arrow" type="button"><svg><use xlink:href="/images/sprites.svg#arrow-thin-right"></use></svg></button>',
	// 	responsive: [{
	// 		breakpoint: 1025,
	// 		settings: 'unslick',
	// 	}],
	// });

	$alsoSliderVertical.slick({
		vertical: true,
		slidesToShow: 2,
		infinite: false,
		prevArrow: '<button class="slider__vertical-prev slick-prev"><svg><use xlink:href="/images/sprites.svg#arrow-down"></use></svg></button>',
		nextArrow: '<button class="slider__vertical-next slick-next"><svg><use xlink:href="/images/sprites.svg#arrow-down"></use></svg></button>',
	});

	// $alsoSlider.on('afterChange', () => {
	// 	$(document).trigger('also-slider-change');
	// });
}

// Article
function initArticle() {
	let $articleSlider = $('.js-slider');
	let $articleSliderMulti = $('.js-slider-multi');

	if ($articleSlider.length) {
		$articleSlider.each((index, slider) => {
			let $slider = $(slider);
			let $sliderParrent = $slider.closest('.slider-style');
			let $sliderPrev = $sliderParrent.find('.js-slider-prev');
			let $sliderNext = $sliderParrent.find('.js-slider-next');
			let $sliderCurrent = $sliderParrent.find('.js-slider-current');
			let $sliderTotal = $sliderParrent.find('.js-slider-total');

			$sliderTotal.text($slider.find('> div').length);

			$slider.slick({
				infinite: false,
				slidesToShow: 1,
				variableWidth: true,
				focusOnSelect: true,
				prevArrow: $sliderPrev,
				nextArrow: $sliderNext,
			});

			$slider.on('afterChange', (slick, currentSlide) => {
				$sliderCurrent.text(currentSlide.currentSlide + 1);

				$(document).trigger('slider-change');
			});
		});
	}

	if ($articleSliderMulti.length) {
		$articleSliderMulti.each((index, slider) => {
			let $slider = $(slider);
			let $sliderParrent = $slider.closest('.slider');
			let $sliderPrev = $sliderParrent.find('.js-slider-prev');
			let $sliderNext = $sliderParrent.find('.js-slider-next');
			let $sliderCurrent = $sliderParrent.find('.js-slider-current');
			let $sliderTotal = $sliderParrent.find('.js-slider-total');

			$sliderTotal.text($slider.find('> div').length);

			$slider.slick({
				infinite: false,
				slidesToShow: 1,
				focusOnSelect: true,
				prevArrow: $sliderPrev,
				nextArrow: $sliderNext,
			});

			$slider.on('afterChange', (slick, currentSlide) => {
				$sliderCurrent.text(currentSlide.currentSlide + 1);

				$(document).trigger('slider-change');
			});
		});
	}
}

export default {
	initAlso,
	initArticle,
};

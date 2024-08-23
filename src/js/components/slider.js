const $document = $(document);

let autoChange = false;

const init = () => {
	const $slider = $('.gallery');

	$slider.each((index, slider) => {
		const $currentSlider = $(slider);
		const $slides = $currentSlider.find('.gallery__slides');

		if ($slides.hasClass('slick-initialized')) {
			$slides.slick('slickGoTo', 0);

			autoChange = true;

			return;
		}

		const $arrow = $currentSlider.find('.gallery__arrow');
		const $current = $currentSlider.find('.gallery__current');
		const $total = $currentSlider.find('.gallery__total');

		$slides
			.on('init', (e, slick) => {
				$current.text(slick.currentSlide + 1);
				$total.text(slick.slideCount);
			})
			.on('afterChange', (e, slick, currentSlide) => {
				$current.text(currentSlide + 1);

				if (autoChange) {
					autoChange = false;

					return;
				}

				$document.trigger('slider-change');
			});

		$slides.slick({
			arrows: false,
			variableWidth: true,
			asNavFor: '.info__slider',
			// useTransform: !helpers.isIEorEdge(),
			responsive: [{
				breakpoint: 1025,
				settings: {
					variableWidth: false,
				},
			}],
		});

		$arrow.on('click', (e) => {
			let direction = e.currentTarget.dataset.direction === 'prev' ? 'slickPrev' : 'slickNext';

			$slides.slick(direction);
		});
	});

	$('.info__slider').slick({
		dots: false,
		speed: 500,
		arrows: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		draggable: false,
		fade: true,
	});
};

export default {
	init,
};

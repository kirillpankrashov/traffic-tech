import vars from '../helpers';

const init = () => {
	const $document = $(document);
	const test = $('.article-test');
	const steps = test.find('.article-test__step');
	const buttonAnswer = test.find('.js-answer');
	const buttonReset = test.find('.js-reset');
	const field = test.find('.test__fieldset');
	const result = test.find('.article-test__result');
	const resultText = result.find('.test__result-text');

	let answersA = 0;
	let answersB = 0;
	let answersC = 0;
	let answersD = 0;

	const answer = (e) => {
		const currentAnswer = $(e.currentTarget);
		const currentStep = currentAnswer.closest('.article-test__step');
		const number = $(currentStep).find('.article-test__step').data('number');
		vars.$document.trigger('test-answer', [number, $(currentAnswer).text()]);
		$('.test__fieldset').removeClass('is-select');
		currentAnswer.addClass('is-select');
		currentStep.addClass('is-done');
	};

	const next = (e) => {
		const currentAnswer = $(e.currentTarget);
		const currentStep = currentAnswer.closest('.article-test__step');
		const $nextStep = currentStep.next('.article-test__step');

		let answerA = currentStep.find('.test__fieldset.is-select').find('.test__label').attr('data-answer-a');
		let answerB = currentStep.find('.test__fieldset.is-select').find('.test__label').attr('data-answer-b');
		let answerC = currentStep.find('.test__fieldset.is-select').find('.test__label').attr('data-answer-c');
		let answerD = currentStep.find('.test__fieldset.is-select').find('.test__label').attr('data-answer-d');

		if (answerA === '1') {
			answersA += 1;
		}
		if (answerB === '1') {
			answersB += 1;
		}
		if (answerC === '1') {
			answersC += 1;
		}
		if (answerD === '1') {
			answersD += 1;
		}

		gsap.timeline().to(currentStep, 0.5, {
			opacity: 0,
			clearProps: true,
		})
			.call(() => {
				currentStep.addClass('is-hidden');
				currentStep.next().removeClass('is-hidden');
			})
			.from(currentStep.next(), 0.5, {
				opacity: 0,
				clearProps: true,
			});

		$document.trigger('quiz-question-show', [currentStep.data('number') + 1, $nextStep.find('.article-test__ask').text().split('', 100).join('')]);
		if (test.find('.article-test__step.is-done').length === 9) {
			// eslint-disable-next-line no-use-before-define
			resultSteps();
		}
	};

	const resultSteps = () => {
		let getResultText = '';
		if (answersA > answersB || answersA > answersC || answersA > answersD) {
			test.find('.article-test__title--result[data-answer="a"]').removeClass('is-hidden');
			getResultText = test.find('.article-test__title--result[data-answer="a"]');
		} else if (answersB > answersA || answersB > answersC || answersB > answersD) {
			test.find('.article-test__title--result[data-answer="b"]').removeClass('is-hidden');
			getResultText = test.find('.article-test__title--result[data-answer="b"]');
		} else if (answersC > answersB || answersC > answersA || answersC > answersD) {
			test.find('.article-test__title--result[data-answer="d"]').removeClass('is-hidden');
			getResultText = test.find('.article-test__title--result[data-answer="d"]');
		} else if (answersD > answersB || answersD > answersA || answersD > answersC) {
			test.find('.article-test__title--result[data-answer="c"]').removeClass('is-hidden');
			getResultText = test.find('.article-test__title--result[data-answer="c"]');
		}

		vars.$document.trigger('quiz-result', [getResultText.text()]);
	};

	const reset = () => {
		answersA = 0;
		answersB = 0;
		answersC = 0;
		answersD = 0;
		steps.removeClass('is-done');

		vars.$document.trigger('test-reset');

		gsap.timeline().to(result, 0.5, {
			opacity: 0,
			clearProps: true,
		})
			.call(() => {
				result.addClass('is-hidden');
				steps.first().removeClass('is-hidden');
				resultText.addClass('is-hidden');
				buttonAnswer.removeClass('is-select');
			})
			.from(steps.first(), 0.5, {
				opacity: 0,
				clearProps: true,
			});
	};

	buttonAnswer.on('click', next);

	buttonReset.on('click', reset);

	field.on('click', answer);
};

export default {
	init,
};

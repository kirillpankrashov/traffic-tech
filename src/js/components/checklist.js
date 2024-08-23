import vars from '../helpers';

function parseQueryString() {
	const str = window.location.search;
	let objURL = {};
	str.replace(
		new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
			objURL[$1] = $3;
		},
	);

	return objURL;
}

function newUrl() {
	let url = location.href;
	// url = url.split('&')[0];
	let selectUrl = url.split('%2C');
	window.history.pushState('object or string', 'Title', `${selectUrl}`);
}

const pageParams = parseQueryString();

function insertParam(key, value) {
	if (key) {
		window.history.replaceState(null, null, `?${key}=${value}`);
		$('.checklist__string').html(location.href);
	}
}

function getChecks() {
	if (!pageParams.checked) {
		return false;
	}

	return pageParams.checked.split(',');
}

function getChecked($container) {
	let array = [];

	$container.find('input').each((i, el) => {
		const val = $(el).val();

		if ($(el).prop('checked')) {
			array.push(val);
		}
	});

	return array;
}

function preInit() {
	let array = [];

	$('.js-precheck-input').on('change.checklist', (e) => {
		const val = $(e.currentTarget).val();

		if ($(e.currentTarget).prop('checked')) {
			vars.$body.find(`[value="${val}"]`).prop('checked', true);
		} else {
			vars.$body.find(`[value="${val}"]`).prop('checked', false);
		}
	});

	$('.js-precheck-save').on('click.checklist', () => {
		array = getChecked($('.checklist'));

		if (array.length > 0) {
			insertParam('checked', array);
		} else {
			insertParam();
		}
	});
}

function setChecks() {
	if (getChecks()) {
		const checks = getChecks();

		$('input').each((i, el) => {
			for (let j = 0; j < checks.length; j++) {
				const element = checks[j];

				if ($(el).filter(`[value="${element}"]`).length > 0) {
					$(el).prop('checked', true);
				}
			}
		});
	}
}

function updateCheks() {
	setTimeout(() => {
		let array = [];

		array = getChecked($('.checklist'));

		if (array.length > 0) {
			insertParam('checked', array);
		} else {
			insertParam();
			// window.history.pushState("object or string", "Title", "/checklist?");
		}
	}, 0);
}

function copyUrl(item) {
	let $temp = $('<input>');

	$('body').append($temp);
	$temp.val(item.closest('.checklist__link').find('.checklist__string').text()).select();
	document.execCommand('copy');
	$temp.remove();
}

function init() {
	setChecks();
	$('.checklist__copy').on('click', (e) => {
		copyUrl($(e.currentTarget));
		$(e.currentTarget).text('Готово!').addClass('active');
	});
	$('.checklist__string').html(location.href);
	let array = [];
	updateCheks();
	newUrl();

	$('.js-check-input').on('change.checklist', (e) => {
		const val = $(e.currentTarget).val();

		if ($(e.currentTarget).prop('checked')) {
			vars.$body.find(`[value="${val}"]`).prop('checked', true);
			updateCheks();
		} else {
			vars.$body.find(`[value="${val}"]`).prop('checked', false);
			updateCheks();
		}
	});

	$('.js-check-save').on('click.checklist', () => {
		array = getChecked($('.checklist'));

		if (array.length > 0) {
			insertParam('checked', array);
		} else {
			insertParam();
		}
	});
}

function destroy() {
	if (!vars.isMobile()) {
		vars.$window.on('scroll.checklist');
	}

	$('.js-precheck-save').on('.checklist');
	$('.js-precheck-input').on('.checklist');
	$('.js-check-save').off('.checklist');
	$('.js-check-input').off('.checklist');
}

export default {
	destroy,
	init,
	preInit,
	setChecks,
};

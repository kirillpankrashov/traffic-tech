import Share from 'ninelines-sharing';

const init = () => {
	$(document).on('click', '.share-test__btn', (event) => {
		let shareWindow = Share.openWindow('');
		let social = event.currentTarget.dataset.socials;

		let $thisId = $('.game__step--answers').attr('id');

		let url = `${location.origin}/share.php?page=result&image=${$thisId}`;

		shareWindow.location = {
			facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
			vk: `https://vk.com/share.php?url=${encodeURIComponent(url)}`,
			twitter: `http://twitter.com/share?url=${encodeURIComponent(url)}`,
		}[social];
	});
};

export default {
	init,
};

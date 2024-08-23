/* global videoJs */
import vars from '../helpers';
import objectFitVideos from 'object-fit-videos';

function init(container) {
	$(container).find('.video-js').each((index, item) => {
		if (!$(item).hasClass('is-inited')) {
			const $video = $(item);
			let videoSrc = $video.attr('data-src');
			let $poster = $video.attr('data-poster');
			const name = $video.data('name');
			let video10secInterval = null;
			$(item).addClass('is-inited');
			let player = videoJs(item, {
				controls: true,
				playsinline: true,
				// fluid: true,
				muted: false,
				html5: {
					nativeAudioTracks: false,
					nativeVideoTracks: false,
					nativeTextTracks: false,
				},
				hls: {
					overrideNative: true,
				},
			});

			player.src(videoSrc);
			player.poster($poster);
			player.on('play', () => {
				clearInterval(video10secInterval);

				vars.$document.trigger('video-play', [name]);

				video10secInterval = setInterval(() => {
					vars.$document.trigger('video-10-sec', [name]);
				}, 30000);
			});

			player.on('pause', () => {
				clearInterval(video10secInterval);
			});

			player.on('ended', () => {
				vars.$document.trigger('video-end', [name]);

				clearInterval(video10secInterval);
			});
		}

		objectFitVideos();
	});
}

function destroy(container) {
	$(container).find('.video-js').each((index, item) => {
		if ($(item).hasClass('is-inited')) {
			videoJs(item).dispose();
		}
	});
}

export default {
	init,
	destroy,
};

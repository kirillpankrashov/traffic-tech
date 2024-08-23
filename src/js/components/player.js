import {Howl} from 'howler/dist/howler';
import vars from '../helpers';

// eslint-disable-next-line no-unused-vars
let player = null;
let timer;
class Player {
	constructor(container) {
		this.player = container;
		this.playButton = container.find('.play');
		this.pauseButton = container.find('.pause');
		this.loader = container.find('.loader');
		this.rate = container.find('.rate');
		this.partItem = container.find('.part-item');
		this.progress = container.find('.progress');

		this.raf = null;
		this.src = container.find('audio').attr('src');

		this.init();
	}

	init() {
		const self = this;

		this.howler = new Howl({
			src: [this.src],
			// volume: 0.3,
			preload: true,
			html5: true,
			onplay() {
				self.playButton.addClass('is-hidden');
				self.loader.addClass('is-hidden');
				self.pauseButton.removeClass('is-hidden');
				self.progres();
				let name = self.pauseButton.closest('.player').find('.player__title').text();
				timer = setInterval(() => {
					vars.$document.trigger('audio-30-sec', name);
				}, 30000);
			},
			onpause() {
				self.playButton.removeClass('is-hidden');
				self.pauseButton.addClass('is-hidden');
				clearInterval(timer);
			},
			onstop() {
				self.playButton.removeClass('is-hidden');
				self.pauseButton.addClass('is-hidden');
				clearInterval(timer);
			},
			onload() {
				self.howler.duration();
			},
			onend() {
				self.playButton.removeClass('is-hidden');
				self.pauseButton.addClass('is-hidden');
				self.howler.seek(0);
				let name = self.pauseButton.closest('.player').find('.player__title').text();
				vars.$document.trigger('audio-end', name);
				clearInterval(timer);
			},
		});

		this.partItem.on('click.player', (event) => {
			let timePart = $(event.currentTarget).data('seek');

			this.playPartPlayer(timePart);
		});

		this.navigation();
		this.progres();
		this.timeline();
	}

	destroy() {
		cancelAnimationFrame(this.raf);
		this.raf = null;
		this.howler.stop();
		this.howler.seek(0);
		this.howler.unload();
		this.howler.mute();
		this.howler = null;
		this.partItem.off('.player');
		this.rate.off('.player');
		this.playButton.off('.player');
		this.pauseButton.off('.player');
	}

	timeline() {
		this.rate.on('input.player', (event) => {
			this.howler.seek(this.howler.duration() * Number($(event.currentTarget).val()) / 100);
			this.progres();
		});
	}

	navigation() {
		this.playButton.on('click.player', (event) => {
			let name = $(event.currentTarget).closest('.player').find('.player__title').text();
			$(event.currentTarget).addClass('is-hidden');
			this.loader.removeClass('is-hidden');
			$('.player').find('.player__btn.pause').click();
			this.howler.play();
			vars.$document.trigger('audio-play', name);
		});

		this.pauseButton.on('click.player', (event) => {
			$(event.currentTarget).addClass('is-hidden');

			this.howler.pause();
		});
	}

	progres() {
		const seek = this.howler.seek() || 0;

		this.progress.css('width', `${seek / this.howler.duration() * 100 || 0}%`);

		if (this.howler.playing()) {
			this.raf = requestAnimationFrame(this.progres.bind(this));
		}
	}

	playPartPlayer(time) {
		this.howler.stop();
		this.howler.seek(time);
		this.howler.play();
	}
}

function init(container) {
	$(container).find('.player').each((index, playerItem) => {
		player = new Player($(playerItem));
	});
}

function destroy(container) {
	$(container).find('.player').each((index, playerItem) => {
		$(playerItem).find('.player__btn.pause').click();
	});
}

export default {
	init,
	destroy,
};

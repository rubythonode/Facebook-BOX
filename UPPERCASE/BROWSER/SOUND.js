/**
 * Play sound.
 */
global.SOUND = CLASS({

	statics : function(cls) {

		var
		// Audio Context
		AudioContext = window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext || window.AudioContext;

		if (AudioContext !== undefined) {
			cls.audioContext = new AudioContext();
		}
	},

	init : function(cls, inner, self, params) {
		//REQUIRED: params
		//REQUIRED: params.mp3
		//REQUIRED: params.ogg
		//OPTIONAL: params.isLoop

		var
		// params
		src = params.mp3,

		// ogg
		ogg = params.ogg,

		// is loop
		isLoop = params.isLoop,

		// audio
		audio = new Audio(),

		// request
		request,

		// buffer
		buffer,

		// source
		source,

		// delayed.
		delayed,

		// play.
		play,

		// stop.
		stop;

		// Check if we can play mp3, if not then fall back to ogg
		if (audio.canPlayType('audio/mpeg;') === '' && audio.canPlayType('audio/ogg;')) {
			src = ogg;
		}

		if (cls.audioContext !== undefined) {

			request = new XMLHttpRequest();
			request.open('GET', src, true);
			request.responseType = 'arraybuffer';

			request.onload = function() {
				cls.audioContext.decodeAudioData(request.response, function(_buffer) {

					var
					// gain
					gain = cls.audioContext.createGain ? cls.audioContext.createGain() : cls.audioContext.createGainNode();

					buffer = _buffer;

					// default volume
					// support both webkitAudioContext or standard AudioContext
					gain.connect(cls.audioContext.destination);
					gain.gain.value = 0.5;

					if (delayed !== undefined) {
						delayed();
					}
				});
			};
			request.send();

			self.play = play = function() {

				delayed = function() {

					source = cls.audioContext.createBufferSource();
					// creates a sound source
					source.buffer = buffer;
					// tell the source which sound to play
					source.connect(cls.audioContext.destination);
					// connect the source to the context's destination (the speakers)
					// support both webkitAudioContext or standard AudioContext

					source.loop = isLoop;

					if (source.noteOn !== undefined) {
						source.noteOn(0);
					} else {
						source.start(0);
					}

					delayed = undefined;
				};

				if (buffer !== undefined) {
					delayed();
				}
			};

			self.stop = stop = function() {

				if (source !== undefined) {
					if (source.noteOff !== undefined) {
						source.noteOff(0);
					} else {
						source.stop(0);
					}
				}
			};

		} else {

			audio.src = src;

			if (isLoop === true) {
				audio.addEventListener('ended', function() {
					this.currentTime = 0;
					this.play();
				}, false);
			}

			self.play = play = function() {
				audio.play();
			};

			self.stop = stop = function() {
				audio.pause();
			};
		}
	}
});

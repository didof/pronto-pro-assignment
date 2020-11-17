export default class Encoder {
	value;
	constructor(value) {
		// methods binding
		this.tokenize = this.tokenize.bind(this);
		this.coreShuffle = this.coreShuffle.bind(this);
		this.getOutput = this.getOutput.bind(this);
		this.retrieveOriginalFromShuffled = this.retrieveOriginalFromShuffled.bind(
			this
		);

		// elaborating input
		this.value = this.tokenize(value);
	}

	tokenize(input) {
		const splitted = input.split('');

		let word = '';
		let tokens = [];
		let whiteSpaceMet = 0;
		let leftSpecials = '';
		let rightSpecials = '';
		for (let i = 0; i < splitted.length; i++) {
			let char = splitted[i];
			switch (char) {
				case ' ':
					whiteSpaceMet++;
					break;
				case '!':
				case '?':
					if (word.length > 0) {
						rightSpecials += char;
					} else {
						leftSpecials += char;
					}
					break;
				default:
					if (whiteSpaceMet > 0) {
						tokens.push(
							new Token(word, new Specials(leftSpecials, rightSpecials, whiteSpaceMet))
						);
						whiteSpaceMet = 0;
						word = char;
					} else {
						word += char;
					}
			}
		}
		tokens.push(
			new Token(word, new Specials(leftSpecials, rightSpecials, whiteSpaceMet))
		);
		return tokens;
	}

	coreShuffle() {
		this.value.forEach((token) => {
			token.shuffle();
		});
	}

	getOutput() {
		let output = '';
		this.value.forEach((token) => {
			output += token.version;
			output += token.whitespaces;
		});
		return output;
	}

	retrieveOriginalFromShuffled() {
		return this.value.filter((token) => {
			return 'shuffled' in token;
		});
	}
}

class Token {
	value;
	specials;
	shuffled;
	constructor(value, specials) {
		this.value = value;
		this.specials = specials;
	}

	shuffle() {
		if (this.doesntNeedToBeShuffled()) return;
		const { exempted, core } = this.disassembler();
		const shuffledCore = this.shuffleCore(core);
		this.shuffled = this.reassembler(exempted, shuffledCore);
	}

	shuffleCore(core) {
		let outcome;
		switch (core.length) {
			case 1:
				outcome = core;
				break;
			case 2:
				outcome = core[1] + core[0];
				break;
			default:
				outcome = core
					.split('')
					.sort(() => Math.random() - 0.5)
					.join('');
		}
		return outcome;
	}

	disassembler() {
		const arr = this.value.split('');
		const exempted = { first: arr[0], last: arr[arr.length - 1] };
		arr.pop();
		arr.shift();
		const core = arr.join('');
		return { exempted, core };
	}

	reassembler(exempted, core) {
		return exempted.first + core + exempted.last;
	}

	doesntNeedToBeShuffled() {
		// 1. a     -> [do not shuffle]
		// 2. ab    -> [do not shuffle]
		// 3. abc   -> [do not shuffle]
		// 4. abcd  -> acbd
		// 5. abcde -> dynamically shuffle
		return this.value.length < 4;
	}

	get props() {
		return [this.value, this.specials, this.shuffled];
	}

	get version() {
		if ('shuffled' in this) {
			return this.shuffled;
		} else {
			return this.value;
		}
	}

	get whitespaces() {
		return this.specials.whitespaceChars;
	}
}

class Specials {
	leftSpecials;
	rightSpecials;
	whitespaces;
	constructor(left, right, white) {
		this.leftSpecials = left;
		this.rightSpecials = right;
		this.whitespaces = white;
	}

	getSpecialsChars(left = true) {
		let which = left ? this.leftSpecials : this.rightSpecials;

		let output = '';
		for (let i = 0; i < this.which; i++) {
			output += ' ';
		}
		return output;
	}

	get whitespaceChars() {
		let output = '';
		for (let i = 0; i < this.whitespaces; i++) {
			output += ' ';
		}
		return output;
	}
}

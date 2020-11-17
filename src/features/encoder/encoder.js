import Specials from './specials';
import Token from './token';

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
						leftSpecials = '';
						rightSpecials = '';
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
			output += token.specials.leftSpecials;
			output += token.version;
			output += token.specials.rightSpecials;
			output += token.whitespaces;
		});
		return output;
	}

	retrieveOriginalFromShuffled() {
		return this.value
			.filter((token) => {
				return 'shuffled' in token;
			})
			.map((token) => token.value);
	}
}

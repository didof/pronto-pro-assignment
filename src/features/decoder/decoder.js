import Token from '../encoder/token';
import Specials from '../encoder/specials';

export default class Decoder {
	isValid;
	value;
	originalList;

	constructor(tokenized, list, isValid = true) {
		this.value = tokenized;
		this.originalList = list;
		this.isValid = isValid;
	}

	static withCheck(encoded, list, threshold = 50) {
		const tokenized = this.tokenize(encoded);
		if (this.compare(tokenized, list, threshold)) {
			return new Decoder(tokenized, list);
		} else {
			return new Decoder(null, null, false);
		}
	}

	static compare(tokensFromEncoded, wordFromList, threshold) {
		// since token with less than 3 char surely are not present in
		// wordFromList, it's more performant to filter them out.
		// In addition, applying the same logic that the encoder uses,
		// you are sure that the tokens of the two lists refer to the same word
		const utilsTokens = tokensFromEncoded.filter((token) => {
			return token.value.length > 3;
		});

		let notEncodedWords = 0;
		let significantWordsNumber = utilsTokens.length;
		for (let i = 0; i < significantWordsNumber; i++) {
			console.log(utilsTokens[i].value);
			console.log(wordFromList[i]);
			if (utilsTokens[i].value === wordFromList[i]) {
				notEncodedWords++;
			}
		}

		let rate = (notEncodedWords / significantWordsNumber) * 100;

		// if the notEncodedWords / significantWordsNumber is lower than
		// the threshold (default to 50), the input is considered not encoded,
		// thus it is raised an error
		return rate < threshold;
	}

	static tokenize(input) {
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

	get isNotValid() {
		return !this.isValid;
	}
}

import Token from '../features/token';
import Specials from '../features/specials';

export default function tokenize(input) {
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
			case ',':
			case ';':
			case '.':
			case '"':
			case "'":
			case '$':
			case '%':
			case '&':
			case '/':
			case '\\':
			case '(':
			case ')':
			case '=':
			case '|':
			case '+':
			case '-':
			case '#':
			case '{':
			case '}':
			case 'ç':
			case '@':
			case '€':
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

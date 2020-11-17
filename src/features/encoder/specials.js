export default class Specials {
	leftSpecials;
	rightSpecials;
	whitespaces;
	constructor(left, right, white) {
		this.leftSpecials = left;
		this.rightSpecials = right;
		this.whitespaces = white;
	}

	get whitespaceChars() {
		let output = '';
		for (let i = 0; i < this.whitespaces; i++) {
			output += ' ';
		}
		return output;
	}
}

import Header from '../Header';
import TextAreaWithButton from './TextAreaWithButton';
import TextAreaReadOnly from './TextAreaReadOnly';
import List from './list';

import CustomString from '../../utils/custom_string';
import Encoder from './encoder';

import { useState } from 'react';

const BusinessBlock = ({ title, actionLabel }) => {
	if (!actionLabel) {
		actionLabel = new CustomString(title).removeLastChar();
	}

	const defaultValue = '';
	const [text, setText] = useState(defaultValue);
	const [output, setOutput] = useState('');
	const [list, setList] = useState([]);

	function clearTextHandler() {
		setText((prevText) => defaultValue);
	}

	function changeTextHandler(input) {
		setText((prevText) => input);
	}

	function primaryActionHandler() {
		const encoder = new Encoder(text);
		encoder.coreShuffle();

		const encoded = encoder.getOutput();
		console.log(encoded);

		const listOfShuffled = encoder.retrieveOriginalFromShuffled();
		setList(listOfShuffled);

		// clearTextHandler();
	}

	return (
		<div>
			<Header size={2}>{title}</Header>
			<Header size={3}>Input</Header>
			<Header size={4}>Text to decode: {text}</Header>
			<TextAreaWithButton
				btnLabel={actionLabel}
				value={text}
				change={changeTextHandler}
				clear={clearTextHandler}
				primaryAction={primaryActionHandler}
			/>

			<Header size={3}>Output</Header>
			<Header size={4}>Encoded text</Header>
			<TextAreaReadOnly value={output} />

			<Header size={4}>List of the original words that got encoded</Header>
			<List values={list} />
		</div>
	);
};

export default BusinessBlock;

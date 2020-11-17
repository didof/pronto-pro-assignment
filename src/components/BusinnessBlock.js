import Header from './Header';
import TextAreaWithButton from './TextAreaWithButton';
import TextAreaReadOnly from './TextAreaReadOnly';
import List from './List';

import CustomString from '../utils/custom_string';
import Encoder from '../features/encoder/encoder';
import Decoder from '../features/decoder/decoder';

import { useState } from 'react';

const BusinessBlock = ({ title, actionLabel }) => {
	if (!actionLabel) {
		actionLabel = new CustomString(title).removeLastChar();
	}

	const defaultValue = '';
	const [text, setText] = useState(defaultValue);
	const [output, setOutput] = useState('');
	const [list, setList] = useState([]);

	const [decoderOutput, setDecoderOutput] = useState('');

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
		setOutput((prevOutput) => encoded);

		const list = encoder.retrieveOriginalFromShuffled();
		console.log(list);
		setList((prevList) => list);
	}

	function secondaryActionHandler() {
		const decoder = Decoder.withCheck(output, list);
		// if (decoder.isNotValid) {
		// 	console.error('is not valid');
		// 	return;
		// }
		console.log(decoder);
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

			<Header size={3}>Output</Header>
			<Header size={4}>Dencoded text</Header>
			<TextAreaReadOnly value={decoderOutput}>
				<DecodeButton action={secondaryActionHandler} />
			</TextAreaReadOnly>
		</div>
	);
};

const DecodeButton = ({ action }) => {
	return <button onClick={action}>Decode</button>;
};

export default BusinessBlock;

import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import BusinessBlock from './components/BusinnessBlock';

const Skin = styled.div`
	font-family: sans-serif;
`;

const App = () => {
	return (
		<Skin>
			<Header>WeirdText</Header>
			<BusinessBlock title='Encoder' />
			{/* <BusinessBlock title='Decoder' /> */}
		</Skin>
	);
};

export default App;

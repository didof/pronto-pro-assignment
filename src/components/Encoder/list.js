const List = ({ values }) => {
	return (
		<ul>
			{values.map((el) => {
				return <li key={`${Math.random()}-${el.shuffled}`}>{el.value}</li>;
			})}
		</ul>
	);
};

export default List;

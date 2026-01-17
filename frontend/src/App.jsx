import { useState } from 'react';

function App() {
	const [msg, setMsg] = useState('');
	const handleClick = () => {
		fetch('https://apply-hard.onrender.com/')
			.then((res) => {
				const data = res.text();
				return data;
			})
			.then((data) => {
				setMsg(data);
				console.log(data);
			})
			.catch((err) => {
				console.log('Error');
			});
	};

	return (
		<>
			<button onClick={handleClick}>Click</button>
			<div>{msg}</div>
		</>
	);
}

export default App;

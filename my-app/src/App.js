import React, {useState} from 'react';
import './App.css';

function App() {
	const url = 'https://api.github.com/users/';
	const [userName, setUserName] = useState('');
	const [content, setContent] = useState('');
	const [mode, setMode] = useState(localStorage.getItem('mode'));
	const getFourRepo = ([a, b, c, d, ...rest]) => {
		return [a, b, c, d]
	}
	const updateCountRepo = () => {
		const doUpdateCountRepo = new Promise((resolve, reject) =>{
			fetch(`${url}${userName}/repos`)
			.then(response => response.json())
			.then(data => {
				let count = 0
				let newData
				data.map(todo => count++)
				if(count > 4) newData = getFourRepo(data)  	
				else newData = data
				resolve(newData)
			})
		}) 
		return doUpdateCountRepo
	}
	const updateDataUser = () => {
		const doUpdateDataUser = new Promise((resolve, reject) =>{
			fetch(`${url}${userName}`)
			.then(response => response.json())
			.then(data => {
				if(data.message === "Not Found")
					reject('The username is not valid!')
				else resolve(data)
			})
		}) 
		return doUpdateDataUser
	}
	const Search = async () => {
		try {
			const dataUser =  await updateDataUser()
			try {
				const countRepo = await updateCountRepo()
				setContent(
					<div className="form_information">
						<img src={dataUser.avatar_url} alt={''}/>
						<h1>{dataUser.name}</h1>
						<h2>{dataUser.followers} Followers</h2>
						<h2>Repositories: </h2>
						{countRepo.map(todo => <a href={todo.html_url}>{todo.name}<br/></a>)}
					</div>)
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			setContent('');
			alert('The username is not valid!')
			console.log(error)
		}
	}
	const changeMode = () => {
		if(mode === 'Black') 
		{
			setMode('White')
			localStorage.setItem('mode', 'White')
		}
		else 
		{
			setMode('Black')
			localStorage.setItem('mode', 'Black')
		}
	}
	return (
		<div className="App" id={mode}>
			<div className="form_search">
				<input 
					type="text" 
					placeholder="Enter username" 
					onChange={event => setUserName(event.target.value)}/>
				<button onClick={Search}>Search</button>
				<button className="changeMode" onClick={changeMode}>Mode: {mode}</button>
			</div>
			{content}
		</div>
	);
}

export default App;

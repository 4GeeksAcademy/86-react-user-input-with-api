import React, { useState, useEffect, createRef } from "react";

//create your first component
const Home = () => {
	const [groceries, setGroceries] = useState([
		{ label: 'Apple', is_done: false },
		{ label: 'Bananas', is_done: false },
		{ label: 'Cantelop', is_done: false }])
	const [userInput, setUserInput] = useState("");
	const [updatedValue, setUpdatedValue] = useState("");
	// const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		getUser()
	}, [])

	useEffect(() => {
		console.log(groceries)
	}, [groceries])

	async function getUser() {
		let getResponse = await fetch("https://playground.4geeks.com/todo/users/valerieclaire96")
		let getData = await getResponse.json()
		if (getData?.detail?.includes("doesn't exist")) {
			createUser
		}
		else {
			setGroceries(getData.todos)
		}
	}
	async function createUser() {
		let postResponse = await fetch("https://playground.4geeks.com/todo/users/valerieclaire96", {
			method: "POST",
			headers: { "Content-type": "application/json" },
		})
		let postData = await postResponse.json()
		console.log(postData)
	}

	const addToList = (item, event) => {
		//we will want to add a fetch request
		if (event.key === "Enter" || event.type == "click") {
			let groceryItem = { label: item, is_done: false }
			//without the spread operator [[Apple, banana, cantelop], dragonfruit]
			//with the spread operator [Apple, banana, cantelop, dragonfruit]

			setGroceries([...groceries, groceryItem])
			setUserInput("")
		}
	}
	const updateItem = (index) => {
		let newList = []

	}
	const markItemAsShopped = (index) => {
		let newList = groceries.map((grocery, i) => {
			if (index == i) {
				return { label: grocery['label'], is_done: !grocery['obtained'] };
			}
			else {
				return grocery;
			}
		})
		setGroceries(newList);
	}
	return (
		//this is the html part of a react component
		<div className="text-center">
			<h3>Need From The Store.</h3>
			<input
				type="text"
				placeholder="Enter grocery item here"
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
				onKeyDown={(e) => addToList(userInput, e)}
			/>
			<button onClick={(e) => addToList(userInput, e)} >Add to List</button>
			<ul>
				{/* if we want to write js/dynamic code we must use {} */}
				{groceries.map((grocery, index) => {
					return (
						<li className={grocery.is_done ? "shopped" : ""} key={index}>{grocery.label}
							<span onClick={() => markItemAsShopped(index)}>☑️</span>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Home;
import React, { useState, useEffect, createRef } from "react";

//create your first component
const Home = () => {
	const [groceries, setGroceries] = useState()
	const [userInput, setUserInput] = useState("");
	const [userEditInput, setUserEditInput] = useState("");
	const [currentEdit, setCurrentEdit] = useState("");

	useEffect(() => {
		getUser()
	}, []) //empty dependancy array == run onload, and only onload

	async function getUser() { //get user also populates grocery list
		let response = await fetch("https://playground.4geeks.com/todo/users/valerieclaire96")
		let data = await response.json();
		if (data.detail?.includes("doesn't exist")) {
			createUser()
		}
		else {
			setGroceries(data.todos)
		}
	}
	async function createUser() {
		let postResponse = await fetch("https://playground.4geeks.com/todo/users/valerieclaire96", {
			method: "POST",
			headers: { "Content-type": "application/json" },
		})
		let postData = await postResponse.json()
	}

	const addToList = async (item, event) => {
		//we will want to add a fetch request
		if (event.key === "Enter" || event.type == "click") {
			let groceryItem = { label: item, is_done: false }
			//without the spread operator [[Apple, banana, cantelop], dragonfruit]
			//with the spread operator [Apple, banana, cantelop, dragonfruit]

			let response = await fetch('https://playground.4geeks.com/todo/todos/valerieclaire96', {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(groceryItem)
			});
			let data = await response.json()
			getUser();
			setUserInput("")
		}
	}
	const markItemAsShopped = (index) => {
		let newItem = { label: groceries[index].label, is_done: !groceries[index].is_done }
		updateRequest(newItem, groceries[index].id)
	}
	const updateItem = (index) => {
		let newItem = { label: userEditInput, is_done: groceries[index].is_done }
		updateRequest(newItem, groceries[index].id)
		setUserEditInput("");
		setCurrentEdit("")
	}
	const updateRequest = async (grocery, id) => {
		let response = await fetch("https://playground.4geeks.com/todo/todos/" + id, {
			method: "PUT",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(grocery)
		})
		let data = await response.json()
		getUser() //get user also updates the list
	}
	const toggleEdit = (id) => {
		if (currentEdit == "") {
			setCurrentEdit(id);
		}
		else {
			setCurrentEdit("");
		}
	}
	const deleteFromList = async (id) => {
		let deleteResponse = await fetch('https://playground.4geeks.com/todo/todos/' + id, {
			method: "DELETE"
		})
		getUser()
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
				{groceries?.map((grocery, index) => {
					return (
						<li className={grocery.is_done ? "shopped" : ""} key={grocery.id}>
							{currentEdit == grocery.id ?
								<span>
									<input onChange={(e) => setUserEditInput(e.target.value)} />
									<span onClick={() => updateItem(index)}>💾</span>
								</span>
								: 
								<span>
									{grocery.label}
									<span onClick={() => markItemAsShopped(index)}>☑️</span>
								</span>}
							<span onClick={() => toggleEdit(grocery.id)}>✏️</span>
							<span className="deleteBtn" onClick={() => deleteFromList(grocery.id)}>🗑️</span>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Home;
import React, { useState } from "react";

//create your first component
const Home = () => {
	const [groceries, setGroceries] = useState([
		{ value: 'Apple', obtained: false, edit: false },
		{ value: 'Bananas', obtained: false, edit: false },
		{ value: 'Cantelop', obtained: false, edit: false }])
	const [userInput, setUserInput] = useState("");
	// const [editMode, setEditMode] = useState(false);
	const [updatedValue, setUpdatedValue] = useState("");

	//{value: grocery name, obtained: true}
	//this is the js of a react component
	const addToList = (item, event) => {
		if (event.key === "Enter" || event.type == "click") {
			let groceryItem = {value: item, obtained: false, edit: false}
			//without the spread operator [[Apple, banana, cantelop], dragonfruit]
			//with the spread operator [Apple, banana, cantelop, dragonfruit]
			setGroceries([...groceries, groceryItem])
			setUserInput("")
		}
	}
	const updateItem = (index) => {
		let newList = []
		console.log(groceries[index]['edit'])
		if (groceries[index]['edit']) {
			newList = groceries.map((grocery, i) => {
				if (index == i) {
					return { value: updatedValue, obtained: grocery['obtained'], edit: !grocery['edit'] };
				}
				else {
					return grocery;
				}
			})
			console.log(newList)
		}
		else {
			newList = groceries.map((grocery, i) => {
				if (index == i) {
					return { value: grocery['value'], obtained: grocery['obtained'], edit: !grocery['edit'] };
				}
				else {
					return grocery;
				}
			})
		}

		setGroceries(newList);
		setUpdatedValue("")
	}
	const markItemAsShopped = (index) => {
		let newList = groceries.map((grocery, i) => {
			if (index == i) {
				return { value: grocery['value'], obtained: !grocery['obtained'] };
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
				placeholder="Enter text here"
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
				onKeyDown={(e) => addToList(userInput, e)}
			/>
			<button onClick={(e) => addToList(userInput, e)} >Add to List</button>
			<ul>
				{/* if we want to write js/dynamic code we must use {} */}
				{groceries.map((grocery, index) => {
					return (
						<li className={grocery.obtained ? "shopped" : ""} key={index}>{grocery.value}
							{grocery.edit ?
								<span>
									<input type="text"
										onChange={(e) => setUpdatedValue(e.target.value)}
									/>

									<span onClick={() => updateItem(index)}>💾</span>
								</span>
								: <span onClick={() => updateItem(index)}>✏️</span>
							}
							<span onClick={() => markItemAsShopped(index)}>☑️</span>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Home;
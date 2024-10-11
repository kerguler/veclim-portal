function updateNestedState(state, path, value) {
	const keys = path.split(".");
	const lastKey = keys.pop();

	// Copy the original state to avoid mutating the original object
	const newState = { ...state };

	// Traverse the state tree to reach the target key
	let nestedState = newState;
	keys.forEach((key) => {
		// Create a shallow copy of each nested level to preserve immutability
		nestedState[key] = { ...nestedState[key] };
		nestedState = nestedState[key];
	});

	// Assign the new value to the nested property
	nestedState[lastKey] = value;
console.log({path,value})
	return newState;
}
export default updateNestedState;
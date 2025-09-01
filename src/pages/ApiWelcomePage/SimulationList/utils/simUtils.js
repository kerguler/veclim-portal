export function areArraysIdentical(arrA, arrB) {
	if (!arrA || !arrB) return false;
	if (arrA.length !== arrB.length) return false;
	return arrA.every(
		(item, index) =>
			item.id === arrB[index].id &&
			item.status === arrB[index].status /* etc. */,
	);
}

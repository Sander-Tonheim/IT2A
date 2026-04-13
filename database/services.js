async function getUserData(connection, email) {
	const [results] = await connection.query(`SELECT * FROM login WHERE username = "${email}"`);
	return results;
}

async function insertIntoUserDatabase(connection, email, password) {
	const query = "INSERT INTO login (username, password) VALUES (?, ?)";
	return await connection.execute(query, [email, password]);
}

async function insertIntoBistandDatabase(connection, email, text) {
	const query = "INSERT INTO bistand (username, text) VALUES (?, ?)";
	return await connection.execute(query, [email, text]);
}

async function getUserText(connection, email) {
	const [results] = await connection.query(`SELECT * FROM bistand WHERE username = "${email}"`);
	return results;
}
module.exports = { getUserData, insertIntoUserDatabase, insertIntoBistandDatabase, getUserText };

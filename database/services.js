async function getUserData(connection, email) {
	const [results] = await connection.query(`SELECT * FROM login WHERE username = "${email}"`);
	return results;
}

async function insertIntoUserDatabase(connection, email, password, userLevel) {
	const query = "INSERT INTO login (username, password, user_level) VALUES (?, ?)";
	return await connection.execute(query, [email, password, userLevel]);
}

async function insertIntoBistandDatabase(connection, email, text, userLevel) {
	if (userLevel == 2) {
		return false;
	}
	const userLevelQuery = "UPDATE login SET user_level = 2 WHERE username = ?";
	await connection.execute(userLevelQuery, [email])
	const query = "INSERT INTO bistand (username, text) VALUES (?, ?)";
	return await connection.execute(query, [email, text]);
}

async function getUserText(connection, email) {
	const [results] = await connection.query(`SELECT * FROM bistand WHERE username = "${email}"`);
	return results;
}
module.exports = { getUserData, insertIntoUserDatabase, insertIntoBistandDatabase, getUserText };

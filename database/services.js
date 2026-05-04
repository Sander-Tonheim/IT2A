async function getUserData(connection, email) {
	const [results] = await connection.query(`SELECT * FROM login WHERE username = "${email}"`);
	return results;
}

async function insertIntoUserDatabase(connection, email, password, userLevel) {
	const query = "INSERT INTO login (username, password, user_level) VALUES (?, ?, ?)";
	return await connection.execute(query, [email, password, userLevel]);	
}

async function insertBistandIntoDatabase(connection, email, text) {
	const query = "INSERT INTO bistand (username, text) VALUES (?, ?)";
	return await connection.execute(query, [email, text]);
}

async function updateUserlevelToOne(connection, email, userLevel) {
	const query = "UPDATE login SET user_level = ? where username = ?";
	return await connection.execute(query, [userLevel, email]);
}
module.exports = { getUserData, insertIntoUserDatabase, insertBistandIntoDatabase, updateUserlevelToOne };

async function getCar(connection) {
	const [results] = await connection.query("SELECT * FROM car");

	return results;
}

module.exports = { getCar };

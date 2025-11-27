async function getCar(connection) {
	const [results] = await connection.query("SELECT * FROM car");

	return results;
}

async function insertIntoCarDatabase(connection, brand, engine, wheels) {
	console.log(brand, engine, wheels);
	const query = "INSERT INTO car (brand, engine, wheels) VALUES (?, ?, ?)";
	return await connection.execute(query, [brand, engine, wheels]);
}
module.exports = { getCar, insertIntoCarDatabase };

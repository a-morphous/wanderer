import fs from 'fs'

/**
 * Checks if a file is binary by looking for a null byte in its first 512 bytes.
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
export function isFileBinary(filePath) {
	return new Promise((resolve, reject) => {
		const stream = fs.createReadStream(filePath, { start: 0, end: 512 });

		stream.on('data', (chunk: Buffer) => {
			// Check if the chunk contains a null byte
			if (chunk.includes(0)) {
				resolve(true);
				stream.destroy(); // Stop reading the rest of the file chunk
			}
		});

		stream.on('end', () => {
			resolve(false); // No null byte found in the chunk
		});

		stream.on('error', (err) => {
			reject(err);
		});
	});
}

async function superCompress(input) {
	let finalResult;
	try {
		const cacheResult = await readFromCache(input);
		finalResult = cleanCacheMetadata(cacheResult);
	} catch (error) {
		if (error.code != 'NoCache') {
           throw error;
        }
        
        finalResult = await readFromFile(input);
		await storeInCache(input, finalResult);
	}
	return compress(finalResult);
}

async function main() {
	await superCompress('promises.js');
}

main()
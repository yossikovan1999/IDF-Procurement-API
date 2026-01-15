import fs from "fs";

export async function writeToJsonFile(fileName : string ,data : any){
    
    const jsonData = JSON.stringify(data)

    await fs.promises.writeFile(fileName, jsonData);
}


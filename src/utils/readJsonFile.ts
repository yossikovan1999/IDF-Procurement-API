import fs from "fs";


export async function readFromJsonFile(fileName : string){

    const data : any = await fs.promises.readFile(fileName);
    
    //this will convert the data to json.
    const jsonData = JSON.parse(data);

    // return jsonData;
    return jsonData;
}
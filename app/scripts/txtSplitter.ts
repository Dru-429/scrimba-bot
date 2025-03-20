import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

try {
    const result = await fetch('data.txt');
    const text = await result.text()

    const splitter = new RecursiveCharacterTextSplitter()
    const output = await splitter.createDocuments([text])

    console.log(output)
} catch (error) {
    console.log(error)
}
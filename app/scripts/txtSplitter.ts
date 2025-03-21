"use cleint"

import data from "../assets/data";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from '@supabase/supabase-js'


const script = async () => {

    try {
        // const result = await fetch('./assets/data.txt');
        // const text = await result.text()
        const text = data
        const sbApiKey = process.env.SUPABASE_API_KEY
        const sbUrl = process.env.SUPABASE_URL_ENDPOINT
        const openAIApiKey = process.env.OPENAI_API_KEY

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            separators: ['\n\n', '\n', ' ', ''], // default setting
            chunkOverlap: 50
        })
        const output = await splitter.createDocuments([text])
        

        console.log(output)
    } catch (error) {
        console.log(error)
    }
}

script()
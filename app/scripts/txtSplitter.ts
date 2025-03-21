"use cleint"

import data from "../assets/data";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { OpenAIEmbeddings } from '@langchain/openai'

const script = async () => {

    try {
        // const result = await fetch('./assets/data.txt');
        // const text = await result.text()
        const text: string = data;
        const sbApiKey: string | undefined = process.env.SUPABASE_API_KEY;
        const sbUrl: string | undefined = process.env.SUPABASE_URL_ENDPOINT;
        const openAIApiKey: string | undefined = process.env.OPENAI_API_KEY;
        
        if ( sbApiKey === undefined || sbUrl === undefined || openAIApiKey === undefined) {
            throw new Error("env variables error ")
            return
        }

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            separators: ['\n\n', '\n', ' ', ''], // default setting
            chunkOverlap: 50
        })
        const output = await splitter.createDocuments([text])
        
        const client = createClient(sbUrl, sbApiKey)

        await SupabaseVectorStore.fromDocuments(
            output,
            new OpenAIEmbeddings({ openAIApiKey }),
            {
                client,
                tableName: 'documents',
            }
        )
        
        // console.log(output)
    } catch (error) {
        console.log(error)
    }
}

script()
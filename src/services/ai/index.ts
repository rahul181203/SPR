"use server"
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { QuerySqlTool } from "langchain/tools/sql";

const datasource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: 5432,
    ssl: true
})

export const GetReply = async (question: string) => {
    const db = await SqlDatabase.fromDataSourceParams({ appDataSource: datasource })
    
    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-pro",
        // maxOutputTokens: 2048,
    });

    const executeQuery = new QuerySqlTool(db);

    const writeQuery = await createSqlQueryChain({
        llm,
        db,
        dialect: "postgres",
    });

    const response = await writeQuery.invoke({
        question,
    });

    console.log("response", response);

    const st = response.indexOf("SELECT")
    const ed = response.indexOf(";")

    const query = response.substring(st,ed+1)

    const ansStart = response.indexOf("Answer")
    if(ansStart > 0){
        const ans = response.substring(ansStart+8)
        return {query,ans}
    }

    const res = executeQuery.invoke(query)

    console.log(res);
    

    return { query,res }
}





import runAgent from "./runner.js";

const input = "expain this https://tuhinkairi.vercel.app/"

const stream = await runAgent(input)

let text=""
for await (const chunk of stream){
    text+=chunk.text ||""
    console.log(text)
}

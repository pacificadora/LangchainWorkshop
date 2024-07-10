import { LLMChain, OpenAI, PromptTemplate } from "langchain";

const ques = "what was the growth in P&L in FinancialYear 2021-202?";

const vectorStore = await HNSWLib.load(
  "./indexes/hul.index",
  new OpenAiEmbeddings({
    openAIApiKey: "",
  })
);

//similarity search
const document = await vectorStore.similaritySearch(ques, 2);

const chat = new OpenAI({
  temperature: 0,
  openAIApiKey: "",
  modelName: "gpt-3.5-turbo",
});

const template = `You are a enthusiastic representative of Hindustan Uniliver Limited who loves to help people!
Given the following sections from the annual report of Hindustan Uniliver Limited, answer the question using only that information only.
If you are unsure or the answer is not present in the given information, say "I'm sorry, i can't help you"

Information: 
{contextDocs}

Question:
{query}`;

const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["contextDocs", "query"],
});

const chain = new LLMChain({ llm: chat, prompt: prompt });

const res = await chain.call({ contextDocs: contextDocs, query: ques });
console.log(res);

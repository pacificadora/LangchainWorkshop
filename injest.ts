import { PDFLoader } from "langchain/document_loaders";
const loader = new PDFLoader("./docs/hul_annual_report.pdf");
const docs = await loader.load();

console.log(docs);

const ques = "what was the growth in P&L in FinancialYear 2021-202?";

const vectorStore = await HNSWLib.load(
  "./indexes/hul.index",
  new OpenAiEmbeddings({
    openAIApiKey: "",
  })
);

await HNSWLib.save(vectorStore);

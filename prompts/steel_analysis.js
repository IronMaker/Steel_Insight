/**
 * Steel Insights - Decoupled Structured Prompt Engineering Layer
 */
const steelAnalysisPrompt = {
    system: "You are SteelAgent Core, an industrial market intelligence architect. Extract structural data into a strict JSON schema.",
    userTemplate: (data) => `分析數據邊界如下：\n---\n${data}\n---\n請輸出結構化 JSON。`
};

module.exports = { steelAnalysisPrompt };
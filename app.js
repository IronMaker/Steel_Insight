require('dotenv').config();
const SamplingStrategy = require('./sampling_strategy');
const { steelAnalysisPrompt } = require('./prompts/steel_analysis');

async function processIntelligenceFeed(rawPayload) {
    try {
        console.log("[Steel Insights] Ingesting and cleansing data...");
        const sampler = new SamplingStrategy({ maxTokenLimit: 16384 });
        const optimized = sampler.optimizeFeed(rawPayload);
        
        if (optimized.isTruncated) {
            console.warn("[Steel Insights] Guardrail Warning: Data truncated safely.");
        }

        const systemPrompt = steelAnalysisPrompt.system;
        const userPrompt = steelAnalysisPrompt.userTemplate(optimized.sampledText);

        return {
            status: "success",
            meta: { tokensProcessed: optimized.estimatedTokens },
            payloadReady: true
        };
    } catch (error) {
        console.error("[Steel Insights Engine Critical Error]:", error.message);
        return { status: "error", message: error.message };
    }
}

module.exports = { processIntelligenceFeed };
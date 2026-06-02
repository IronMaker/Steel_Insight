/**
 * Steel Insights - Adaptive Sampling Strategy Engine
 */
class SamplingStrategy {
    constructor(config = {}) {
        this.maxTokenLimit = config.maxTokenLimit || 8192;
        this.targetDensity = config.targetDensity || 0.85;
    }

    optimizeFeed(rawText) {
        if (!rawText || typeof rawText !== 'string') {
            throw new Error("Invalid raw data input: Payload must be a string.");
        }
        
        // Data Edge Bounding: 徹底清除引發 SyntaxError 的非法不可見控制字元
        const cleanText = rawText.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        
        const segments = cleanText.split('\n\n');
        let selectedSegments = [];
        let currentEstimatedTokens = 0;

        for (let segment of segments) {
            const estimatedTokens = Math.ceil(segment.length / 4);
            if (currentEstimatedTokens + estimatedTokens < this.maxTokenLimit * this.targetDensity) {
                selectedSegments.push(segment);
                currentEstimatedTokens += estimatedTokens;
            } else {
                break; 
            }
        }

        return {
            sampledText: selectedSegments.join('\n\n'),
            estimatedTokens: currentEstimatedTokens,
            isTruncated: selectedSegments.length < segments.length
        };
    }
}

module.exports = SamplingStrategy;
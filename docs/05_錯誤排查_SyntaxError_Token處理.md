# 異常排查：SyntaxError - Invalid or unexpected token
- **根因**：外部數據或字串夾帶非標準控制字元或 BOM 頭部，造成 Node.js 加載器異常。
- **解法**：已於 `sampling_strategy.js` 導入防禦性正則清洗機制（`/[\u0000-\u001F\u007F-\u009F]/g`）。
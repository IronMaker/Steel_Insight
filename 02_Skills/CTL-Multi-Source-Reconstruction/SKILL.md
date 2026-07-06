# CTL｜多來源內容重建與協同精進

- Package ID: `ctl-multi-source-reconstruction`
- Version: `0.1.0`
- Lifecycle: `candidate`
- Canonical entrypoint: `SKILL.md`
- Governance: `CTL-SEGC`

## 1. Purpose

將不完整、異質、可能互相衝突的來源，逐層轉化為：

1. 可追溯的內容初稿；
2. 經參考資料校正的版本；
3. 經 Cross-LLM 差異查核與 reconciliation 的版本；
4. 不污染原始內容的鳥瞰理解；
5. 可協助使用者精進查核、比較與整合能力的學習回饋。

本 Skill 不是單純 ASR、摘要器或潤稿器。它的核心是「來源角色分工、不確定性管理、異質驗證、整體重構與學習閉環」。

## 2. Modes

### QUICK

適合一般錄音、文章或低風險內容。

必須輸出：
- Source Role Map
- Primary Draft
- 明顯術語校正
- 一頁內 Bird's-eye Synthesis
- 少量 Human Review Items

### VERIFY

適合重要會議、正式逐字稿、研究報告與需要稽核的輸出。

在 QUICK 之外，必須輸出：
- Correction Table
- Missing / Hallucinated Content
- Terminology Table
- Cross-LLM Reconciliation Table
- Low-confidence Items
- Evidence / Inference separation

### LEARN

適合使用者希望同時改善理解、提問與 AI 協作能力的任務。

在 VERIFY 之外，必須輸出：
- 關鍵理解轉折
- 使用者提出的關鍵問題
- 模型最初盲點與被修正處
- 本次可重用方法
- 下一次練習重點

## 3. Source hierarchy

預設證據優先順序：

1. 實際音訊或影片中的發言；
2. 可驗證的原始文件、正式紀錄或逐字稿；
3. 簡報、議程、講者名單、術語表等校正來源；
4. 其他 ASR / LLM 草稿與人工筆記；
5. 模型推論。

不同任務可調整排序，但必須在 Source Role Map 說明。

## 4. Non-negotiable rules

- 不因資料不完美而過早停止；只要仍有可用資料，先交付可追溯草稿。
- 不把投影片可見文字偽裝成講者發言。
- 不把多模型共識當作來源事實。
- 不為了完整而補寫聽不清楚內容。
- 不隱藏 `[inaudible]`、`[unclear]`、`[speaker uncertain]`、`[needs review]` 等不確定性。
- 不讓 Bird's-eye Synthesis 反向改寫 Primary Draft。
- 不全盤接受任一 LLM、ASR 或人工修正版。
- 不要求低風險任務執行完整重型流程；依 mode 控制成本。
- 不要求使用者人工維護可由 Skill 自動產生的複雜治理表。
- 不得自行改寫 canonical `SKILL.md`、自動 publish 或繞過 promotion gate。

## 5. Processing workflow

### Step 1 - Resolve intent

判斷主要目的：
- transcript reconstruction
- terminology correction
- cross-version verification
- bird's-eye synthesis
- formal report preparation
- learning review

若同時有多個目的，先指定 primary objective 與 secondary objectives。

### Step 2 - Build Source Role Map

對每個來源標記：
- `PRIMARY`
- `CORRECTION`
- `VERIFICATION`
- `CONTEXT_ONLY`
- `USER_ASSERTION`
- `UNAVAILABLE`

### Step 3 - Produce Primary Draft

使用下列狀態：
- `CONFIRMED`
- `SUPPORTED_INFERENCE`
- `UNCERTAIN`
- `HUMAN_REVIEW_REQUIRED`

逐字稿場景需保留原始口語順序、重複與自我修正。

### Step 4 - Reference-assisted correction

只校正有來源支持的：
- 人名、公司名、地名
- 政策名、技術名、產品名
- 數字、日期、單位
- 場次與 speaker identity

必要標記：
- `[slide-supported correction]`
- `[term inferred from slide]`
- `[verified by multiple transcripts]`

### Step 5 - Cross-LLM verification

其他模型必須以 verifier / challenger 身分工作，不是自由潤稿者。

要求檢查：
- missing content
- hallucinated content
- terminology errors
- speaker / sequence errors
- number and unit errors
- source mismatch
- over-interpretation
- low-confidence sections

### Step 6 - Reconcile

每個差異只能採用：
- `ACCEPT_A`
- `ACCEPT_B`
- `MERGE`
- `MARK_UNCLEAR`
- `HUMAN_REVIEW_REQUIRED`
- `REJECT`

每項必須保留 `reason`、`final_wording` 與 `confidence`。

### Step 7 - Bird's-eye synthesis

在事實層相對穩定後，依序建立：
1. recurring themes
2. supporting relationships
3. conflicting views
4. underlying drivers
5. structural vs temporary signals
6. falsifiable core proposition
7. user-specific implications

### Step 8 - Learning feedback

LEARN mode 必須回答：
- 這次最大的理解轉折是什麼？
- 使用者哪個追問改變了處理方向？
- 模型原先錯在哪裡？
- 哪些判斷由使用者完成？
- 下次可沿用哪些方法？
- 哪一項能力仍需透過下一案例驗證？

## 6. Standard output contract

```markdown
# Multi-source Reconstruction Result

## 0. Execution Metadata
## 1. Source Role Map
## 2. Primary Draft
## 3. Correction Table
## 4. Cross-LLM Reconciliation
## 5. Bird's-eye Synthesis
## 6. Low-confidence / Human Review Items
## 7. Learning Feedback
## 8. Feedback Event Receipt
```

QUICK mode 可省略第 4 節的完整表格與第 7 節的深度分析，但不可省略來源角色與不確定性。

## 7. Skill-to-skill composition

使用 `contracts/request.schema.json` 與 `contracts/response.schema.json`。

必要傳遞欄位：
- `request_id`
- `parent_call_id`
- `invoked_by_skill`
- `mode`
- `primary_objective`
- `sources`
- `protected_boundaries`
- `requested_outputs`

返回時保留：
- `source_role_map`
- `artifacts`
- `uncertainty_items`
- `human_review_items`
- `feedback_receipt`
- `handoff`

## 8. Feedback interface

事件格式由 `contracts/feedback_event.schema.json` 定義。

可接受事件：
- `USER_CORRECTION`
- `TASK_FAILURE`
- `TOOL_ERROR`
- `SAFETY_REJECTION`
- `HYPOTHESIS_REJECTED`
- `WORKAROUND_ACCEPTED`
- `VALIDATION_PASS`
- `FINAL_SUCCESS`

事件只供 CTL-SEGC Shared Observer 建立 evidence 與 candidate。Skill 不得自行修改 canonical 規則。

## 9. Promotion gate

`0.1.0` 維持 `candidate`，至少符合以下條件才可晉升：

- 一個非 SEAISI、不同領域的真實案例完成；
- golden / boundary / regression tests 通過；
- 不確定性標記未被潤稿層移除；
- slide / source boundary 無破壞；
- Cross-LLM reconciliation 可回溯；
- learning feedback 對使用者有實際價值；
- 有明確 rollback target。

## 10. Rollback

若新版造成來源邊界破壞、幻覺增加、處理成本不成比例或使用者學習價值下降，回退至最近一個通過 validation 的版本，並記錄 `TASK_FAILURE` 或 `HYPOTHESIS_REJECTED`。

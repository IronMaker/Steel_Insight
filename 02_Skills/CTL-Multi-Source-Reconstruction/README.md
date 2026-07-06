# CTL｜多來源內容重建與協同精進 v0.1.0

一個 repo-ready、可被其他 Skill 呼叫的 CTL 能力資產。

## 解決什麼問題

當資料同時包含錄音、ASR、簡報、PDF、議程、筆記與其他 LLM 草稿時，本 Skill 用一致流程處理：

`初稿 → 校正 → 差異辯證 → reconciliation → 鳥瞰理解 → 學習回饋`

## Repo placement

```text
02_Skills/
└── CTL-Multi-Source-Reconstruction/
```

本 package 應放入既有 `ctl-personal-capabilities` 或 Insight Foundry 的 `02_Skills/`。不要另建獨立治理系統。

## Minimal invocation

```yaml
skill: ctl-multi-source-reconstruction
version: 0.1.0
mode: VERIFY
primary_objective: transcript_reconstruction
sources:
  - source_id: audio_01
    source_type: audio
    role: PRIMARY
  - source_id: slides_01
    source_type: slides
    role: CORRECTION
requested_outputs:
  - primary_draft
  - correction_table
  - reconciliation_table
  - bird_eye_synthesis
```

## Modes

- `QUICK`: 低成本整理與基本鳥瞰。
- `VERIFY`: 正式查核與差異 reconciliation。
- `LEARN`: 在 VERIFY 上增加使用者學習回顧。

## Governance

- Lifecycle: `candidate`
- Shared governance: `CTL-SEGC`
- No auto-rewrite of `SKILL.md`
- No auto-publish
- Promotion requires a second distinct real-world case
- Rollback is mandatory

## Package contents

- `SKILL.md`: canonical behavior
- `skill.yaml`: machine-readable capability metadata
- `contracts/`: request, response, feedback event schemas
- `workflows/`: QUICK / VERIFY / LEARN execution profiles
- `templates/`: correction and reconciliation output templates
- `governance/`: CTL-SEGC integration
- `registry/`: capability registry entry
- `tests/`: golden, boundary, regression cases
- `references/`: SEAISI 2026 method case
- `MANIFEST.json`: checksummed package inventory

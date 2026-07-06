# CTL-SEGC Integration

## Governance relationship

This Skill is a governed capability asset under CTL-SEGC. It consumes the shared observer and feedback contract but does not duplicate the governance core.

## Evolution loop

`Observe → Reflect → Consolidate → Validate → Promote → Monitor → Rollback`

## v0.1 restrictions

- `auto_rewrite_canonical: false`
- `auto_publish: false`
- `self_monitor_all_dialogue: false`
- event observation does not equal rule change
- user command "檢討／學習／進化" is a forced review trigger, not the start of observation

## Event handling

1. Shared Observer records structured events.
2. Repeated or high-impact evidence becomes a reflection candidate.
3. Candidate changes are consolidated into a proposed patch.
4. Golden, boundary, and regression tests validate the patch.
5. Promotion requires explicit gate approval.
6. Monitor post-release performance.
7. Roll back on source-boundary violation, hallucination increase, or disproportionate cost.

## Promotion status

Current: `candidate`

Required before stable:
- one distinct real-world case outside SEAISI / steel conference reporting
- all test suites pass
- no protected-boundary incident
- measurable user learning value
- rollback target recorded

# Case Study｜SEAISI 2026

## Case role

This file records the evidence case that produced the initial Skill. It is not a universal rule source.

## Initial problem

A conference project contained recordings, ASR drafts, slides, agenda, speaker information, notes, and outputs from other LLMs. The user needed both faithful reconstruction and a management-level understanding of the whole conference.

## Key failures discovered

- Premature refusal because audio quality was imperfect.
- ASR errors in steel-industry terms.
- Risk of treating slide text as spoken content.
- Single-model omissions and over-interpretation.
- Many accurate local summaries without a coherent global proposition.

## Solution evolution

1. Produce v0.1 even when incomplete, with explicit uncertainty.
2. Assign source roles before correction.
3. Use slides and agenda only for correction and context.
4. Turn other LLMs into auditors and challengers.
5. Reconcile differences with explicit decisions.
6. Build the bird's-eye proposition only after the fact layer stabilized.
7. Record what the user learned about evidence, model roles, and synthesis.

## Result

The conference was ultimately framed through a management proposition: Asian steel competition is shifting from price competition toward rule competition. The value of the case was not only the proposition, but the traceable workflow that produced it.

## Generalizable elements

- uncertainty-preserving draft
- source role separation
- Cross-LLM disagreement as an audit signal
- reconciliation with reasons
- synthesis after evidence stabilization
- explicit user learning feedback

## Non-generalizable elements

- steel terminology
- SEAISI session structure
- specific market conclusions
- source-specific slide corrections

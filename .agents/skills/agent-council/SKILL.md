---
name: agent-council
description: Collect and synthesize opinions from multiple AI agents. Use when users say "summon the council", "ask other AIs", or want multiple AI perspectives on a question.
---

# Agent Council

Collect multiple AI opinions and synthesize one answer.

## Usage

Run a job and collect results:

```bash
COUNCIL_SCRIPT=".agents/skills/agent-council/scripts/council.sh"
JOB_DIR=$("$COUNCIL_SCRIPT" start "your question here")
"$COUNCIL_SCRIPT" wait "$JOB_DIR"
"$COUNCIL_SCRIPT" results "$JOB_DIR"
"$COUNCIL_SCRIPT" clean "$JOB_DIR"
```

One-shot:

```bash
.agents/skills/agent-council/scripts/council.sh "your question here"
```

## References

- `references/overview.md` — workflow and background.
- `references/examples.md` — usage examples.
- `references/config.md` — member configuration.
- `references/requirements.md` — dependencies and CLI checks.
- `references/host-ui.md` — host UI checklist guidance.
- `references/safety.md` — safety notes.

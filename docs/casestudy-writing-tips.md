# Case Study Writing Tips

Derived from strong portfolio case studies such as Rachel Chen's OpenAI/Tomo project and Oishee Sen's Outlook Mobile Web project, this guide is meant to keep your case studies strategic, skimmable, and credible without turning them into long school-style reports.

## 1. Start with what was at stake
Don't open with process. Open with the tension.

- Define the business, product, or service risk first.
- Explain why the problem mattered beyond usability.
- If the project is not strategic in a market sense, frame the operational or user-experience cost clearly.

Good openings answer:
- What was broken?
- Why did it matter?
- Why was this worth fixing now?

## 2. Reveal the answer early
Readers should not have to work to discover the point of the project.

- Show the solution direction near the top.
- Include role, team, timeline, and scope immediately.
- Let the rest of the case study justify the direction rather than hide it for suspense.

Rachel Chen is strong here: she reveals the concept early.
Oishee Sen is strong here too: she quickly states what shipped, at what scale, and which modules she owned.

## 3. Write headers that carry the story
A reader should understand the project by scanning the headings alone.

- Replace labels like `Research`, `Process`, or `Final Design` with takeaway-driven headers.
- Use headings that express a conclusion, tension, or decision.
- Make each section title earn its space.

Good:
- `Survey data exposed the gap between a positive impression and a complete experience`
- `Contextual yet unified results`
- `Trading memory for privacy`

Bad:
- `Research Findings`
- `Ideation`
- `Prototype`

## 4. Make the case study modular
The best case studies are easy to enter and easy to leave.

- Break the story into distinct decision blocks or focus areas.
- Let each block answer one clear question.
- If the project is broad, use sub-case-studies or modules instead of forcing one long linear narrative.

This is where the Outlook case study is especially strong. It handles a large redesign by breaking it into focused stories like search, error handling, typography, and people cards.

## 5. Convert research into decisions
Research is only useful on the page when it changes the design.

- Show the input.
- Show the insight.
- Show the product decision that followed.

Use this pattern:
- `We learned X`
- `This meant Y was not working`
- `So we changed Z`

Avoid long research sections that show effort without showing consequence.

## 6. Use proof at multiple levels
Not every project has launch metrics, but every strong case study has evidence.

Possible proof types:
- usage or adoption metrics
- task success or usability validation
- coded feedback themes
- observed behavioral patterns
- constraints from engineering or platform realities
- direct user quotes

Oishee Sen's case study works well because it mixes shipped scale, research insights, and validation feedback instead of relying on one kind of proof.

## 7. Show trade-offs and constraints
This is what separates polished student work from credible product thinking.

- State what constraint shaped the design.
- Name what you did not optimize for.
- Explain the trade-off explicitly.

Examples:
- contextual results over purely global search
- adoptability over a more ambitious service overhaul
- less captured memory for more privacy

If the work never acknowledges constraints, it feels less believable.

## 8. Balance strategy with concrete product detail
Strategic language helps only when grounded in specifics.

- Use business framing when it is real.
- Pair every abstract argument with a concrete artifact, interface choice, or implementation reality.
- Don't let the writing float above the product.

Rachel's case study is strongest when it becomes concrete about privacy and hardware constraints.
Oishee's is strongest when it shows actual UI decisions, platform behavior, and shipped edge cases.

## 9. Design for skimming
Assume someone will give the page 30 to 60 seconds on a first pass.

- Keep paragraphs short.
- Prefer bullets for grouped insights.
- Use captions and subheads to anchor visuals.
- Put the highest-signal content first.

A skim reader should be able to find:
- the problem
- the proposed direction
- the evidence
- the trade-off
- the outcome

## 10. Let visuals do real work
Images should carry meaning, not just decorate the page.

- Pair every major decision with a visual artifact.
- Use visuals to clarify flows, comparisons, or system behavior.
- Caption visuals with the takeaway, not just the artifact name.

Good caption:
- `People are a common pivot in search, so zero-query starts with frequent contacts`

Weak caption:
- `Search mockup`

## 11. End by proving judgment
The ending should not just say what you made. It should show why your thinking is trustworthy.

Good endings focus on:
- what changed
- what the work proved
- what would be measured next
- how the final decision reduced risk or improved clarity

If there are no hard business metrics, end with decision quality, feasibility, readiness, or system impact.

## 12. Avoid these failure modes

- Don't write the case study like a chronological class report.
- Don't dump every workshop artifact into the page.
- Don't use strategic vocabulary without a solid argument underneath it.
- Don't let research sit on the page without a linked decision.
- Don't make every section equally important.
- Don't end with vague reflections when you can end with proof or judgment.

## Practical Standard

If someone scrolls quickly through your page, they should be able to answer these questions in under a minute:

- What was at stake?
- What did you change?
- Why was that direction right?
- What evidence shaped the work?
- What constraint or trade-off mattered?
- What happened after the change?
- Why should I trust your judgment?

## 13. Show then tell — visuals lead, text explains

From Perry Wang's work: put the figure, screenshot, or diagram first. Let the reader look at it, then explain what they're seeing. Reversing this (explaining first, then showing) makes the reader do extra work.

## 14. Pair before/after for every problem you name

Don't just describe the current state or just show the solution. Show both together so the improvement is legible. Perry's case studies do this consistently — each module gets an explicit "before" and an explicit "after," often in the same frame.

## 15. Include what you abandoned and why

Rejected approaches are not failures to hide. They show judgment. Rachel cut a game simulation feature from PokerGPT's MVP and explains why. Perry documents layouts and flows that didn't make the cut. A reader who only sees the final decision can't tell if it was the only option or the right one.

## 16. Use casual framing for hard topics

The goal is to be readable, not to sound serious. Perry writes "You gotta start somewhere" in a section about a complex firmware problem. Rachel says "I didn't know how to play poker, so I learned." This doesn't undermine credibility — it makes the work easier to follow.

## 17. Let numbers carry weight without dramatizing them

You don't need to frame a statistic as surprising or alarming. "1M+ controllers updated" does the work on its own. "9.35M monthly visits vs. 37.92M" tells the story. State the number, let the reader do the math.

## 18. Name sections for what they are, not what you want them to mean

Avoid editorial chapter names that interpret findings before the reader gets to them. "Technical SEO," "Keyword Coverage," "Social Performance" are better than "The Wall," "The Void," or "The Echo Chamber." Plain names respect the reader.

## 19. Describe what you did before describing what you found

Open each section with method or action, not conclusion. "We crawled the site using Screaming Frog and found..." beats "Alo's site is largely invisible to search engines." The second is a verdict. The first earns it.

## References

- Rachel Chen, OpenAI/Tomo: https://www.rachelchen.tech/projects/openai
- Rachel Chen, PokerGPT: https://www.rachelchen.tech/projects/pokergpt
- Perry Wang, Test Hub Next: https://perryw-2023.webflow.io/test-hub-next
- Perry Wang, Stadia Bluetooth: https://perryw-2023.webflow.io/stadia-bluetooth
- Oishee Sen, Outlook Mobile Web: https://oisheesen.webflow.io/work/outlookmobileweb

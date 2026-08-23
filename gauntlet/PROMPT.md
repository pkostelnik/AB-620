# Gauntlet Loop Prompt — AB-620 Learning Website

## Quality Bar

Real screenshots of a live, highly-rated Coursera course page (module navigation,
quiz UI, progress tracking) as the blind side-by-side comparison target.

**In one sentence:** Real Coursera course-page screenshots serve as the visual/UX
bar for blind side-by-side comparison by a separate critic sub-agent.

## The Prompt

I want you to build a learning website for the Microsoft AB-620 exam at the level
of the best Coursera courses — utterly polished, clear, and genuinely effective
for learning.

Fan out sub-agents and have each one tackle a piece individually. You should /loop
on each piece and have a separate sub-agent check it against real screenshots of a
live, highly-rated Coursera course page, side by side, blind. That separate
sub-agent should be a really harsh critic.

Don't stop until each sub-agent is utterly wowed compared with the real Coursera
course. Maintain a simple live progress page showing the work evolving over time.
/loop until it's utterly perfect. Fan out sub-agents and ultracode.

## Context: Current State of the AB-620 Site (as of this branch)

- 157 sourced learning items across 19 sub-topics, 3 exam domains
  (Plan and configure agent solutions 30-35%, Integrate and extend agents in
  Copilot Studio 40-45%, Test and manage agents 20-25%)
- Guided presenter mode: domain accordion -> overview -> card-by-card
  (Next/Back/Overview), upper 2/3 explanation + lower 1/3 source citation
- Exam simulator: 75-question bank, 30 questions/run, 45 min, pass at 700/1000
- 5 hands-on labs
- Fluent 2 design system, 3 themes (light/dark/high-contrast), WCAG 2.1 AA
- Live deployments: https://snat.ovh/AB-620/ and
  https://pkostelnik.github.io/AB-620/
- Automated QA suite: qa/qa_live_test.js (jsdom-based real DOM/JS test),
  currently 30-32 checks passing

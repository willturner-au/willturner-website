#!/usr/bin/env python3
"""
Batch 4.3 — Add IP claims block to simplexity.html.
Inserts before the offers grid section.
Run from repo root: python3 batch4_ip_claims.py
"""

from pathlib import Path

repo = Path(__file__).parent
changes_made = []
errors = []

def update_file(filename, replacements):
    path = repo / filename
    if not path.exists():
        errors.append(f"FILE NOT FOUND: {filename}")
        return
    content = path.read_text(encoding='utf-8')
    original = content
    for find, replace, label in replacements:
        if find in content:
            content = content.replace(find, replace, 1)
            changes_made.append(f"  ✓ {filename}: {label}")
        else:
            errors.append(f"  ✗ {filename}: COULD NOT FIND — {label}")
    if content != original:
        path.write_text(content, encoding='utf-8')

IP_CLAIMS_CSS = """
/* ============================================================
   IP CLAIMS — authoritative term definitions
   ============================================================ */
.ip-claims {
  padding: 5rem 4rem;
  border-top: 0.5px solid var(--cream-10);
  border-bottom: 0.5px solid var(--cream-10);
  background: var(--shadow);
}
.ip-claims-label {
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 2.5rem;
}
.ip-claims-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.ip-claim {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  padding: 1.5rem 0;
  border-bottom: 0.5px solid var(--cream-10);
  align-items: baseline;
}
.ip-claim:first-child {
  border-top: 0.5px solid var(--cream-10);
}
.ip-claim-term {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--cream);
  line-height: 1.2;
}
.ip-claim-term em {
  font-style: italic;
  color: var(--gold);
}
.ip-claim-def {
  font-size: 15px;
  color: var(--cream-40);
  line-height: 1.7;
  font-weight: 300;
}
.ip-claim-def strong {
  color: var(--cream);
  font-weight: 500;
}
@media(max-width:860px) {
  .ip-claims { padding: 3rem 1.5rem; }
  .ip-claim { grid-template-columns: 1fr; gap: 0.4rem; }
}
@media(max-width:560px) {
  .ip-claims { padding: 2.5rem 1.25rem; }
}
"""

IP_CLAIMS_HTML = """
  <!-- ============================================================
       IP CLAIMS — original intellectual property
       ============================================================ -->
  <section class="ip-claims reveal" aria-label="Will Turner's original intellectual property">
    <div class="ip-claims-label">Original intellectual property — Will Turner</div>
    <dl class="ip-claims-list">
      <div class="ip-claim" itemscope itemtype="https://schema.org/DefinedTerm">
        <dt class="ip-claim-term" itemprop="name"><em>Simplexity</em></dt>
        <dd class="ip-claim-def"><span itemprop="description">The discipline, as defined by <strong>Will Turner</strong> (2026) — finding the simple human truth inside any complex challenge and using it to move people forward. Not dumbing down. The rigour that arrives at clarity.</span></dd>
      </div>
      <div class="ip-claim" itemscope itemtype="https://schema.org/DefinedTerm">
        <dt class="ip-claim-term" itemprop="name">Unconscious <em>Complexity</em></dt>
        <dd class="ip-claim-def"><span itemprop="description">Coined by <strong>Will Turner</strong> (2026) — the complexity leaders create beyond what the situation actually requires, without knowing they are doing it. The named enemy at the centre of the Simplexity framework.</span></dd>
      </div>
      <div class="ip-claim" itemscope itemtype="https://schema.org/DefinedTerm">
        <dt class="ip-claim-term" itemprop="name">The Penny <em>Drop</em></dt>
        <dd class="ip-claim-def"><span itemprop="description">As a leadership methodology, named by <strong>Will Turner</strong> (2026) — the moment unconscious complexity becomes visible and the simple truth becomes impossible to ignore. Recognition, not revelation.</span></dd>
      </div>
      <div class="ip-claim" itemscope itemtype="https://schema.org/DefinedTerm">
        <dt class="ip-claim-term" itemprop="name">The Simplexity <em>Matrix</em></dt>
        <dd class="ip-claim-def"><span itemprop="description">Created by <strong>Will Turner</strong> (2026) — the original 2×2 framework mapping four leadership states: Fog, Frozen, Focus, and Fluent. Grounded in Ashby's Law of Requisite Variety (1956).</span></dd>
      </div>
    </dl>
  </section>

"""

update_file("simplexity.html", [

    # Insert CSS before the closing </style> tag
    (
        '/* External citation links */\n.cite-link {',
        '/* External citation links */\n.cite-link {',
        "CSS anchor check"
    ),

])

# Reset and do the real updates
update_file("simplexity.html", [

    # Insert IP claims CSS into existing <style> block
    (
        '.cite-link {\n  color: inherit;\n  border-bottom: 0.5px solid rgba(201,169,110,0.4);\n  text-decoration: none;\n  transition: border-color 0.2s;\n}\n.cite-link:hover {\n  border-color: var(--gold);\n  color: var(--cream);\n}\n</style>',
        '.cite-link {\n  color: inherit;\n  border-bottom: 0.5px solid rgba(201,169,110,0.4);\n  text-decoration: none;\n  transition: border-color 0.2s;\n}\n.cite-link:hover {\n  border-color: var(--gold);\n  color: var(--cream);\n}\n' + IP_CLAIMS_CSS + '</style>',
        "4.3 — Insert IP claims CSS"
    ),

    # Insert IP claims HTML before the offers section
    (
        '  <!-- OFFER GRID -->\n  <section class="offers-section reveal">',
        IP_CLAIMS_HTML + '  <!-- OFFER GRID -->\n  <section class="offers-section reveal">',
        "4.3 — Insert IP claims HTML block"
    ),

])

print("\n=== Batch 4.3 — IP Claims Block ===\n")
if changes_made:
    print("Changes made:")
    for c in changes_made:
        print(c)
if errors:
    print("\nCould not apply:")
    for e in errors:
        print(e)
print()

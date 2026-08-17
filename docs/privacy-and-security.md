# Privacy and security baseline

> [French translation](fr/privacy-and-security.md) — English remains the canonical documentation.

Security and privacy are `VALIDÉ` phase-zero product constraints. The controls below are product guardrails; they do not claim that the repository already implements them.

## Data classification

| Level | Examples |
| --- | --- |
| `PUBLIC` | Public product specifications |
| `INTERNAL` | Operational metadata |
| `PERSONAL` | Owned equipment |
| `SENSITIVE` | Address or household details |
| `HIGHLY_SENSITIVE` | Salary, debts, exact location, financial documents |

## Validated guardrails

- A clear purpose is required for each personal-data category or field used by a decision.
- Sensitive contexts remain optional and require appropriate consent. The detailed consent model, including whether consent is managed per purpose or per field, remains `ENVISAGÉ` / `À DÉCIDER`.
- Data minimisation and field-level visibility, including within households.
- TLS in transit, encryption at rest, and encrypted backups are validated objectives.
- Additional application-level encryption for highly sensitive data is `ENVISAGÉ` and may be used when it adds real protection; its necessity, scope, and technologies remain to be determined during later scoping.
- Least privilege, deny-by-default server-side authorization, MFA, rate limiting, session revocation, and sensitive-event auditing.
- No unnecessary exposure of sensitive data in URLs, logs, analytics, crash reports, telemetry, or error messages.
- Avoid unnecessary storage of highly sensitive data in clear text in `localStorage`, `sessionStorage`, `IndexedDB`, or cookies accessible to JavaScript.
- No repository, frontend, documentation, or logs may contain secrets.
- Export and deletion capabilities, including retention-aware secondary-copy deletion.

The system should be resilient to partial compromise: a compromise of one layer must not automatically reveal the user's entire context. The associated guardrails are separation of responsibilities, isolation and segmentation, least privilege, encryption, secret rotation, and access limitation. These are security requirements, not evidence of an implemented architecture.

## No Trust by Default

The system must not automatically trust the frontend, URL parameters, client-supplied identifiers, provider data, AI-extracted data, uploads, or client metadata. Authorization must be checked server-side. No authentication or security technology is selected by this document.

## AI privacy boundary — `ENVISAGÉ`

Any future LLM call should pass through classification, minimisation, redaction, and pseudonymisation. It must not automatically receive salaries, debts, banking data, exact addresses, precise locations, fiscal documents, or secrets. A named `AI Security Gateway` is `ENVISAGÉ`, not an implemented component.

## Security review loop — `VALIDÉ` process direction

Features touching financial profiles, location, households, identity, or documents require: implement → test → security review → privacy/data-leak review → fix → retest → second review.

A permanent security, privacy, and data-leak reviewer is a `VALIDÉ` process requirement for sensitive development. The automation framework and notification mechanism remain `À DÉCIDER`.

Reviews cover authentication, authorization/IDOR, logs, API responses, caches, browser storage, backups, analytics, error handling, uploads, exports, shared households, LLM calls, provider integrations, secret scanning, dependencies, input validation, and API security.

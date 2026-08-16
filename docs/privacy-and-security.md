# Privacy and security baseline

## Data classification

| Level | Examples |
| --- | --- |
| `PUBLIC` | Public product specifications |
| `INTERNAL` | Operational metadata |
| `PERSONAL` | Owned equipment |
| `SENSITIVE` | Address or household details |
| `HIGHLY_SENSITIVE` | Salary, debts, exact location, financial documents |

## Non-negotiable controls

- Explicit consent and a clear purpose for every personal-data field.
- Data minimisation and field-level visibility, including within households.
- TLS in transit, encryption at rest, encrypted backups, and appropriate application-level encryption for highly sensitive data.
- Least privilege, deny-by-default server-side authorization, MFA, rate limiting, session revocation, and sensitive-event auditing.
- No sensitive data in URLs, client-readable browser storage, logs, analytics, crash reports, telemetry, or error messages.
- No repository, frontend, documentation, or logs may contain secrets.
- Export and deletion capabilities, including retention-aware secondary-copy deletion.

## AI Privacy Gateway

Any future LLM call must pass through classification, minimisation, redaction, and pseudonymisation. It must not automatically receive salaries, debts, banking data, exact addresses, precise locations, fiscal documents, or secrets.

## Security review loop

Features touching financial profiles, location, households, identity, or documents require: implement → test → security review → privacy/data-leak review → fix → retest → second review.

Reviews cover authentication, authorization/IDOR, logs, API responses, caches, browser storage, backups, analytics, error handling, uploads, exports, shared households, LLM calls, provider integrations, secret scanning, dependencies, input validation, and API security.

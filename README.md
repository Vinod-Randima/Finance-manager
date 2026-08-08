# Finance Manager

A modular, responsive Personal Finance Manager built with HTML5, CSS3 and vanilla JavaScript.

## Features

- Dashboard with income, expenses, savings, loans, budgets and goals
- Salary calculator using the requested wage rules
- Work calendar with worked/off/holiday/salary-day statuses
- Expense tracking and categories
- Savings and financial goals
- Borrowed/lent money tracking
- Contacts
- Monthly budgets
- Master transaction ledger with search/filter
- Reports and CSV export
- JSON backup/restore
- Light/dark mode
- LocalStorage persistence
- PWA manifest and service worker

## Run

For full PWA/offline behavior, serve the folder through a local HTTP server instead of opening `index.html` directly.

Example:

    python -m http.server 8000

Then open `http://localhost:8000`.

## Notes

The app is local-first: data is stored in the browser's LocalStorage. Receipt image attachment is intentionally left as a future extension point so the core app stays lightweight.


## Windows quick start

1. Extract the ZIP completely to a normal folder.
2. Double-click `START_FINANCE_MANAGER.bat`.
3. Open `http://localhost:8000` in Chrome.

Do not open `index.html` from inside the ZIP archive. The browser needs the `css`, `js`, `assets`, manifest and service-worker files beside it.

For the simplest option, you can also use `FinanceManager-Standalone.html`, which works by double-clicking the file (PWA offline installation is not available in standalone file mode).

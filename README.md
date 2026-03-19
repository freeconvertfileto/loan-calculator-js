# Loan Calculator

Calculate monthly loan payments, total interest, and a full amortization schedule using the standard PMT formula, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/calculators/loan-calculator-online

## How It Works

The monthly payment is computed with the standard PMT formula: `payment = P * (r * (1+r)^n) / ((1+r)^n - 1)`, where `P` is the principal, `r` is the monthly interest rate (`annualRate / 12 / 100`), and `n` is the total number of monthly payments (`years * 12`). Total cost is `payment * n` and total interest is `totalCost - P`. The amortization schedule iterates month by month: interest portion is `balance * r`, principal portion is `payment - interestPortion`, and the balance decreases by the principal portion each month until it reaches zero.

## Features

- PMT formula: `P * (r*(1+r)^n) / ((1+r)^n - 1)`
- Monthly payment, total payment, and total interest summary
- Full amortization schedule table (month, payment, principal, interest, balance)
- Handles zero-interest loans (simple division fallback)

## Browser APIs Used

- (No external APIs — pure DOM arithmetic)

## Code Structure

| File | Description |
|------|-------------|
| `loan-calculator.js` | PMT formula, total cost/interest, month-by-month amortization schedule table |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#lncPrincipal` | Loan amount input |
| `#lncRate` | Annual interest rate input |
| `#lncYears` | Loan term in years |
| `#lncCalc` | Calculate button |
| `#lncMonthly` | Monthly payment display |
| `#lncTotal` | Total payment display |
| `#lncInterest` | Total interest display |
| `#lncSchedule` | Amortization schedule table |

## License

MIT

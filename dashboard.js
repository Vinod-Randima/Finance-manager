function dashboardView(){
 const m=monthKey(today()), ex=state.expenses.filter(x=>monthKey(x.date)===m), inc=state.transactions.filter(x=>x.type==="income"&&monthKey(x.date)===m);
 const expenses=sum(ex,"amount"), income=sum(inc,"amount")+salaryForMonth(m), savings=Math.max(0,income-expenses);
 const activeLoans=state.loans.filter(x=>x.status!=="Paid"), lent=state.lent.filter(x=>x.status!=="Received");
 const budget=state.budgets.filter(x=>x.month===m), budgetTotal=sum(budget,"amount"), spentBudget=budget.reduce((t,b)=>t+ex.filter(e=>e.category===b.category).reduce((s,e)=>s+Number(e.amount),0),0);
 const recent=[...state.transactions].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
 const goals=state.goals.slice(0,4);
 return `<div class="dashboard-head"><div><span class="eyebrow">Financial overview</span><h2>Good evening 👋</h2><p class="subtext">Your money at a glance for ${monthName(m)}.</p></div><button class="btn primary" data-action="add-expense">＋ Add Expense</button></div>
 <div class="grid grid-4">
  ${metric("Monthly Income",money(income),"↗","positive","Salary + income")}
  ${metric("Monthly Expenses",money(expenses),"↘","negative",`${ex.length} transactions`)}
  ${metric("Monthly Savings",money(savings),"◈","positive",income?`${Math.round(savings/income*100)}% savings rate`:"—")}
  ${metric("Remaining Balance",money(income-expenses),"¥",income-expenses>=0?"positive":"negative","After expenses")}
 </div>
 <div class="split section-gap">
  <div class="card hero-card"><span class="eyebrow">Available balance</span><div class="hero-amount">${money(income-expenses)}</div><div class="muted">Estimated after this month's recorded expenses.</div><div class="mini-stats"><div><small>Active loans</small><b>${activeLoans.length}</b></div><div><small>Money lent</small><b>${money(sum(lent,"amount"))}</b></div><div><small>Budget used</small><b>${budgetTotal?Math.round(spentBudget/budgetTotal*100):0}%</b></div></div></div>
  <div class="card"><div class="card-header"><h3>Budget status</h3><span class="pill">${budget.length} categories</span></div><div class="metric-value">${money(Math.max(0,budgetTotal-spentBudget))}</div><p class="muted">budget remaining</p><div class="progress" style="margin-top:18px"><i style="width:${pct(spentBudget,budgetTotal)}%"></i></div><p class="row-meta" style="margin-top:8px">${money(spentBudget)} spent of ${money(budgetTotal)}</p></div>
 </div>
 <div class="dashboard-two section-gap">
  <div class="card"><div class="card-header"><h3>Recent transactions</h3><button class="btn small" data-view="transactions">View all</button></div><div class="list">${recent.length?recent.map(tx=>transactionRow(tx)).join(""):`<div class="empty">No transactions yet.</div>`}</div></div>
  <div class="card"><div class="card-header"><h3>Financial goals</h3><button class="btn small" data-view="goals">Manage</button></div>${goals.length?goals.map(g=>`<div class="goal-item"><div class="goal-head"><span>${esc(g.name)}</span><b>${Math.round(pct(g.saved,g.target))}%</b></div><div class="progress"><i style="width:${pct(g.saved,g.target)}%"></i></div><div class="row-meta">${money(g.saved)} of ${money(g.target)}</div></div>`).join(""):`<div class="empty">Create your first financial goal.</div>`}</div>
 </div>`;
}
function metric(label,value,icon,cls,sub){return `<div class="card metric-card fade-up"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><div class="metric-value">${value}</div><div class="metric-change ${cls}">${sub}</div></div>`}
function transactionRow(tx){const cls=["income","money received","loan repaid"].includes(tx.type)?"positive":"negative";return `<div class="list-row"><div class="row-left"><div class="round-icon">${tx.type==="income"?"↗":"↘"}</div><div><div class="row-title">${esc(tx.description||tx.category||tx.type)}</div><div class="row-meta">${dateFmt(tx.date)} · ${esc(tx.category||tx.type)}</div></div></div><div class="amount ${cls}">${["income","money received","loan repaid"].includes(tx.type)?"+":"-"}${money(tx.amount)}</div></div>`}
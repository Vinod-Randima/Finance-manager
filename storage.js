const DEFAULT_STATE={
 settings:{nightWage:1471,morningWage:1200,breakMinutes:70,overtimeMinutes:10,currency:"JPY",theme:"light"},
 salary:{schedule:{Mon:{start:"00:00",end:"06:00"},Tue:{start:"00:00",end:"06:00"},Thu:{start:"22:00",end:"06:00"},Sun:{start:"22:00",end:"06:00"}},workDays:{}},
 expenses:[], loans:[], lent:[], contacts:[], budgets:[], goals:[], transactions:[],
 savings:{current:0,monthly:0,target:0}
};
const clone=o=>JSON.parse(JSON.stringify(o));
const loadState=()=>{try{const raw=localStorage.getItem("financeManagerState"); return raw?Object.assign(clone(DEFAULT_STATE),JSON.parse(raw)):clone(DEFAULT_STATE)}catch(e){return clone(DEFAULT_STATE)}};
let state=loadState();
function normalizeState(){for(const k of Object.keys(DEFAULT_STATE)){if(state[k]===undefined)state[k]=clone(DEFAULT_STATE[k])} if(!state.settings)state.settings=clone(DEFAULT_STATE.settings)}
function saveState(){normalizeState();localStorage.setItem("financeManagerState",JSON.stringify(state));}
function resetState(){state=clone(DEFAULT_STATE);saveState();}
function exportState(){return JSON.stringify(state,null,2)}
function importState(raw){const incoming=typeof raw==="string"?JSON.parse(raw):raw; state=Object.assign(clone(DEFAULT_STATE),incoming);saveState();}
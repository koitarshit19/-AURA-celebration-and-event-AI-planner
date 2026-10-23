import { useEffect } from 'react'

export default function Budget() {
  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    (function () {
          const modal = document.getElementById('expenseModal');
          const openBtn = document.getElementById('openExpenseModalBtn');
          const closeBtn = document.getElementById('closeExpenseModalBtn');
          const cancelBtn = document.getElementById('cancelExpenseModalBtn');
          const submitBtn = document.getElementById('submitExpenseBtn');
          const acceptFlowerSavingsBtn = document.getElementById('acceptFlowerSavingsBtn');
          const tipFlowerCard = document.getElementById('tipFlowerCard');

          function openModal() {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
          }

          function closeModal() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
          }

          if (openBtn) openBtn.addEventListener('click', openModal);
          if (closeBtn) closeBtn.addEventListener('click', closeModal);
          if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

          if (modal) {
            modal.addEventListener('click', function(e) {
              if (e.target === modal) closeModal();
            });
          }

          if (submitBtn) {
            submitBtn.addEventListener('click', function() {
              submitBtn.textContent = 'Processing OCR...';
              setTimeout(function() {
                submitBtn.textContent = 'Committed!';
                setTimeout(function() {
                  closeModal();
                  submitBtn.textContent = 'Commit to Ledger';
                }, 700);
              }, 800);
            });
          }

          if (acceptFlowerSavingsBtn && tipFlowerCard) {
            acceptFlowerSavingsBtn.addEventListener('click', function() {
              acceptFlowerSavingsBtn.disabled = true;
              acceptFlowerSavingsBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span> Applied';
              acceptFlowerSavingsBtn.classList.remove('bg-secondary-fixed', 'text-on-secondary-fixed');
              acceptFlowerSavingsBtn.classList.add('bg-emerald-500/20', 'text-emerald-400');
              tipFlowerCard.classList.add('opacity-80');
            });
          }
        })();
  }, [])

  return (
      <>
      <div className="flex flex-col w-full">
        <div className="max-w-7xl mx-auto w-full px-margin-sm lg:px-margin py-space-lg flex flex-col gap-space-xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping"></span>
                  {' '}
                  Real-Time Escrow Active
                </span>
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                  Protocol 0x89A · Luminary Vault
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Financial Ledger
                {' '}
                <span className="text-outline-variant font-light">
                  &
                </span>
                {' '}
                Procurement Engine
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Algorithmic allocation tracking, automated contractual disbursements, and predictive vendor savings for Julian & Maya's Autumn Gala.
              </p>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container-high/80 text-on-surface hover:text-secondary-fixed hover:bg-surface-container-highest transition-all shadow-md group" id="downloadReportBtn">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-secondary-fixed transition-colors">
                  description
                </span>
                <span className="font-label-lg text-label-lg">
                  Export Statement
                </span>
              </button>
              <button className="relative group flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-lg text-label-lg shadow-[0_0_24px_rgba(192,193,255,0.25)] hover:shadow-[0_0_32px_rgba(192,193,255,0.45)] active:scale-[0.985] transition-all" id="openExpenseModalBtn">
                <span className="material-symbols-outlined text-[20px]">
                  add_circle
                </span>
                <span>
                  Add Expense
                </span>
                <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded bg-black/20 font-label-caps uppercase">
                  OCR Sync
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low/70 p-6 shadow-xl flex flex-col justify-between">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Total Allocated Capital
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                      $48,250
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      / $75,000
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    account_balance_wallet
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex justify-between items-center font-label-md text-label-md">
                  <span className="text-secondary-fixed">
                    64.3% Cap Utilization
                  </span>
                  <span className="text-outline">
                    Within Target Envelope
                  </span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ "width": "64.3%" }}></div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low/70 p-6 shadow-xl flex flex-col justify-between">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                    Unallocated Reserve
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-headline-xl text-headline-xl text-secondary-fixed tracking-tight">
                      $26,750
                    </span>
                    <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase bg-secondary-container/40 px-2 py-0.5 rounded">
                      Liquid
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary-fixed shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    shield_with_heart
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between font-label-md text-label-md text-on-surface-variant pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {' '}
                  Contingency Buffer Safe
                </span>
                <span className="text-on-surface font-semibold">
                  35.7% Discretionary
                </span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low/70 p-6 shadow-xl flex flex-col justify-between">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-tertiary-container/15 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider">
                    Aura Algorithmic Yield
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-headline-xl text-headline-xl text-tertiary tracking-tight">
                      $8,400
                    </span>
                    <span className="font-label-md text-label-md text-emerald-400 font-medium">
                      (+11.2% Eff.)
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    savings
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between font-label-md text-label-md">
                <span className="text-on-surface-variant">
                  3 Active Contract Reductions
                </span>
                <span className="text-secondary-fixed underline cursor-pointer hover:opacity-80">
                  Audit Audit Log
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    donut_large
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Category Allocations
                  </h2>
                </div>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                  Updated 4m ago
                </span>
              </div>
              <div className="flex flex-col gap-space-sm bg-surface-container-low/50 p-6 rounded-xl shadow-lg">
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        villa
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Venue & Grounds
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase bg-primary-container/20 text-primary">
                        Locked Escrow
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                        $28,000
                      </span>
                      <span className="font-body-sm text-body-sm text-outline-variant">
                        / $28,000
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                    <div className="bg-secondary-fixed h-full rounded-full" style={{ "width": "100%" }}></div>
                  </div>
                  <div className="flex justify-between items-center text-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    <span>
                      Villa Montalvo Estate Contract
                    </span>
                    <span className="text-secondary-fixed font-medium">
                      100% Fully Disbursed
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        restaurant
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Food & Culinary Service
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase bg-secondary-container/40 text-secondary-fixed">
                        Buffering
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                        $18,500
                      </span>
                      <span className="font-body-sm text-body-sm text-outline-variant">
                        / $22,000
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full rounded-full" style={{ "width": "84.1%" }}></div>
                  </div>
                  <div className="flex justify-between items-center text-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    <span>
                      Alinea Bespoke Catering ($3,500 Buffer Remains)
                    </span>
                    <span className="text-primary font-medium">
                      84.1% Committed
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-tertiary">
                        local_florist
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Florals & Decor
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase bg-surface-container-highest text-on-surface-variant">
                        Committed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                        $12,000
                      </span>
                      <span className="font-body-sm text-body-sm text-outline-variant">
                        / $12,000
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                    <div className="bg-tertiary h-full rounded-full" style={{ "width": "100%" }}></div>
                  </div>
                  <div className="flex justify-between items-center text-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    <span>
                      St. Helena Botanicals Art Installations
                    </span>
                    <span className="text-tertiary font-medium">
                      100% Contracted
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        theater_comedy
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Entertainment & Production
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                        $8,500
                      </span>
                      <span className="font-body-sm text-body-sm text-outline-variant">
                        / $9,500
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                    <div className="bg-primary-container h-full rounded-full" style={{ "width": "89.4%" }}></div>
                  </div>
                  <div className="flex justify-between items-center text-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    <span>
                      Sonder Sounds & Nightfall Quartet
                    </span>
                    <span className="text-primary-fixed-dim font-medium">
                      89.4% Spent
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
                        photo_camera
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Photography & Film
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase bg-primary-container/20 text-primary">
                        Locked
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                        $8,000
                      </span>
                      <span className="font-body-sm text-body-sm text-outline-variant">
                        / $8,000
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                    <div className="bg-secondary h-full rounded-full" style={{ "width": "100%" }}></div>
                  </div>
                  <div className="flex justify-between items-center text-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    <span>
                      Lumière Cinema Collective (2 Master Operators)
                    </span>
                    <span className="text-secondary font-medium">
                      100% Fixed
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                        savings
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Contingency & Gratuities
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase bg-emerald-500/20 text-emerald-400">
                        50% Reserved
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                        $2,500
                      </span>
                      <span className="font-body-sm text-body-sm text-outline-variant">
                        / $5,000
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                    <div className="bg-outline text-surface h-full rounded-full" style={{ "width": "50%" }}></div>
                  </div>
                  <div className="flex justify-between items-center text-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    <span>
                      Protocol Safe Harbor Reserve
                    </span>
                    <span className="text-on-surface-variant font-medium">
                      $2,500 Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                    auto_awesome
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Strategic Intelligence
                  </h2>
                </div>
                <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                  Aura Optimization
                </span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="p-5 rounded-xl bg-surface-container-low/70 shadow-lg relative overflow-hidden flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Consolidate Sound & Lighting
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-label-caps text-label-caps font-bold tracking-wider uppercase shrink-0">
                      Saved $1,400
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Sonder Sounds bundle negotiation was executed automatically. Single-rig staging reduced independent labor rates and eliminated duplicate truss fees.
                  </p>
                  <div className="flex items-center justify-between text-body-sm text-outline pt-1">
                    <span className="flex items-center gap-1 font-label-caps uppercase">
                      <span className="material-symbols-outlined text-[14px] text-emerald-400">
                        verified
                      </span>
                      {' '}
                      Contract Amended & Signed
                    </span>
                    <span className="text-secondary-fixed-dim">
                      Status: Applied
                    </span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-surface-container-high/60 shadow-xl relative overflow-hidden flex flex-col gap-3 transition-all" id="tipFlowerCard">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary-fixed shrink-0">
                        <span className="material-symbols-outlined text-[16px]">
                          schedule
                        </span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Off-Peak Flower Delivery
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-secondary-container/50 text-secondary-fixed font-label-caps text-label-caps font-bold tracking-wider uppercase shrink-0">
                      Save $650
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Scheduling
                    {' '}
                    <strong className="text-on-surface">
                      St. Helena Botanicals
                    </strong>
                    {' '}
                    delivery at 08:30 AM rather than 11:00 AM avoids regional transit congestion surcharges and dock holding fees.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-body-sm text-body-sm text-outline">
                      Action expires in 18 hrs
                    </span>
                    <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim active:scale-95 transition-all shadow-md" id="acceptFlowerSavingsBtn">
                      <span className="material-symbols-outlined text-[16px]">
                        done
                      </span>
                      <span>
                        1-Click Accept
                      </span>
                    </button>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-surface-container-low/70 shadow-lg relative overflow-hidden flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-[16px]">
                          wine_bar
                        </span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Wine Consignment Policy
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-primary-container/20 text-primary font-label-caps text-label-caps font-bold tracking-wider uppercase shrink-0">
                      Potential $1,200
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Meadowwood Cellars consignment terms authorize returns of sealed, cellared reserves with zero restocking penalty. Aura will schedule cellar return logistically on T+1.
                  </p>
                  <div className="flex items-center justify-between text-body-sm pt-1">
                    <span className="text-outline font-label-caps uppercase">
                      Auto-Track Activated
                    </span>
                    <a className="text-primary hover:underline font-label-md text-label-md" href="#">
                      Inspect Rider →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-space-md mt-space-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[22px]">
                    gavel
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Escrow Disbursal & Contract Ledger
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Cryptographically sealed milestone disbursements and automated vendor retention guarantees.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto bg-surface-container p-1 rounded-xl shadow-inner">
                <button className="px-3 py-1.5 rounded-lg bg-surface-container-highest text-primary font-label-md text-label-md shadow-sm">
                  All Ledger
                </button>
                <button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
                  Protected (Escrow)
                </button>
                <button className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
                  Released
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-auto rounded-xl bg-surface-container-low/70 shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-surface-container-high/60 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    <th className="py-4 px-5">
                      Execution Date
                    </th>
                    <th className="py-4 px-5">
                      Vendor & Legal Entity
                    </th>
                    <th className="py-4 px-5">
                      Category
                    </th>
                    <th className="py-4 px-5">
                      Contract Milestone
                    </th>
                    <th className="py-4 px-5 text-right">
                      Amount
                    </th>
                    <th className="py-4 px-5 text-center">
                      Escrow Security
                    </th>
                    <th className="py-4 px-5 text-right">
                      Audit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 font-body-md text-body-md">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-4 px-5 text-on-surface-variant whitespace-nowrap">
                      <span className="text-on-surface font-medium">
                        Oct 14, 2025
                      </span>
                      <span className="block text-[11px] text-outline">
                        09:30 PST
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary-fixed">
                          <span className="material-symbols-outlined text-[18px]">
                            domain
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">
                            Villa Montalvo Estate LLC
                          </span>
                          <span className="text-[11px] text-outline">
                            San Jose, CA · Master Lease
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-label-md bg-surface-container text-on-surface-variant">
                        Venue & Grounds
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-on-surface">
                        Final Site Deposit & Curfew Waiver
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-on-surface">
                      $14,000.00
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-label-caps text-label-caps uppercase font-bold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {' '}
                        Released
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors" title="View Verification Hash">
                        <span className="material-symbols-outlined text-[18px]">
                          verified_user
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-4 px-5 text-on-surface-variant whitespace-nowrap">
                      <span className="text-on-surface font-medium">
                        Nov 02, 2025
                      </span>
                      <span className="block text-[11px] text-outline">
                        T-14 Trigger
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[18px]">
                            skillet
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">
                            Alinea Hospitality Group
                          </span>
                          <span className="text-[11px] text-outline">
                            Contract #ALN-8820
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-label-md bg-surface-container text-on-surface-variant">
                        Food & Culinary
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-on-surface">
                        70% Headcount Ingredients Release
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-on-surface">
                      $12,950.00
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase font-bold tracking-wider shadow-[0_0_8px_rgba(192,193,255,0.2)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        {' '}
                        Protected (Escrow)
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors" title="Lock Condition Terms">
                        <span className="material-symbols-outlined text-[18px]">
                          lock
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-4 px-5 text-on-surface-variant whitespace-nowrap">
                      <span className="text-on-surface font-medium">
                        Nov 10, 2025
                      </span>
                      <span className="block text-[11px] text-outline">
                        Pending Delivery
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-[18px]">
                            psychology
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">
                            St. Helena Botanicals
                          </span>
                          <span className="text-[11px] text-outline">
                            Botanical Staging
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-label-md bg-surface-container text-on-surface-variant">
                        Florals & Decor
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-on-surface">
                        Arbor Structural Installation Sign-off
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-on-surface">
                      $6,000.00
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase font-bold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {' '}
                        Protected (Escrow)
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          visibility
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-4 px-5 text-on-surface-variant whitespace-nowrap">
                      <span className="text-on-surface font-medium">
                        Oct 01, 2025
                      </span>
                      <span className="block text-[11px] text-outline">
                        14:22 PST
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[18px]">
                            camera_roll
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">
                            Lumière Cinema Collective
                          </span>
                          <span className="text-[11px] text-outline">
                            Primary Retainer
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-label-md bg-surface-container text-on-surface-variant">
                        Photography
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-on-surface">
                        Booking Lock & Date Exclusivity
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-on-surface">
                      $4,000.00
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-label-caps text-label-caps uppercase font-bold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {' '}
                        Released
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          receipt_long
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-4 px-5 text-on-surface-variant whitespace-nowrap">
                      <span className="text-on-surface font-medium">
                        Nov 18, 2025
                      </span>
                      <span className="block text-[11px] text-outline">
                        Event Execution
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary-container">
                          <span className="material-symbols-outlined text-[18px]">
                            volume_up
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">
                            Sonder Sounds LLC
                          </span>
                          <span className="text-[11px] text-outline">
                            Audio & Atmospheric Lighting
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-label-md bg-surface-container text-on-surface-variant">
                        Entertainment
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-on-surface">
                        Post-Performance Sound Decibel Clearance
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-semibold text-on-surface">
                      $3,500.00
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase font-bold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {' '}
                        Protected (Escrow)
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          lock_clock
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary-fixed shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-[26px]">
                  token
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Autonomous Escrow Guarantee
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Funds in Escrow are secured in insured FDIC-partnered trusts and cannot disburse without biometric host sign-off or fulfilled IoT sensor triggers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase bg-secondary-container/30 px-3 py-1.5 rounded-lg">
                Encryption Standard: AES-256-GCM
              </span>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md hidden items-center justify-center p-4" id="expenseModal">
          <div className="relative w-full max-w-lg rounded-xl bg-surface-container-low p-6 sm:p-8 shadow-[0_24px_48px_rgba(0,0,0,0.8)] border-0 flex flex-col gap-space-md">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                  Fast Procurement
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Add Expense & OCR Ingestion
                </h3>
              </div>
              <button className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" id="closeExpenseModalBtn">
                <span className="material-symbols-outlined text-[22px]">
                  close
                </span>
              </button>
            </div>
            <div className="relative group cursor-pointer flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-surface-container/50 hover:bg-surface-container-high/60 transition-all text-center" id="dropzone">
              <input accept=".pdf,.png,.jpg,.jpeg" className="absolute inset-0 opacity-0 cursor-pointer" id="invoiceFile" type="file" />
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[26px]">
                  document_scanner
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface">
                  Drop invoice or tap to scan
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  Aura AI extracts line items, VAT, and vendor bank keys instantly
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase bg-secondary-container/30 px-2.5 py-0.5 rounded-full mt-1">
                PDF, TIFF, JPEG accepted
              </span>
            </div>
            <form className="flex flex-col gap-space-sm" id="expenseForm" onSubmit={(e) => { e.preventDefault(); }}>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Vendor / Payee Entity
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-outline">
                    business
                  </span>
                  <input className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Vintage Stemware Rentals Co." type="text" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface-variant">
                    Expense Amount ($)
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-outline">
                      attach_money
                    </span>
                    <input className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary" placeholder="2450.00" step="0.01" type="number" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface-variant">
                    Category Envelope
                  </label>
                  <select className="w-full h-11 px-3 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="culinary">
                      Food & Culinary Service
                    </option>
                    <option value="entertainment">
                      Entertainment & Production
                    </option>
                    <option value="florals">
                      Florals & Decor
                    </option>
                    <option value="venue">
                      Venue & Grounds
                    </option>
                    <option value="photo">
                      Photography & Film
                    </option>
                    <option value="contingency">
                      Contingency Reserve
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Escrow Condition / Milestone Trigger
                </label>
                <input className="w-full h-11 px-4 rounded-lg bg-surface-container text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Disburse upon delivery confirmation" type="text" />
              </div>
              <div className="flex items-center justify-end gap-3 mt-4 pt-2">
                <button className="px-4 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-colors" id="cancelExpenseModalBtn" type="button">
                  Cancel
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary shadow-md transition-all" id="submitExpenseBtn" type="submit">
                  Commit to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
  )
}

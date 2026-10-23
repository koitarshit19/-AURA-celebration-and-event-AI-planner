import { useEffect } from 'react'

export default function Concierge() {
  // Original Stitch interactivity (runs once after the page is on screen)
  useEffect(() => {
    (function () {
          const chatForm = document.getElementById('concierge-chat-form');
          const chatInput = document.getElementById('chat-input-field');
          const chatContainer = document.getElementById('chat-messages-container');
          const threadHook = document.getElementById('chat-thread-hook');
          const quickPills = document.querySelectorAll('.chat-quick-pill');
          const callTrigger = document.getElementById('trigger-call-modal');
          const callModal = document.getElementById('call-modal');
          const closeCallBtn = document.getElementById('close-call-modal');
          const copyBtn = document.getElementById('copy-summary-btn');

          // Quick prompt filler
          quickPills.forEach(pill => {
            pill.addEventListener('click', () => {
              const text = pill.getAttribute('data-fill');
              chatInput.value = text;
              chatInput.focus();
            });
          });

          // Submit new directive into chat
          chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const value = chatInput.value.trim();
            if (!value) return;

            // Render client message
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' PST';

            const clientMsgNode = document.createElement('div');
            clientMsgNode.className = 'flex items-start justify-end gap-space-sm max-w-[85%] ml-auto group animate-fade-in';
            clientMsgNode.innerHTML = `
              <div class="space-y-1 flex flex-col items-end">
                <div class="flex items-center gap-2">
                  <span class="font-label-caps text-label-caps text-outline">${timeStr}</span>
                  <span class="font-label-md text-label-md text-primary font-semibold">Julian</span>
                </div>
                <div class="p-4 rounded-xl rounded-tr-sm bg-gradient-to-br from-primary-container/30 to-surface-container-highest text-on-surface font-body-md text-body-md shadow-[0_8px_20px_rgba(0,0,0,0.4)] leading-relaxed">
                  ${escapeHtml(value)}
                </div>
                <span class="font-label-caps text-label-caps text-primary/70 px-1 flex items-center gap-1">
                  Transmitted · Priority Queue
                  <span class="material-symbols-outlined text-[13px] text-primary">done</span>
                </span>
              </div>
              <div class="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 mt-1 shadow-md">
                <span class="material-symbols-outlined text-primary text-[18px]">person</span>
              </div>
            `;
            threadHook.parentNode.insertBefore(clientMsgNode, threadHook);
            chatInput.value = '';
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });

            // Automated Concierge Immediate Receipt Response (Simulated Arthur live response)
            setTimeout(() => {
              const responseNode = document.createElement('div');
              responseNode.className = 'flex items-start gap-space-sm max-w-[85%] group animate-fade-in';
              responseNode.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-surface-container-high shrink-0 mt-1 shadow-md flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary-fixed text-[18px]">support_agent</span>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-label-md text-label-md text-secondary-fixed font-semibold">Arthur Vance</span>
                    <span class="font-label-caps text-label-caps text-outline">Just now</span>
                  </div>
                  <div class="p-4 rounded-xl rounded-tl-sm bg-surface-container-high/80 text-on-surface font-body-md text-body-md shadow-[0_8px_20px_rgba(0,0,0,0.35)] leading-relaxed">
                    Directive received and logged Julian. I am on the field radio with the on-site leads right now to execute this. Will update your action log in under 3 minutes.
                  </div>
                </div>
              `;
              threadHook.parentNode.insertBefore(responseNode, threadHook);
              chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
            }, 1200);
          });

          // Simple HTML sanitize
          function escapeHtml(string) {
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
              return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
              }[s];
            });
          }

          // Modal Triggers
          if (callTrigger && callModal && closeCallBtn) {
            callTrigger.addEventListener('click', () => callModal.classList.remove('hidden'));
            closeCallBtn.addEventListener('click', () => callModal.classList.add('hidden'));
            callModal.addEventListener('click', (e) => {
              if (e.target === callModal) callModal.classList.add('hidden');
            });
          }

          // Copy Action
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              const originalText = copyBtn.innerHTML;
              navigator.clipboard.writeText("Aura Concierge Brief: Arthur Vance active. Heaters certified. St. Helena Botanicals 8:30 drop-off secured. Walk-through 18:15.");
              copyBtn.innerHTML = `<span class="material-symbols-outlined text-[16px] text-secondary">check</span> <span>Brief Copied</span>`;
              setTimeout(() => {
                copyBtn.innerHTML = originalText;
              }, 2000);
            });
          }
        })();
  }, [])

  return (
      <>
      <div className="flex flex-col w-full">
        <div className="relative w-full max-w-7xl mx-auto px-margin-sm lg:px-margin py-space-lg space-y-space-lg">
          <div className="relative rounded-xl p-space-lg bg-surface-container-low/70 backdrop-blur-2xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="space-y-space-xs">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]"></span>
                    {' '}
                    Ultra-Priority Tier
                  </span>
                  <span className="font-body-sm text-body-sm text-outline-variant">
                    •
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Julian & Maya's Autumn Gala
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Aura Private Client Concierge
                </h1>
                <p className="font-body-md text-body-md text-secondary-fixed-dim flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    verified_user
                  </span>
                  {' '}
                  Human Executive Producer on Standby · Dedicated to Julian & Maya's Autumn Gala
                </p>
              </div>
              <div className="flex items-center gap-space-md p-space-sm rounded-xl bg-surface-container-high/60 backdrop-blur-md self-start md:self-auto shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container-highest">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      contactless
                    </span>
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Channel Security
                    </div>
                    <div className="font-headline-sm text-headline-sm text-secondary-fixed">
                      RSA-4096 Enclave
                    </div>
                  </div>
                </div>
                <div className="h-8 w-px bg-surface-variant/70"></div>
                <div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Producer Latency
                  </div>
                  <div className="font-headline-sm text-headline-sm text-primary">
                    54 Seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <div className="relative rounded-xl p-space-lg bg-surface-container-low/80 backdrop-blur-xl shadow-xl overflow-hidden transition-all hover:shadow-[0_20px_40px_-15px_rgba(211,197,168,0.12)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg bg-surface-container">
                        <img className="w-full h-full object-cover" data-alt="Distinguished professional event director Arthur Vance wearing a tailored midnight navy suit in an opulent wine estate cellar with ambient golden backlighting and warm mahogany tones, refined poise, editorial portrait photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS_djOlUNUYO_eAiEHZNDM2shCTv0_Pvq_9plHrtttsiqNmvPGbrDimjQLdbry8gNE-vwLKfjl2escN86paynNMAXCy_d0szz50Dz0tVW6FhGtnXKJ5l0h0_lmOpwagZHaPkCftzZQ6CUXbrg3V9UMKu-6VSm05kBtkNn8ffr7g5WdlZn4HMDd-NempFc9S0Qztm0OnUUBGuxxgUO26mWnK1XJeyD6Dn1HA2NxgvChHuV3QzW9qNR7fA" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-surface-container-highest shadow-md">
                        <span className="material-symbols-outlined text-secondary-fixed text-[14px]" style={{ "fontVariationSettings": "'FILL' 1" }}>
                          verified
                        </span>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                          Arthur Vance
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-wide">
                          Executive Producer
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Senior Event Director & Certified Master Sommelier
                      </p>
                      <p className="font-body-sm text-body-sm text-outline">
                        Napa Valley Private Estates & High-Stakes Galas · 12 Years Discretionary Record
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/80 text-secondary font-label-md text-label-md shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping"></span>
                      <span>
                        Online Now · Avg: &lt; 2 min
                      </span>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest text-secondary-fixed hover:bg-secondary-container/30 transition-all font-label-md text-label-md shadow-sm" id="trigger-call-modal" type="button">
                      <span className="material-symbols-outlined text-[18px]">
                        phone_in_talk
                      </span>
                      {' '}
                      Patch Call to Arthur
                    </button>
                  </div>
                </div>
                <div className="mt-space-md pt-space-md grid grid-cols-2 sm:grid-cols-4 gap-space-sm bg-surface-container-highest/30 rounded-lg p-space-sm">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                      Credential
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">
                      Court of Master Sommeliers
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                      Security Clear
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">
                      Level 3 VIP Diplomatic
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                      Vendor Clout
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">
                      Top 1% Preferred Client
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                      Coverage
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">
                      On-Site Napa Pavilion
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl bg-surface-container-low/70 backdrop-blur-2xl shadow-xl flex flex-col h-[640px] overflow-hidden">
                <div className="p-space-md bg-surface-container-high/60 backdrop-blur-md flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary-fixed shadow-[0_0_10px_rgba(240,225,195,0.8)]"></div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Dedicated Producer Direct Line
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Synchronized with Aura AI Run-of-Show Matrix
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant transition-colors" title="Export Certified Transcript">
                      <span className="material-symbols-outlined text-[18px]">
                        download_done
                      </span>
                    </button>
                    <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant transition-colors" title="Voice Channel Session">
                      <span className="material-symbols-outlined text-[18px]">
                        graphic_eq
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-space-lg space-y-space-md" id="chat-messages-container">
                  <div className="flex justify-center my-2">
                    <span className="px-3 py-1 rounded-full bg-surface-container text-outline font-label-caps text-label-caps uppercase tracking-wider shadow-inner">
                      Today · Autumn Gala Production Phase 4
                    </span>
                  </div>
                  <div className="flex items-start gap-space-sm max-w-[85%] group">
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 mt-1 shadow-md bg-surface-container-high">
                      <img className="w-full h-full object-cover" data-alt="Portrait vignette of luxury event coordinator Arthur Vance with refined composure against ambient dark backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCk0Z-EAreqhXzqa5FgVAgOaPmUZWPlFuC_AMD9vk_4VWWF5FnXes_SY-LrixswM4QZXkxOvQW-X9kMNab7W6QT8YzKgE8D2zrMHE_JG7iBdKlTPlgU4x-xjxPs_DTiP9O3W9vwhg2Iz5H_pCuIr_CHNdHvsT6-e-3tUwu7b1WFfAD3WHFDP1nHwJ-NI0TKD8uCo3ARJ8MLybPSq4WX-LNMwPaGSTDT9hfybInVicJBVW-eLAHfWELAg" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md text-secondary-fixed font-semibold">
                          Arthur Vance
                        </span>
                        <span className="font-label-caps text-label-caps text-outline">
                          14:18 PST
                        </span>
                      </div>
                      <div className="p-4 rounded-xl rounded-tl-sm bg-surface-container-high/80 text-on-surface font-body-md text-body-md shadow-[0_8px_20px_rgba(0,0,0,0.35)] leading-relaxed">
                        Hello Julian, I just reviewed the floral installation timeline from St. Helena Botanicals. I called their team to secure the 8:30 AM drop-off window you authorized.
                      </div>
                      <div className="flex items-center gap-2 text-outline-variant font-label-caps text-label-caps px-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          verified
                        </span>
                        {' '}
                        Vendor Confirmed · Log Entry #SHB-809
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-end gap-space-sm max-w-[85%] ml-auto group">
                    <div className="space-y-1 flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="font-label-caps text-label-caps text-outline">
                          14:21 PST
                        </span>
                        <span className="font-label-md text-label-md text-primary font-semibold">
                          Julian
                        </span>
                      </div>
                      <div className="p-4 rounded-xl rounded-tr-sm bg-gradient-to-br from-primary-container/30 to-surface-container-highest text-on-surface font-body-md text-body-md shadow-[0_8px_20px_rgba(0,0,0,0.4)] leading-relaxed">
                        Thanks Arthur! Can you verify whether the backup indoor tent heating has been inspected?
                      </div>
                      <span className="font-label-caps text-label-caps text-primary/70 px-1 flex items-center gap-1">
                        Delivered via Secure Terminal
                        {' '}
                        <span className="material-symbols-outlined text-[13px] text-primary">
                          done_all
                        </span>
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 mt-1 shadow-md">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        person
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm max-w-[85%] group">
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 mt-1 shadow-md bg-surface-container-high">
                      <img className="w-full h-full object-cover" data-alt="Vignette of event producer Arthur Vance smiling subtly with focused professionalism in dark luxury setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaNKuu17yLSpGupGasKDUwG31SHOBGJj8xcwZ6EJUJUOhzNrQPq0ypxnfA-3gr7Cs7De19yIzYAi7ScOki3r9jh7MWJ1GtBCc9quVcbcoyxkhcGwbrHXXepGoJr7NkpPgbYTLOwSWm-H6Epa0XxIBC_NVNn04POKRdVQYR3RNnhWXO8OLC3QQOmKkfTX_ehMcxq-H4_OcSuLBu6xtAPAuiiUFyGr_-Di0p-DcWYKR1uJhXzAA_yGwppw" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md text-secondary-fixed font-semibold">
                          Arthur Vance
                        </span>
                        <span className="font-label-caps text-label-caps text-outline">
                          14:24 PST
                        </span>
                      </div>
                      <div className="p-4 rounded-xl rounded-tl-sm bg-surface-container-high/80 text-on-surface font-body-md text-body-md shadow-[0_8px_20px_rgba(0,0,0,0.35)] leading-relaxed">
                        Already done. Meadowwood verified two radiant heaters in the west pavilion. I've updated the run-of-show checklist accordingly. Anything else for this evening's walk-through?
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container/90 flex items-center justify-between gap-3 shadow-md max-w-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">
                            thermostat
                          </span>
                          <div className="truncate">
                            <div className="font-label-md text-label-md text-on-surface truncate">
                              West_Pavilion_Radiant_Signoff.pdf
                            </div>
                            <div className="font-label-caps text-label-caps text-outline">
                              18.4 KW Certified · Signoff 13:45 PST
                            </div>
                          </div>
                        </div>
                        <button className="p-1.5 rounded-md hover:bg-surface-container-highest text-secondary transition-colors shrink-0">
                          <span className="material-symbols-outlined text-[18px]">
                            visibility
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div id="chat-thread-hook"></div>
                </div>
                <div className="px-space-md py-space-sm bg-surface-container-high/40 flex items-center gap-2 overflow-x-auto whitespace-nowrap shadow-inner">
                  <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      bolt
                    </span>
                    {' '}
                    Quick Directive:
                  </span>
                  <button className="chat-quick-pill px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface text-body-sm font-body-sm transition-all shadow-sm" data-fill="Request contract renegotiation" type="button">
                    Request contract renegotiation
                  </button>
                  <button className="chat-quick-pill px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface text-body-sm font-body-sm transition-all shadow-sm" data-fill="Schedule site inspection walk" type="button">
                    Schedule site inspection walk
                  </button>
                  <button className="chat-quick-pill px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-highest text-secondary-fixed text-body-sm font-body-sm transition-all shadow-sm" data-fill="Call Arthur directly" type="button">
                    Call Arthur directly
                  </button>
                  <button className="chat-quick-pill px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface text-body-sm font-body-sm transition-all shadow-sm" data-fill="Send revised guest count to 164 attendees" type="button">
                    Send revised guest count
                  </button>
                </div>
                <div className="p-space-md bg-surface-container-high/70 backdrop-blur-xl">
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-space-sm" id="concierge-chat-form">
                    <div className="relative flex items-center">
                      <input className="w-full h-12 pl-4 pr-32 rounded-xl bg-surface-container text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-inner transition-all" id="chat-input-field" placeholder="Transmit direct instructions, vendor queries, or schedule requests..." type="text" />
                      <div className="absolute right-2 flex items-center gap-1">
                        <button className="p-2 rounded-lg text-outline-variant hover:text-secondary-fixed hover:bg-surface-container-highest transition-colors" id="toggle-audio-recorder" title="Voice Directive Recorder" type="button">
                          <span className="material-symbols-outlined text-[20px]">
                            mic
                          </span>
                        </button>
                        <label className="p-2 rounded-lg text-outline-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer" title="Attach Blueprint or Rider">
                          <span className="material-symbols-outlined text-[20px]">
                            attachment
                          </span>
                          <input className="hidden" type="file" />
                        </label>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-md text-label-md shadow-[0_0_16px_rgba(192,193,255,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5" type="submit">
                          <span>
                            Send Directive
                          </span>
                          <span className="material-symbols-outlined text-[16px]">
                            send
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-label-caps font-label-caps text-outline px-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                        {' '}
                        Arthur Vance will review immediately and coordinate with venue staff
                      </span>
                      <span>
                        Press Enter to Dispatch
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              <div className="rounded-xl p-space-lg bg-gradient-to-br from-surface-container-high/90 via-surface-container-low/95 to-surface-container-lowest/90 backdrop-blur-xl shadow-xl space-y-space-md">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[13px]">
                      shield_with_heart
                    </span>
                    {' '}
                    Concierge Guard 24/7
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-ping"></span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    On-Site Emergency Hotline
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
                    Direct priority dispatch bypassing standard queuing. Connects instantaneously to the Lead Producer Field Unit.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-lowest/80 shadow-inner flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                      Direct Field Line
                    </span>
                    <div className="font-headline-sm text-headline-sm text-secondary-fixed tracking-wider font-mono">
                      +1 (888) 942-AURA
                    </div>
                    <span className="font-body-sm text-[11px] text-outline-variant">
                      PIN: 7709-GALA-EXCL
                    </span>
                  </div>
                  <a className="p-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed hover:brightness-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(240,225,195,0.4)] flex items-center justify-center" href="tel:+18889422872">
                    <span className="material-symbols-outlined text-[22px]">
                      call
                    </span>
                  </a>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">
                      Producer Cellular
                    </span>
                    <span className="text-on-surface font-mono">
                      +1 (707) 555-0194
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">
                      Meadowood Estate Security Desk
                    </span>
                    <span className="text-on-surface font-mono">
                      Ext. 402
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">
                      Emergency Power Backup
                    </span>
                    <span className="text-secondary-fixed">
                      Live & Tested
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-space-lg bg-surface-container-low/80 backdrop-blur-xl shadow-xl space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                      fact_check
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Active Escalations
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary-fixed font-label-caps text-label-caps">
                    0 Faults
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-surface-container/60 shadow-inner space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container/30 text-secondary-fixed">
                      <span className="material-symbols-outlined text-[18px]">
                        verified
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-medium">
                        All Contracts Reconciled
                      </span>
                      <span className="font-body-sm text-[11px] text-outline">
                        14 Vendors Paid & Certificates Filed
                      </span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center font-label-caps text-label-caps text-on-surface-variant mb-1.5">
                      <span>
                        Production Integrity Score
                      </span>
                      <span className="text-secondary-fixed font-semibold">
                        99.8% Perfect
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-secondary-fixed-dim to-secondary-fixed rounded-full" style={{ "width": "99.8%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-surface-container-high/40 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-label-md text-label-md text-on-surface truncate">
                        West Pavilion Radiant Heaters
                      </div>
                      <div className="font-body-sm text-[11px] text-outline">
                        Inspected by Meadowood facilities at 13:45 PST
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container-high/40 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-label-md text-label-md text-on-surface truncate">
                        St. Helena Botanicals Drop-Off
                      </div>
                      <div className="font-body-sm text-[11px] text-outline">
                        Window locked: 8:30 AM arrival gate clearance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-space-lg bg-surface-container-low/80 backdrop-blur-xl shadow-xl space-y-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary-container/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        smart_toy
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      AI Co-pilot Summary
                    </h3>
                  </div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                    Realtime Sync
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Auto-synthesizes all client directives, verbal walk-through notes, and producer logs into actionable minutes.
                </p>
                <div className="space-y-space-sm">
                  <div className="p-3 rounded-lg bg-surface-container-high/50 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Action Pending
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Assigned: Arthur
                      </span>
                    </div>
                    <div className="font-label-md text-label-md text-on-surface">
                      Conduct sunset light check at 18:15 with lighting tech (West Terrace).
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-high/50 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                        Protocol Locked
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Verified
                      </span>
                    </div>
                    <div className="font-label-md text-label-md text-on-surface">
                      Dom Pérignon Vintage 2013 temperature checked to 9°C cellar hold.
                    </div>
                  </div>
                </div>
                <div className="pt-space-xs flex items-center justify-between">
                  <button className="font-label-md text-label-md text-secondary-fixed hover:text-white transition-colors flex items-center gap-1" id="copy-summary-btn" type="button">
                    <span className="material-symbols-outlined text-[16px]">
                      content_copy
                    </span>
                    <span>
                      Copy Directives Brief
                    </span>
                  </button>
                  <span className="font-label-caps text-label-caps text-outline">
                    Updated 2m ago
                  </span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-surface-container-low shadow-xl">
                <div className="relative h-44 w-full bg-cover bg-center" data-alt="Napa valley luxury estate pavilion at twilight with warm string lights hanging among heritage oak trees, elegant banquet setup in the background with amber glass reflections, editorial luxury gala landscape" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGoBG1hXi9Twdhrlnlcalq15xW0wIS9hN2YngUbJIY1S2GJpdjVdwmefTQWmiK60V22cR-RzxrxVeHTn5aMnz50PQWYB0pEEYbN-6zVmswb4a15l5MwjmhGUPA6zNmfFrHdi4wu04PxMgCxswZmtu3bcb66byTrOiwuMcCdnEiXojEKhhVly7p4Lr216uwaKRtUma4wN9cBAfCw4gc8srIDo_lgP5kc476sBi3eBXNHh-pTjdWV3IxSg')" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <div className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        On-Site Dispatch Anchor
                      </div>
                      <div className="font-label-lg text-label-lg text-white font-medium">
                        Meadowood West Pavilion
                      </div>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-surface-container-highest/90 backdrop-blur-md text-secondary-fixed text-label-caps font-label-caps">
                      68°F Sunset
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-xl hidden" id="call-modal">
          <div className="relative w-full max-w-md rounded-xl bg-surface-container-low p-space-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] text-center space-y-space-md">
            <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-secondary to-primary shadow-[0_0_24px_rgba(240,225,195,0.4)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-high">
                <img className="w-full h-full object-cover" data-alt="Arthur Vance close-up portrait with calm professional focus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB67ynaUtzhGgNM5-ybRKmUPKr3a8cgAHSbYiabWA4BUWCAGMf4bCHp6DdY5P_A48bIQ-8tcGiwe1X_4DjTNNxboLsTMoU9fZ7fvvV9iQc9tSoYuvMsUMitrHo3qWc3sdhVx9P5mzY6JoDJQKZbOdyjaxJWA8hBSSRkoPgAzzXq8cP7zEhptIoM4N1x8pSTd_yGk_ouVB57kyMA27ZpOKl0jZ6emR-IE3B4qk6NJtMfFG7X_y4me_XCgg" />
              </div>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">
                Connecting to Arthur Vance
              </h4>
              <p className="font-body-sm text-body-sm text-secondary-fixed mt-1">
                Lead Executive Producer · Encrypted Channel
              </p>
            </div>
            <div className="flex items-center justify-center gap-1.5 py-2">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-bounce [animation-delay:0.4s]"></span>
            </div>
            <div className="pt-2 flex items-center justify-center gap-4">
              <button className="px-6 py-2.5 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors" id="close-call-modal" type="button">
                Cancel Call
              </button>
              <a className="px-6 py-2.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shadow-md hover:brightness-105 transition-all flex items-center gap-2" href="tel:+18889422872">
                <span className="material-symbols-outlined text-[18px]">
                  phone
                </span>
                {' '}
                Open Dialer
              </a>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

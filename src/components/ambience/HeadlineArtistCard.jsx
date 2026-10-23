import { memo } from 'react'

function HeadlineArtistCardComponent() {
  return (
    <div className="p-6 rounded-2xl bg-surface-container-low/70 backdrop-blur-xl shadow-xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            stars
          </span>
          <span className="font-label-caps text-label-caps uppercase text-secondary-fixed tracking-wider">
            Headline Performance Unit
          </span>
        </div>
        <span className="px-2.5 py-1 rounded bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps">
          CONTRACT LOCKED &amp; SECURED
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="relative w-full md:w-44 h-48 rounded-xl overflow-hidden shrink-0 shadow-lg">
          <img
            className="w-full h-full object-cover"
            alt="Sophisticated male DJ Kai Vance wearing tailored minimalist evening attire beside a custom brushed gold acoustic saxophone player under moody nocturnal stage lighting with deep violet and warm amber backlight in a glass luxury venue."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOjIAWJhSU3P5UmptUpDojYFfpd3ewRoBmGDabJNl6sEehsFAwGae4PdmcprjjWCkL86wIIb4NS0LxvZ5OKCGVSs3B-N7fld-b27jGc4577XDuDXM_POmKgflb8t8QJobUAXcUwx38IKWw2XlWSvA5Cdalq9L_XgP9DeXCIEeBmVEcwbjVw8XV4zBZ60eBpTg7igz-4rEqVrZd4bdWqKmBpYRtKN5MHkYj3QVknsY62IZtxzPAmMXbiA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-on-surface">
            <span className="px-1.5 py-0.5 rounded bg-surface-dim/80">4.98 ★</span>
            <span className="text-secondary-fixed font-semibold">BERLIN / NYC</span>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-baseline gap-2">
              <h4 className="font-headline-sm text-headline-sm text-on-surface">
                Resident DJ Kai Vance &amp; Live Saxophone
              </h4>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Bespoke hybrid set synthesizing organic brass improvisations over live vinyl mixing. Curated specifically for Julian &amp; Maya&apos;s celebration flow.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-3 p-3 rounded-xl bg-surface-container">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block">
                Acoustic Score
              </span>
              <span className="font-headline-sm text-headline-sm text-primary">
                99.2%
              </span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block">
                Tech Rider
              </span>
              <span className="font-label-md text-label-md text-secondary-fixed flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[14px]">
                  check_circle
                </span>{' '}
                Approved
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-label-caps text-label-caps text-on-surface-variant block">
                Wireless DMX Mic
              </span>
              <span className="font-label-md text-label-md text-on-surface font-medium">
                Sennheiser 6000
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:shadow-lg transition-transform active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>{' '}
              Approve Final Setlist
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors font-label-lg text-label-lg flex items-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>{' '}
              View Rider Spec
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HeadlineArtistCardComponent)

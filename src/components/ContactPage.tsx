import { useState, type FormEvent } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const contactPrompts = [
  'A workflow costing too much time',
  'A product opportunity worth testing',
  'A system that needs to grow with you',
]

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.WEB3FORM_ACCESS_KEY as string | undefined

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!ACCESS_KEY) {
      setStatus('error')
      setErrorMessage('Contact form is not configured. Email us instead.')
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const company = String(data.get('company') ?? '')

    if (data.get('botcheck')) {
      setStatus('success')
      form.reset()
      return
    }

    data.append('access_key', ACCESS_KEY)
    data.append(
      'subject',
      `OpenRangeDevs enquiry from ${name || company || 'a new client'}`,
    )
    data.append('from_name', 'OpenRangeDevs Contact')

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: data,
      })
      const result = (await response.json()) as {
        success?: boolean
        message?: string
      }

      if (!result.success) {
        setStatus('error')
        setErrorMessage(result.message || 'Something went wrong. Try again.')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Check your connection and try again.')
    }
  }

  return (
    <div className="page-rails relative min-h-screen overflow-x-clip bg-white">
      <Navbar elevated />
      <main id="contact" className="relative z-10 px-6 pb-28 pt-40 lg:px-14 lg:pb-40 lg:pt-52">
        <section className="mx-auto max-w-[1328px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">
            Contact OpenRangeDevs
          </p>
          <div className="mt-5 grid items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
            <h1 className="max-w-[900px] text-[clamp(58px,8.2vw,122px)] font-bold leading-[0.86] tracking-[-0.075em]">
              Tell us what needs to move.
            </h1>
            <p className="max-w-[500px] text-[18px] font-medium leading-[1.5] text-ink/65 lg:pb-2 lg:text-[21px]">
              Share what you are trying to improve, build, or untangle. We will start with the business need and map the strongest next step.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-16 grid max-w-[1328px] overflow-hidden rounded-[28px] border border-ink/14 lg:mt-24 lg:min-h-[720px] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="contact-blueprint relative overflow-hidden bg-[#061a42] p-8 text-white sm:p-12 lg:p-14">
            <div className="relative z-10 flex h-full min-h-[520px] flex-col">
              <div className="flex items-center justify-between gap-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/62">Start with the business</p>
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/62">
                  <span className="contact-live-dot size-2 rounded-full bg-[#68a0ff]" />
                  We listen first
                </span>
              </div>

              <div className="relative my-auto py-12">
                <svg viewBox="0 0 560 300" className="h-auto w-full" aria-hidden="true">
                  <path className="contact-route contact-route--muted" d="M18 54 H176 L236 112 H542" />
                  <path className="contact-route contact-route--muted" d="M18 246 H176 L236 188 H542" />
                  <path className="contact-route contact-route--active" d="M18 150 H542" />
                  <circle className="contact-route-dot contact-route-dot--one" cx="176" cy="54" r="6" />
                  <circle className="contact-route-dot contact-route-dot--two" cx="236" cy="150" r="7" />
                  <circle className="contact-route-dot contact-route-dot--three" cx="430" cy="150" r="6" />
                  <rect x="217" y="112" width="126" height="76" rx="10" fill="#ffffff" />
                  <text x="280" y="144" textAnchor="middle" fill="#061a42" fontSize="11" fontWeight="700" letterSpacing="1.5">
                    THE RIGHT
                  </text>
                  <text x="280" y="166" textAnchor="middle" fill="#061a42" fontSize="20" fontWeight="700">
                    NEXT MOVE
                  </text>
                </svg>
              </div>

              <div>
                <p className="max-w-[500px] text-[32px] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[42px]">
                  Bring us the situation, not a finished brief.
                </p>
                <ul className="mt-7 grid gap-3 text-[14px] font-semibold text-white/72 sm:grid-cols-3">
                  {contactPrompts.map((prompt) => (
                    <li key={prompt} className="border-t border-white/22 pt-3 leading-[1.35]">
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12 lg:p-14">
            <div className="flex h-full flex-col">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-700">Your message</p>
                <h2 className="mt-4 max-w-[560px] text-[40px] font-bold leading-[0.96] tracking-[-0.055em] sm:text-[54px]">
                  What are you trying to make possible?
                </h2>
              </div>

              {status === 'success' ? (
                <div className="mt-12 flex flex-1 flex-col justify-center gap-6" role="status">
                  <p className="max-w-[480px] text-[28px] font-bold leading-[1.1] tracking-[-0.04em]">
                    Message sent. We will get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex min-h-14 w-fit cursor-pointer items-center justify-center rounded-[19px] bg-ink px-9 text-[17px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-12 grid flex-1 content-start gap-x-7 sm:grid-cols-2"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <label className="contact-field">
                    <span>Name</span>
                    <input type="text" name="name" autoComplete="name" required />
                  </label>
                  <label className="contact-field">
                    <span>Email</span>
                    <input type="email" name="email" autoComplete="email" required />
                  </label>
                  <label className="contact-field sm:col-span-2">
                    <span>Company Name</span>
                    <input type="text" name="company" autoComplete="organization" required />
                  </label>
                  <label className="contact-field sm:col-span-2">
                    <span>Message</span>
                    <textarea name="message" rows={5} required />
                  </label>

                  {status === 'error' && errorMessage ? (
                    <p className="mt-4 text-[14px] font-semibold text-red-600 sm:col-span-2" role="alert">
                      {errorMessage}
                    </p>
                  ) : null}

                  <div className="mt-9 flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex min-h-14 cursor-pointer items-center justify-center rounded-[19px] bg-ink px-9 text-[17px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Sending…' : 'Submit'}
                    </button>
                    <a
                      href="mailto:hello@openrangedevs.com"
                      className="text-[14px] font-semibold text-ink/55 transition-colors hover:text-brand-700"
                    >
                      hello@openrangedevs.com
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

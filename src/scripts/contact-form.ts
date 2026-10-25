// Progressive enhancement for the Netlify contact form. Netlify accepts a
// URL-encoded POST (not JSON, not multipart without files) to any page path.
const form = document.querySelector<HTMLFormElement>('[data-contact-form]')
const success = document.querySelector<HTMLElement>('[data-contact-success]')
const errorEl = document.querySelector<HTMLElement>('[data-contact-error]')

if (form && success && errorEl) {
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!

  const showError = (message: string) => {
    errorEl.textContent = message
    errorEl.hidden = false
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    errorEl.hidden = true

    const data = new FormData(form)
    // Netlify injects form-name at deploy time; set it anyway so local/preview builds behave the same
    data.set('form-name', form.getAttribute('name')!)
    const who = String(data.get('name') || data.get('company') || 'a new client')
    data.set('subject', `OpenRangeDevs enquiry from ${who}`)

    submit.disabled = true
    submit.textContent = 'Sending…'
    try {
      const response = await fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      if (!response.ok) throw new Error(String(response.status))
      form.reset()
      form.hidden = true
      success.hidden = false
      // the form collapses, so bring the confirmation into view below the fixed navbar
      success.focus({ preventScroll: true })
      success.scrollIntoView({ block: 'start', behavior: 'smooth' })
    } catch {
      showError(`Something went wrong sending your message. Try again, or email us at hello@openrangedevs.com.`)
    } finally {
      submit.disabled = false
      submit.textContent = 'Submit'
    }
  })

  document.querySelector('[data-contact-reset]')?.addEventListener('click', () => {
    success.hidden = true
    form.hidden = false
    form.querySelector<HTMLInputElement>('input[name="name"]')?.focus()
  })
}

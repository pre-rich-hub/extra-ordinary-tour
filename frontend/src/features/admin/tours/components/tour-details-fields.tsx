import { adminInputClass, adminLabelClass, adminPanelClass } from '../../components/admin-primitives'

export type TourDetails = {
  days?: string | null
  nights?: number | null
  style?: string | null
  season?: string | null
  group?: string | null
  teaser?: string | null
  highlights?: string[]
  places?: string[]
}

/** The facts the public tour page and tour cards show. */
export function TourDetailsFields({ tour }: { tour?: TourDetails }) {
  return (
    <section className={adminPanelClass}>
      <h2 className="mb-1 font-serif text-lg text-foreground">Tour details</h2>
      <p className="mb-5 text-xs text-muted-foreground">Shown on tour cards and the tour page. English only: other languages keep their translated text.</p>
      <div className="grid gap-5 md:grid-cols-2">
        <label>
          <span className={adminLabelClass}>Duration</span>
          <input name="days" defaultValue={tour?.days ?? ''} placeholder="e.g. 10 Days" className={adminInputClass} required />
        </label>
        <label>
          <span className={adminLabelClass}>Nights (0 for a day trip)</span>
          <input name="nights" type="number" min="0" defaultValue={tour?.nights ?? ''} className={adminInputClass} required />
        </label>
        <label>
          <span className={adminLabelClass}>Travel style</span>
          <input name="style" defaultValue={tour?.style ?? ''} placeholder="e.g. Historical · Cultural" className={adminInputClass} required />
          <span className="mt-1 block text-xs text-muted-foreground">Separate styles with ·. Tours page filters match Historical, Cultural, Festival, Coffee, Danakil, Trekking, Wildlife, Birding and Day Trip.</span>
        </label>
        <label>
          <span className={adminLabelClass}>Best season</span>
          <input name="season" defaultValue={tour?.season ?? ''} placeholder="e.g. September to July" className={adminInputClass} required />
        </label>
        <label>
          <span className={adminLabelClass}>Group size</span>
          <input name="group" defaultValue={tour?.group ?? ''} placeholder="e.g. Private or group" className={adminInputClass} required />
        </label>
        <label className="md:col-span-2">
          <span className={adminLabelClass}>Teaser (one or two sentences for cards)</span>
          <textarea name="teaser" rows={2} defaultValue={tour?.teaser ?? ''} className={`${adminInputClass} resize-y`} required />
        </label>
        <label>
          <span className={adminLabelClass}>Places visited (one per line)</span>
          <textarea name="places" rows={6} defaultValue={tour?.places?.join('\n') ?? ''} className={`${adminInputClass} resize-y`} required />
        </label>
        <label>
          <span className={adminLabelClass}>Highlights (one per line, optional)</span>
          <textarea name="highlights" rows={6} defaultValue={tour?.highlights?.join('\n') ?? ''} className={`${adminInputClass} resize-y`} />
        </label>
      </div>
    </section>
  )
}

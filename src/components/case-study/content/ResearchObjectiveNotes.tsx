const TAPE_TOP =
  '/images/case-studies/ualberta-library-website/tape-L.svg'

const objectives = [
  {
    text: 'Determining whether new users can navigate to key services and features.',
    rotation: 'md:-rotate-[1deg]',
  },
  {
    text: 'Identifying the features students use most frequently and their experiences using them.',
    rotation: 'md:-rotate-[6deg]',
  },
  {
    text: 'Assessing the usability of the "All Library Services" page.',
    rotation: 'md:rotate-[4deg]',
  },
  {
    text: 'Providing recommendations to improve organization, clarity, and overall usability.',
    rotation: 'md:-rotate-[10deg]',
  },
]

/** tape-L is drawn on a diagonal; rotate so the strip runs parallel to the note top */
const TAPE_ALIGN_DEG = 37.2

function TopTape() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={TAPE_TOP}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[-23px] h-[56px] w-[88px] object-contain"
      style={{
        transform: `translateX(-50%) rotate(${TAPE_ALIGN_DEG}deg)`,
        transformOrigin: 'center top',
      }}
    />
  )
}

export function ResearchObjectiveNotes() {
  return (
    <ul
      aria-label="Research objectives"
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 md:gap-7"
    >
      {objectives.map((objective) => (
        <li
          key={objective.text}
          className={`relative isolate flex min-h-[220px] items-center justify-center overflow-visible bg-[#f4eedf] px-6 py-10 text-center shadow-[0_10px_22px_rgba(0,0,0,0.10)] transition-transform duration-300 ease-out hover:-translate-y-1 ${objective.rotation}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(92,82,61,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(92,82,61,0.05)_1px,transparent_1px)] bg-[length:18px_18px]"
          />
          <TopTape />
          <p className="max-w-[13ch] text-[14px] font-semibold uppercase leading-[1.12] tracking-[-0.04em] text-[#181511] md:text-[15px] lg:text-[16px]">
            {objective.text}
          </p>
        </li>
      ))}
    </ul>
  )
}

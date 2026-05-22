// Two-octave keyboard C3–B4
const WHITE_KEYS = [
  'C3','D3','E3','F3','G3','A3','B3',
  'C4','D4','E4','F4','G4','A4','B4'
]

// black key positions: index of the white key to the LEFT, plus note name
const BLACK_KEYS = [
  { leftWhite: 0, note: 'C#3' },
  { leftWhite: 1, note: 'D#3' },
  { leftWhite: 3, note: 'F#3' },
  { leftWhite: 4, note: 'G#3' },
  { leftWhite: 5, note: 'A#3' },
  { leftWhite: 7, note: 'C#4' },
  { leftWhite: 8, note: 'D#4' },
  { leftWhite: 10, note: 'F#4' },
  { leftWhite: 11, note: 'G#4' },
  { leftWhite: 12, note: 'A#4' }
]

// Normalise note names so "Eb" matches "D#", "Bb" matches "A#", etc.
const ENHARMONIC = {
  'Db': 'C#', 'Eb': 'D#', 'Fb': 'E', 'Gb': 'F#',
  'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B',
  'C#': 'C#', 'D#': 'D#', 'F#': 'F#', 'G#': 'G#', 'A#': 'A#'
}

function normalizeNote(note) {
  // note may be like "C4", "F#3", "Bb4", "E" (no octave)
  const upper = note.trim()
  const match = upper.match(/^([A-Ga-g][b#]?)(\d?)$/)
  if (!match) return upper
  const [, pitch, octave] = match
  const canonical = ENHARMONIC[pitch] ?? pitch.charAt(0).toUpperCase() + pitch.slice(1)
  return octave ? `${canonical}${octave}` : canonical
}

function activeSet(chordDetail) {
  if (!chordDetail) return new Set()
  const notes = chordDetail.notes ?? []
  const result = new Set()
  notes.forEach((n) => {
    const norm = normalizeNote(n)
    // If no octave given, match both octaves
    if (!/\d$/.test(norm)) {
      WHITE_KEYS.forEach((k) => { if (k.startsWith(norm)) result.add(k) })
      BLACK_KEYS.forEach((k) => { if (k.note.startsWith(norm)) result.add(k.note) })
    } else {
      result.add(norm)
    }
  })
  return result
}

const WHITE_W = 36
const WHITE_H = 120
const BLACK_W = 22
const BLACK_H = 74
const TOTAL_W = WHITE_KEYS.length * WHITE_W

export default function PianoKeyboard({ activeChordDetail }) {
  const active = activeSet(activeChordDetail)

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${TOTAL_W} ${WHITE_H}`}
        width={TOTAL_W}
        height={WHITE_H}
        className="mx-auto block"
        style={{ maxWidth: '100%' }}
      >
        {/* White keys */}
        {WHITE_KEYS.map((note, i) => {
          const isActive = active.has(note)
          return (
            <rect
              key={note}
              x={i * WHITE_W}
              y={0}
              width={WHITE_W - 1}
              height={WHITE_H}
              rx={3}
              fill={isActive ? '#6366f1' : 'white'}
              stroke="#94a3b8"
              strokeWidth={1}
            />
          )
        })}

        {/* Note labels on white keys */}
        {WHITE_KEYS.map((note, i) => {
          const isActive = active.has(note)
          const label = note.replace(/\d/, '')
          const isC = label === 'C'
          return (isC || isActive) ? (
            <text
              key={`label-${note}`}
              x={i * WHITE_W + WHITE_W / 2}
              y={WHITE_H - 8}
              textAnchor="middle"
              fontSize={10}
              fill={isActive ? 'white' : '#94a3b8'}
              fontFamily="monospace"
            >
              {note}
            </text>
          ) : null
        })}

        {/* Black keys */}
        {BLACK_KEYS.map(({ leftWhite, note }) => {
          const isActive = active.has(note)
          const x = leftWhite * WHITE_W + WHITE_W - BLACK_W / 2
          return (
            <rect
              key={note}
              x={x}
              y={0}
              width={BLACK_W}
              height={BLACK_H}
              rx={3}
              fill={isActive ? '#6366f1' : '#1e293b'}
              stroke="#0f172a"
              strokeWidth={1}
            />
          )
        })}
      </svg>
    </div>
  )
}

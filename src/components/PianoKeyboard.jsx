// Two-octave keyboard C3–B4
const WHITE_KEYS = [
  'C3','D3','E3','F3','G3','A3','B3',
  'C4','D4','E4','F4','G4','A4','B4'
]

// black key positions: index of the white key to the LEFT, plus note name
const BLACK_KEYS = [
  { leftWhite: 0,  note: 'C#3' },
  { leftWhite: 1,  note: 'D#3' },
  { leftWhite: 3,  note: 'F#3' },
  { leftWhite: 4,  note: 'G#3' },
  { leftWhite: 5,  note: 'A#3' },
  { leftWhite: 7,  note: 'C#4' },
  { leftWhite: 8,  note: 'D#4' },
  { leftWhite: 10, note: 'F#4' },
  { leftWhite: 11, note: 'G#4' },
  { leftWhite: 12, note: 'A#4' }
]

// Enharmonic equivalents → canonical sharp form
const ENHARMONIC = {
  'Db':'C#','Eb':'D#','Fb':'E','Gb':'F#',
  'Ab':'G#','Bb':'A#','Cb':'B',
  'C#':'C#','D#':'D#','F#':'F#','G#':'G#','A#':'A#'
}

// French solfège → English
const SOLFEGE = {
  'do':'C','ré':'D','re':'D','mi':'E','fa':'F',
  'sol':'G','la':'A','si':'B','ti':'B'
}

/** Normalize any note string to canonical form (e.g. "Bb4" → "A#4", "la" → "A") */
function normalizeNote(raw) {
  const s = raw.trim()

  // Try solfège (case-insensitive, with optional accidental + optional octave)
  const solfMatch = s.match(/^(do|ré|re|mi|fa|sol|la|si|ti)([b#]?)(\d?)$/i)
  if (solfMatch) {
    const base  = SOLFEGE[solfMatch[1].toLowerCase()]
    const acc   = solfMatch[2]
    const oct   = solfMatch[3]
    const pitch = acc ? (ENHARMONIC[base + acc] ?? base + acc) : base
    return oct ? `${pitch}${oct}` : pitch
  }

  // Standard letter notation: C, C#3, Bb4, etc.
  const match = s.match(/^([A-Ga-g][b#]?)(\d?)$/)
  if (!match) return s
  const [, rawPitch, octave] = match
  const pitch = rawPitch.charAt(0).toUpperCase() + rawPitch.slice(1)
  const canonical = ENHARMONIC[pitch] ?? pitch
  return octave ? `${canonical}${octave}` : canonical
}

/** Strip octave digit from a key name ("C#3" → "C#", "A4" → "A") */
const stripOctave = (key) => key.replace(/\d+$/, '')

/** Build the set of keyboard key names that belong to the active chord */
function buildActiveSet(chordDetail) {
  if (!chordDetail) return new Set()
  const notes = chordDetail.notes ?? []
  const result = new Set()

  notes.forEach((raw) => {
    const norm = normalizeNote(raw)
    const hasOctave = /\d$/.test(norm)

    if (hasOctave) {
      // Exact match: only add if key exists in our range
      if (WHITE_KEYS.includes(norm) || BLACK_KEYS.some(k => k.note === norm)) {
        result.add(norm)
      }
    } else {
      // No octave: match all keys whose letter part equals norm exactly
      WHITE_KEYS.forEach(k => { if (stripOctave(k) === norm) result.add(k) })
      BLACK_KEYS.forEach(k => { if (stripOctave(k.note) === norm) result.add(k.note) })
    }
  })

  return result
}

const WHITE_W  = 36
const WHITE_H  = 120
const BLACK_W  = 22
const BLACK_H  = 74
const TOTAL_W  = WHITE_KEYS.length * WHITE_W

export default function PianoKeyboard({ activeChordDetail }) {
  const active = buildActiveSet(activeChordDetail)

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
            <g key={note}>
              <rect
                x={i * WHITE_W}
                y={0}
                width={WHITE_W - 1}
                height={WHITE_H}
                rx={3}
                fill={isActive ? '#6366f1' : 'white'}
                stroke="#94a3b8"
                strokeWidth={1}
              />
              {/* Label: always show C notes, always show active notes */}
              {(stripOctave(note) === 'C' || isActive) && (
                <text
                  x={i * WHITE_W + WHITE_W / 2}
                  y={WHITE_H - 8}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isActive ? 'white' : '#94a3b8'}
                  fontFamily="monospace"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {note}
                </text>
              )}
            </g>
          )
        })}

        {/* Black keys (rendered on top) */}
        {BLACK_KEYS.map(({ leftWhite, note }) => {
          const isActive = active.has(note)
          const x = leftWhite * WHITE_W + WHITE_W - BLACK_W / 2
          return (
            <g key={note}>
              <rect
                x={x}
                y={0}
                width={BLACK_W}
                height={BLACK_H}
                rx={3}
                fill={isActive ? '#6366f1' : '#1e293b'}
                stroke="#0f172a"
                strokeWidth={1}
              />
              {isActive && (
                <text
                  x={x + BLACK_W / 2}
                  y={BLACK_H - 6}
                  textAnchor="middle"
                  fontSize={7}
                  fill="white"
                  fontFamily="monospace"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {note}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

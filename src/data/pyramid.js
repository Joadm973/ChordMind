// Contenu pédagogique statique du module "Apprendre" — structure en pyramide,
// du plus simple (les notes) au plus complexe (les accords).
export const PYRAMID = [
  {
    id: 'notes',
    order: 0,
    title: 'Les notes',
    lessons: [
      {
        id: 'note-names',
        title: 'Les 7 notes',
        explanation:
          "En notation anglaise, on nomme les notes avec des lettres : C D E F G A B (do ré mi fa sol la si en solfège). Ce sont les 7 touches blanches du clavier, qui se répètent à l'identique sur toute la longueur de l'instrument.",
        keyboardHighlight: { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
        quiz: [
          {
            question: 'Quelle note vient juste après G ?',
            answer: 'A',
            choices: ['A', 'B', 'C', 'F']
          },
          {
            question: "Comment s'appelle la note « do » en notation anglaise ?",
            answer: 'C',
            choices: ['C', 'D', 'A', 'G']
          }
        ]
      },
      {
        id: 'accidentals',
        title: 'Les touches noires (dièses et bémols)',
        explanation:
          "Entre certaines touches blanches se glissent des touches noires. On les nomme avec un dièse (#, qui monte d'un demi-ton) ou un bémol (b, qui descend d'un demi-ton) : C# est la touche entre C et D. Il n'y a jamais de touche noire entre E et F, ni entre B et C : ce sont déjà des demi-tons.",
        keyboardHighlight: { notes: ['C', 'C#', 'D'] },
        quiz: [
          {
            question: "Entre quelles notes n'y a-t-il jamais de touche noire ?",
            answer: 'E et F',
            choices: ['E et F', 'C et D', 'G et A', 'A et B']
          },
          {
            question: 'C# est aussi appelé...',
            answer: 'Db',
            choices: ['Db', 'Eb', 'Gb', 'Ab']
          }
        ]
      }
    ]
  },
  {
    id: 'intervals',
    order: 1,
    title: 'Les intervalles',
    lessons: [
      {
        id: 'interval-concept',
        title: "Qu'est-ce qu'un intervalle ?",
        explanation:
          "Un intervalle mesure la distance entre deux notes, comptée en demi-tons (la plus petite distance possible sur le clavier, d'une touche à la suivante, blanche ou noire). Par exemple, de C à D il y a 2 demi-tons : c'est un ton entier.",
        keyboardHighlight: { notes: ['C', 'D'] },
        quiz: [
          {
            question: 'Combien de demi-tons séparent C et D ?',
            answer: '2',
            choices: ['1', '2', '3', '4']
          },
          {
            question: 'Un intervalle mesure...',
            answer: 'La distance entre deux notes',
            choices: [
              'La distance entre deux notes',
              "La durée d'une note",
              "Le volume d'une note",
              "Le tempo d'un morceau"
            ]
          }
        ]
      },
      {
        id: 'interval-third',
        title: 'La tierce',
        explanation:
          "La tierce majeure fait 4 demi-tons (C→E). La tierce mineure fait 3 demi-tons (C→Eb) : un seul demi-ton de moins. Cette petite différence est la clé qui distingue un accord majeur d'un accord mineur — on la retrouvera au niveau suivant.",
        keyboardHighlight: { notes: ['C', 'E', 'Eb'], changedNote: 'Eb' },
        quiz: [
          {
            question: 'Combien de demi-tons fait une tierce majeure ?',
            answer: '4',
            choices: ['3', '4', '5', '7']
          },
          {
            question: 'Quelle est la tierce mineure de C ?',
            answer: 'Eb',
            choices: ['Eb', 'E', 'D', 'F']
          }
        ]
      },
      {
        id: 'interval-fifth',
        title: 'La quinte',
        explanation:
          "La quinte juste fait 7 demi-tons (C→G). C'est l'intervalle le plus stable après l'octave : on la retrouve dans presque tous les accords, majeurs comme mineurs.",
        keyboardHighlight: { notes: ['C', 'G'] },
        quiz: [
          {
            question: 'Combien de demi-tons fait une quinte juste ?',
            answer: '7',
            choices: ['5', '6', '7', '8']
          },
          {
            question: 'Quelle est la quinte juste de C ?',
            answer: 'G',
            choices: ['G', 'F', 'A', 'G#']
          }
        ]
      }
    ]
  },
  {
    id: 'chords',
    order: 2,
    title: 'Les accords',
    lessons: [
      {
        id: 'major',
        title: 'Accord majeur',
        formula: [0, 4, 7],
        diffFromPrevious: null,
        explanation:
          "L'accord majeur est notre accord de référence : fondamentale + tierce majeure (4 demi-tons) + quinte juste (7 demi-tons). Sur C : C - E - G.",
        keyboardHighlight: { notes: ['C', 'E', 'G'] },
        quiz: [
          {
            question: "Quelles notes composent l'accord de C majeur ?",
            answer: 'C - E - G',
            choices: ['C - E - G', 'C - Eb - G', 'C - E - G#', 'C - Eb - Gb']
          },
          {
            question: "De combien de demi-tons est la tierce d'un accord majeur ?",
            answer: '4',
            choices: ['3', '4', '5', '7']
          }
        ]
      },
      {
        id: 'minor',
        title: 'Accord mineur',
        formula: [0, 3, 7],
        diffFromPrevious: { lessonId: 'major', changedDegree: 'tierce', delta: -1 },
        explanation:
          "Un seul changement par rapport à l'accord majeur : la tierce descend d'un demi-ton (tierce mineure). Sur C : C - Eb - G au lieu de C - E - G.",
        keyboardHighlight: { notes: ['C', 'Eb', 'G'], changedNote: 'Eb' },
        quiz: [
          {
            question: 'Qu\'est-ce qui change entre C majeur et C mineur ?',
            answer: "La tierce descend d'un demi-ton",
            choices: [
              "La tierce descend d'un demi-ton",
              "La quinte descend d'un demi-ton",
              'La fondamentale change',
              'On ajoute une 7e'
            ]
          },
          {
            question: "Quelles notes composent l'accord de C mineur ?",
            answer: 'C - Eb - G',
            choices: ['C - Eb - G', 'C - E - G', 'C - Eb - Gb', 'C - E - G#']
          }
        ]
      },
      {
        id: 'diminished',
        title: 'Accord diminué',
        formula: [0, 3, 6],
        diffFromPrevious: { lessonId: 'minor', changedDegree: 'quinte', delta: -1 },
        explanation:
          "Depuis l'accord mineur, un seul changement : la quinte descend à son tour d'un demi-ton. Sur C : C - Eb - Gb. L'accord devient instable, tendu — souvent utilisé comme accord de passage.",
        keyboardHighlight: { notes: ['C', 'Eb', 'Gb'], changedNote: 'Gb' },
        quiz: [
          {
            question: 'Qu\'est-ce qui change entre C mineur et C diminué ?',
            answer: "La quinte descend d'un demi-ton",
            choices: [
              "La quinte descend d'un demi-ton",
              "La tierce descend d'un demi-ton",
              'On ajoute une 7e',
              'La fondamentale monte'
            ]
          },
          {
            question: "Quelles notes composent l'accord de C diminué ?",
            answer: 'C - Eb - Gb',
            choices: ['C - Eb - Gb', 'C - Eb - G', 'C - E - G#', 'C - E - Gb']
          }
        ]
      },
      {
        id: 'augmented',
        title: 'Accord augmenté',
        formula: [0, 4, 8],
        diffFromPrevious: { lessonId: 'major', changedDegree: 'quinte', delta: 1 },
        explanation:
          "Retour à l'accord majeur comme point de départ : cette fois, un seul changement, la quinte monte d'un demi-ton. Sur C : C - E - G#. L'accord devient flottant, sans point de résolution stable.",
        keyboardHighlight: { notes: ['C', 'E', 'G#'], changedNote: 'G#' },
        quiz: [
          {
            question: 'Qu\'est-ce qui change entre C majeur et C augmenté ?',
            answer: "La quinte monte d'un demi-ton",
            choices: [
              "La quinte monte d'un demi-ton",
              "La tierce monte d'un demi-ton",
              "La quinte descend d'un demi-ton",
              'On ajoute une 7e'
            ]
          },
          {
            question: "Quelles notes composent l'accord de C augmenté ?",
            answer: 'C - E - G#',
            choices: ['C - E - G#', 'C - E - G', 'C - Eb - G#', 'C - E - Ab']
          }
        ]
      },
      {
        id: 'dominant7',
        title: 'Septième de dominante',
        formula: [0, 4, 7, 10],
        diffFromPrevious: { lessonId: 'major', changedDegree: '7e', delta: 'ajout mineure' },
        explanation:
          "On repart de l'accord majeur et on ajoute une seule note : une septième mineure (10 demi-tons depuis la fondamentale). Sur C : C - E - G - Bb. C'est l'accord de tension par excellence, celui qui appelle une résolution.",
        keyboardHighlight: { notes: ['C', 'E', 'G', 'Bb'], changedNote: 'Bb' },
        quiz: [
          {
            question: 'Qu\'est-ce qui change entre C majeur et C7 (septième de dominante) ?',
            answer: 'On ajoute une septième mineure',
            choices: [
              'On ajoute une septième mineure',
              'On ajoute une septième majeure',
              'La tierce descend',
              'La quinte monte'
            ]
          },
          {
            question: "Quelles notes composent l'accord de C7 ?",
            answer: 'C - E - G - Bb',
            choices: ['C - E - G - Bb', 'C - E - G - B', 'C - Eb - G - Bb', 'C - E - G# - Bb']
          }
        ]
      },
      {
        id: 'major7',
        title: 'Majeur 7',
        formula: [0, 4, 7, 11],
        diffFromPrevious: { lessonId: 'dominant7', changedDegree: '7e', delta: 1 },
        explanation:
          "Depuis la septième de dominante, un seul changement : la septième monte d'un demi-ton et devient majeure (11 demi-tons). Sur C : C - E - G - B. Le son est doux et enveloppant, sans la tension du 7e de dominante.",
        keyboardHighlight: { notes: ['C', 'E', 'G', 'B'], changedNote: 'B' },
        quiz: [
          {
            question: 'Qu\'est-ce qui change entre C7 et Cmaj7 ?',
            answer: "La septième monte d'un demi-ton",
            choices: [
              "La septième monte d'un demi-ton",
              "La septième descend d'un demi-ton",
              'La tierce change',
              'La quinte change'
            ]
          },
          {
            question: "Quelles notes composent l'accord de Cmaj7 ?",
            answer: 'C - E - G - B',
            choices: ['C - E - G - B', 'C - E - G - Bb', 'C - Eb - G - B', 'C - E - G# - B']
          }
        ]
      },
      {
        id: 'minor7',
        title: 'Mineur 7',
        formula: [0, 3, 7, 10],
        diffFromPrevious: { lessonId: 'minor', changedDegree: '7e', delta: 'ajout mineure' },
        explanation:
          "On repart de l'accord mineur et on ajoute, comme pour la dominante, une septième mineure. Sur C : C - Eb - G - Bb. C'est l'un des accords les plus utilisés en jazz et en pop, à la fois doux et coloré.",
        keyboardHighlight: { notes: ['C', 'Eb', 'G', 'Bb'], changedNote: 'Bb' },
        quiz: [
          {
            question: 'Qu\'est-ce qui change entre C mineur et Cm7 ?',
            answer: 'On ajoute une septième mineure',
            choices: [
              'On ajoute une septième mineure',
              'On ajoute une septième majeure',
              'La tierce remonte',
              'La quinte descend'
            ]
          },
          {
            question: "Quelles notes composent l'accord de Cm7 ?",
            answer: 'C - Eb - G - Bb',
            choices: ['C - Eb - G - Bb', 'C - E - G - Bb', 'C - Eb - Gb - Bb', 'C - Eb - G - B']
          }
        ]
      }
    ]
  }
]

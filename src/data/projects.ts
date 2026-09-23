export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  filters: string[];
  description: string;
  technologies: string[];
  features: string[];
  problem: string;
  solution: string;
  challenges: string;
  learned: string;
  colorScheme: 'mauve' | 'dark' | 'slate' | 'cream' | 'paper';
  stats: { label: string; value: string }[];
  codeSnippet?: {
    language: string;
    code: string;
    title: string;
  };
  demoType: 'chatbot' | 'robot' | 'calculator' | 'website' | 'database' | 'certificate';
  liveUrl?: string;
  githubUrl?: string;
  demoData?: {
    prompts?: { q: string; a: string; category: string }[];
    telemetry?: { battery: string; signal: string; sensor: string; cameraState: string };
    calcModes?: string[];
  };
};

export const projects: Project[] = [
  {
    id: 'college-assistance-chatbot',
    number: '01',
    title: 'College Assistance Chatbot',
    category: 'AI / NLP · Full Stack',
    badge: 'AI / NLP',
    filters: ['ALL', 'AI / NLP', 'PYTHON', 'WEB'],
    description: 'An AI-based college assistance chatbot designed to help students get information related to admissions, courses, campus facilities, placements, faculty, and other college-related queries.',
    technologies: ['Python', 'Flask', 'NLTK', 'React', 'Tailwind CSS', 'JSON', 'CSV'],
    features: [
      'NLP-based keyword processing & tokenization',
      'Instant admission assistance & eligibility guidance',
      'Placement records & top recruiter information',
      'Faculty profiles & department directories',
      'Campus facilities & hostel query resolution',
      'Voice search concept & Text-to-speech engine',
      'Admin dashboard with keyword rule manager',
      'Structured JSON/CSV knowledge base storage'
    ],
    problem: 'Students and parents constantly struggle with navigating college websites to find immediate, accurate details regarding admissions, fee structures, cut-offs, course syllabi, and placements.',
    solution: 'Engineered a conversational AI assistant with custom NLTK preprocessing and a Flask API backend connected to a structured college knowledge base, offering instant responses in under 200ms.',
    challenges: 'Handling noisy natural language inputs, synonyms, and overlapping query intentions while maintaining an easily updatable JSON/CSV knowledge base without database overhead.',
    learned: 'Gained solid hands-on experience integrating NLP tokenization pipelines, building RESTful Flask endpoints, managing asynchronous React states, and designing user-friendly chatbot flows.',
    colorScheme: 'mauve',
    stats: [
      { label: 'Query Response Time', value: '< 200ms' },
      { label: 'Knowledge Base Topics', value: '45+ Categories' },
      { label: 'Keyword Accuracy', value: '94.8%' },
    ],
    codeSnippet: {
      language: 'python',
      title: 'nlp_engine.py (Intent & Token Matcher)',
      code: `import nltk
from nltk.stem import WordNetLemmatizer
import json

lemmatizer = WordNetLemmatizer()

def process_query(user_text, knowledge_base):
    tokens = nltk.word_tokenize(user_text.lower())
    lemmas = [lemmatizer.lemmatize(t) for t in tokens if t.isalnum()]
    
    best_match = None
    max_score = 0
    for entry in knowledge_base['intents']:
        score = sum(1 for kw in entry['keywords'] if kw in lemmas)
        if score > max_score:
            max_score = score
            best_match = entry['response']
            
    return best_match or "I can help with Admissions, Placements, Courses, and Faculty."`
    },
    demoType: 'chatbot',
    demoData: {
      prompts: [
        { q: 'What is the B.Tech CSE eligibility criteria?', a: 'Eligibility: 10+2 with Physics & Math (min 50%) + valid MHT-CET / JEE score.', category: 'Admissions' },
        { q: 'What are the top placement statistics?', a: 'Top placement package: 12 LPA. Major recruiters include TCS, Infosys, Wipro, Capgemini, and Tech Mahindra.', category: 'Placements' },
        { q: 'What are the campus facility highlights?', a: 'Campus features high-speed Wi-Fi, 500+ seat digital library, modern robotics & AI labs, and separate sports complexes.', category: 'Campus' },
        { q: 'Who is the HOD for Computer Science?', a: 'Computer Science Department is led by senior faculty members with 15+ years of research and teaching experience.', category: 'Faculty' }
      ]
    }
  },
  {
    id: 'military-surveillance-robot',
    number: '02',
    title: 'Military Surveillance Robot',
    category: 'Embedded Systems · Robotics',
    badge: 'EMBEDDED SYSTEMS',
    filters: ['ALL', 'ROBOTICS'],
    description: 'A surveillance robot concept combining wireless communication, camera-based monitoring, motor control and sensor-based detection for hazardous terrain reconnaissance.',
    technologies: ['ESP32-CAM', 'ESP8266', 'L298N', 'BO Motors', 'SG90 Servo', '18650 Battery', 'Land Mine Sensor', 'Buzzer'],
    features: [
      'Wireless remote movement & dual-wheel differential drive',
      'Live camera surveillance stream with low latency',
      'Dual-axis servo-controlled pan/tilt camera positioning',
      'Proximity & simulated landmine sensor detection',
      'Audible buzzer & telemetry alarm system',
      'Compact chassis powered by rechargeable 18650 Li-ion cells'
    ],
    problem: 'Human reconnaissance in high-risk zones and unexplored perimeters poses severe danger to military personnel.',
    solution: 'Designed and built a modular surveillance robot using ESP32-CAM for live video streaming and ESP8266 Wi-Fi telemetry for safe, remote operator control.',
    challenges: 'Balancing motor power draw against the sensitive ESP32-CAM brownout thresholds and synchronizing real-time motor commands with continuous video streaming.',
    learned: 'Deepened practical knowledge of microcontrollers, PWM motor drivers, voltage regulation, power management, and hardware-software sensor interfaces.',
    colorScheme: 'dark',
    stats: [
      { label: 'Control Range', value: '80+ Meters' },
      { label: 'Stream Resolution', value: 'SVGA 30fps' },
      { label: 'Battery Runtime', value: '3.5 Hours' },
    ],
    codeSnippet: {
      language: 'cpp',
      title: 'surveillance_robot.ino (ESP32-CAM Stream & Motor Driver)',
      code: `// Dual H-Bridge & Video Streamer setup
#include "esp_camera.h"
#include <WiFi.h>

#define IN1 12
#define IN2 13
#define IN3 14
#define IN4 15
#define BUZZER_PIN 2

void executeCommand(char cmd) {
  switch(cmd) {
    case 'F': digitalWrite(IN1, HIGH); digitalWrite(IN3, HIGH); break;
    case 'B': digitalWrite(IN2, HIGH); digitalWrite(IN4, HIGH); break;
    case 'L': digitalWrite(IN2, HIGH); digitalWrite(IN3, HIGH); break;
    case 'R': digitalWrite(IN1, HIGH); digitalWrite(IN4, HIGH); break;
    case 'S': digitalWrite(IN1, LOW); digitalWrite(IN2, LOW); break;
    case 'A': tone(BUZZER_PIN, 1000, 500); break;
  }
}`
    },
    demoType: 'robot',
    demoData: {
      telemetry: { battery: '88%', signal: '-42 dBm (Strong)', sensor: 'CLEAR / NO THREAT', cameraState: 'STREAMING 1080P' }
    }
  },
  {
    id: 'amravati-ro-purifier',
    number: '03',
    title: 'Amravati RO Purifier Website',
    category: 'Web Development · Commercial UI',
    badge: 'WEB APPLICATION',
    filters: ['ALL', 'WEB'],
    description: 'A product-focused responsive website created for an RO water purifier business to showcase products, service plans, and provide customers with an accessible online experience.',
    technologies: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Interactive product catalog with spec comparisons',
      'Fully responsive, mobile-first design system',
      'Service booking & filter replacement inquiry form',
      'Customer reviews & warranty registration lookup',
      'High-performance asset optimization with Vite'
    ],
    problem: 'Local water purification businesses struggled to present their diverse multi-stage RO filter models and maintenance services online to potential retail clients.',
    solution: 'Built a sleek, high-conversion React application featuring structured product filters, technical specification cards, and an intuitive service inquiry pipeline.',
    challenges: 'Designing a lightweight, high-converting product showcase that loads instantly on slow 3G mobile networks without sacrificing visual appeal.',
    learned: 'Mastered component lifecycle optimization, Tailwind layout grids, accessible microinteractions, and Vite production bundle optimization.',
    colorScheme: 'slate',
    stats: [
      { label: 'Page Load Speed', value: '0.8s' },
      { label: 'Mobile Score', value: '98/100' },
      { label: 'Products Listed', value: '12+ Models' },
    ],
    demoType: 'website',
    liveUrl: 'https://ro-water-purifier-1.onrender.com/'
  },
  {
    id: 'student-profile-management',
    number: '04',
    title: 'Student Profile Management System',
    category: 'Web Development · Database & CRUD',
    badge: 'DATA WORKFLOW',
    filters: ['ALL', 'WEB', 'DATABASE'],
    description: 'A web-based student management system designed to manage student profiles, academic records, and related departmental information through a centralized interface.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Secure student registration & authentication system',
      'Comprehensive student profile CRUD operations',
      'Profile photograph uploads & file system handling',
      'Dual view modes: Interactive Grid & Data Table list',
      'Individual printable student profile dossier pages',
      'Role-based admin access control & search indexing'
    ],
    problem: 'Academic departments required a centralized, secure relational system to replace error-prone spreadsheets for student demographic and academic record management.',
    solution: 'Developed a robust PHP and MySQL portal with relational schema normalization, session security, photo upload handling, and instant search filtering.',
    challenges: 'Implementing secure SQL parameterization and sanitize routines to prevent SQL injection and cross-site scripting in user input fields.',
    learned: 'Gained solid understanding of relational database design (1NF, 2NF, 3NF), session authentication cookies, server-side data validation, and SQL queries.',
    colorScheme: 'cream',
    stats: [
      { label: 'Supported Records', value: '1,000+ Students' },
      { label: 'Query Performance', value: '< 15ms' },
      { label: 'Views Supported', value: 'Grid & Table' },
    ],
    demoType: 'database'
  },
  {
    id: 'scientific-calculator',
    number: '05',
    title: 'Scientific Calculator',
    category: 'C++ · Algorithms & Math Engine',
    badge: 'C++ LOGIC',
    filters: ['ALL', 'C++'],
    description: 'A high-performance scientific calculator built in C++ supporting a wide range of arithmetic, algebraic, trigonometric, statistical, and binary operations.',
    technologies: ['C++', 'Algorithms', 'Mathematical Operations', 'STL'],
    features: [
      'Full trigonometric, inverse, and hyperbolic functions',
      'Exponential, power, root, and logarithmic calculations',
      'Statistical operations: Mean, Standard Deviation, Variance',
      'Fractions arithmetic & decimal conversions',
      'Bitwise operations: AND, OR, XOR, NOT, Bit-shift',
      'Input validation & robust divide-by-zero error handling'
    ],
    problem: 'Scientific mathematical applications require robust error handling for edge cases such as division by zero, domain errors in logarithms, and overflow handling.',
    solution: 'Architected a modular C++ engine using object-oriented principles, structured error guards, and algorithmic precision routines.',
    challenges: 'Designing a clean command parser that smoothly validates input expressions and catches mathematical domain anomalies gracefully.',
    learned: 'Reinforced core C++ programming fundamentals, control structures, function overloading, memory management, and edge-case testing.',
    colorScheme: 'mauve',
    stats: [
      { label: 'Supported Functions', value: '30+ Ops' },
      { label: 'Execution Speed', value: '< 1ms' },
      { label: 'Precision', value: 'Double Precision' },
    ],
    demoType: 'calculator',
    demoData: {
      calcModes: ['Trig (sin, cos, tan)', 'Log & Power (log, ln, sqrt, x^y)', 'Statistics (mean, stdev)', 'Bitwise (AND, OR, XOR)']
    }
  },
  {
    id: 'certificate-management',
    number: '06',
    title: 'Certificate Management System',
    category: 'Database · Web Application & Archival',
    badge: 'RECORD SYSTEM',
    filters: ['ALL', 'DATABASE', 'WEB'],
    description: 'A database-driven system designed to organize, manage, verify, and retrieve student certificate records and credentials efficiently.',
    technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    features: [
      'Certificate record generation & unique identifier hashing',
      'Student credential verification portal',
      'Automated issue date & expiry tracking',
      'Centralized admin dashboard with batch export capabilities',
      'Instant search by student roll number, name, or certificate ID'
    ],
    problem: 'Paper-based certificate tracking and manual record verification led to delays and risks of credential misplacement or unauthorized alterations.',
    solution: 'Designed an organized web portal backed by MySQL database tables with indexing for instant certificate verification and audit tracking.',
    challenges: 'Creating unique verification tokens and designing an intuitive interface for both administrative staff and public verification queries.',
    learned: 'Strengthened expertise in relational schema indexing, administrative dashboard design, and secure database retrieval mechanisms.',
    colorScheme: 'paper',
    stats: [
      { label: 'Verification Speed', value: 'Instant (<50ms)' },
      { label: 'Integrity Verification', value: 'SHA Token' },
      { label: 'Audit Logging', value: '100% Tracked' },
    ],
    demoType: 'certificate'
  },
];

export const otherAcademicWork = [
  'Electrical Bicycle Concept & Power Transmission',
  'Wireless Notice Board with Real-Time Display',
  'Property Consultancy Web App & Listings',
  'Admission Assistance Decision System',
  'Relational Database Applications & CRUD Workflows',
];

export const skillCategories = [
  {
    id: 'programming',
    title: 'Programming',
    subtitle: 'Core languages for logic and system design',
    colorTheme: 'cream',
    skills: [
      { name: 'Python', level: 'Advanced', highlight: true },
      { name: 'C++', level: 'Core Logic', highlight: true },
      { name: 'JavaScript', level: 'ES6+', highlight: true },
      { name: 'PHP', level: 'Server-side', highlight: false },
      { name: 'SQL', level: 'Relational', highlight: true },
    ]
  },
  {
    id: 'web-dev',
    title: 'Web development',
    subtitle: 'Modern interfaces & scalable backends',
    colorTheme: 'dark',
    skills: [
      { name: 'React.js', level: 'Frontend', highlight: true },
      { name: 'Flask', level: 'Python API', highlight: true },
      { name: 'Node.js', level: 'Runtime', highlight: false },
      { name: 'Express.js', level: 'Backend', highlight: false },
      { name: 'HTML5 / CSS3', level: 'Semantics', highlight: false },
      { name: 'Tailwind CSS', level: 'Styling', highlight: true },
      { name: 'Vite', level: 'Bundler', highlight: false },
    ]
  },
  {
    id: 'data-db',
    title: 'Data & databases',
    subtitle: 'Data structures, storage & analytical pipelines',
    colorTheme: 'slate',
    skills: [
      { name: 'MySQL', level: 'Relational', highlight: true },
      { name: 'PyMySQL', level: 'Python Driver', highlight: false },
      { name: 'NumPy', level: 'Arrays', highlight: true },
      { name: 'Pandas', level: 'DataFrames', highlight: true },
      { name: 'NLTK', level: 'Natural Language', highlight: true },
      { name: 'Scikit-learn', level: 'ML Basics', highlight: true },
    ],
    footerNote: 'ACADEMIC EXPOSURE: TENSORFLOW • PYTORCH'
  },
  {
    id: 'core-tools',
    title: 'Core + tools',
    subtitle: 'Computer science fundamentals & modern workflow',
    colorTheme: 'mauve',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'Foundational', highlight: true },
      { name: 'OOP', level: 'Design Patterns', highlight: true },
      { name: 'DBMS', level: 'Architecture', highlight: false },
      { name: 'Operating Systems', level: 'Core', highlight: false },
      { name: 'Computer Networks', level: 'Protocols', highlight: false },
      { name: 'Software Engineering', level: 'SDLC', highlight: false },
    ],
    footerNote: 'GIT • GITHUB • VS CODE • NPM • VITE • POSTMAN • CHROME DEVTOOLS'
  }
];
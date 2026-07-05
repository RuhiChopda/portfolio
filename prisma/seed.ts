import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  // Admin
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 12)
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'chopdaruhi9@gmail.com' },
    update: { password: hash },
    create: { email: process.env.ADMIN_EMAIL || 'chopdaruhi9@gmail.com', password: hash, name: 'Ruhi Chopda' },
  })

  // Skills
  const skills = [
    { name: 'Python', category: 'Programming Languages', level: 90 },
    { name: 'JavaScript', category: 'Programming Languages', level: 85 },
    { name: 'TypeScript', category: 'Programming Languages', level: 80 },
    { name: 'C#', category: 'Programming Languages', level: 75 },
    { name: 'Java', category: 'Programming Languages', level: 72 },
    { name: 'C++', category: 'Programming Languages', level: 70 },
    { name: 'SQL', category: 'Programming Languages', level: 80 },
    { name: 'React.js', category: 'Frontend', level: 85 },
    { name: 'Next.js', category: 'Frontend', level: 80 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 85 },
    { name: 'HTML/CSS', category: 'Frontend', level: 90 },
    { name: 'Node.js', category: 'Backend', level: 80 },
    { name: 'Express.js', category: 'Backend', level: 78 },
    { name: 'FastAPI', category: 'Backend', level: 75 },
    { name: 'REST APIs', category: 'Backend', level: 85 },
    { name: 'PostgreSQL', category: 'Databases', level: 78 },
    { name: 'MongoDB', category: 'Databases', level: 75 },
    { name: 'MySQL', category: 'Databases', level: 75 },
    { name: 'TensorFlow', category: 'AI/ML', level: 72 },
    { name: 'PyTorch', category: 'AI/ML', level: 68 },
    { name: 'scikit-learn', category: 'AI/ML', level: 78 },
    { name: 'NLP', category: 'AI/ML', level: 70 },
    { name: 'Git & GitHub', category: 'Tools', level: 88 },
    { name: 'Unity', category: 'Tools', level: 78 },
    { name: 'Docker', category: 'Tools', level: 70 },
    { name: 'Vercel', category: 'Tools', level: 82 },
  ]

  for (let i = 0; i < skills.length; i++) {
    await prisma.skill.upsert({
      where: { id: `skill-${i}` },
      update: skills[i],
      create: { id: `skill-${i}`, ...skills[i], order: i },
    })
  }

  // Projects
  const projects = [
    {
      id: 'p1', title: 'AI-Powered Resume Analyzer', featured: true, category: 'AI/ML', order: 1,
      description: 'Full-stack app using NLP and ML to analyze resumes and provide ATS compatibility feedback.',
      techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'spaCy', 'Docker'],
      tags: ['NLP', 'Machine Learning', 'Full Stack'],
      githubUrl: 'https://github.com/RuhiChopda', liveUrl: '',
    },
    {
      id: 'p2', title: 'Real-Time Collaborative Code Editor', featured: true, category: 'Full Stack', order: 2,
      description: 'Web-based IDE with real-time collaboration, syntax highlighting, and multi-user WebSocket editing.',
      techStack: ['Next.js', 'TypeScript', 'Socket.io', 'Node.js', 'Redis', 'PostgreSQL'],
      tags: ['WebSockets', 'Real-time', 'Collaboration'],
      githubUrl: 'https://github.com/RuhiChopda', liveUrl: '',
    },
    {
      id: 'p3', title: 'Sentiment Analysis Dashboard', featured: true, category: 'AI/ML', order: 3,
      description: 'End-to-end ML pipeline for real-time sentiment analysis with interactive visualizations.',
      techStack: ['Python', 'BERT', 'React', 'FastAPI', 'MongoDB', 'Chart.js'],
      tags: ['BERT', 'NLP', 'Data Visualization'],
      githubUrl: 'https://github.com/RuhiChopda', liveUrl: '',
    },
    {
      id: 'p4', title: 'E-Commerce Platform', featured: false, category: 'Full Stack', order: 4,
      description: 'Full-featured e-commerce platform with cart, Stripe payments, and admin panel.',
      techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'NextAuth'],
      tags: ['E-commerce', 'Payment', 'SSR'],
      githubUrl: 'https://github.com/RuhiChopda', liveUrl: '',
    },
    {
      id: 'p5', title: 'DevConnect — Developer Networking', featured: false, category: 'Full Stack', order: 5,
      description: 'LinkedIn-style platform for developers with project showcases and skill matching.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
      tags: ['Social Network', 'Real-time'],
      githubUrl: 'https://github.com/RuhiChopda', liveUrl: '',
    },
    {
      id: 'p6', title: 'Stock Market Predictor', featured: false, category: 'AI/ML', order: 6,
      description: 'LSTM-based deep learning model for stock price prediction with forecasting dashboard.',
      techStack: ['Python', 'TensorFlow', 'Keras', 'pandas', 'Streamlit'],
      tags: ['Deep Learning', 'LSTM', 'Finance'],
      githubUrl: 'https://github.com/RuhiChopda', liveUrl: '',
    },
  ]

  for (const p of projects) {
    await prisma.project.upsert({ where: { id: p.id }, update: p, create: { ...p, status: 'ACTIVE' } })
  }

  // Experience
  await prisma.experience.upsert({
    where: { id: 'exp-1' },
    update: {},
    create: {
      id: 'exp-1', type: 'INTERNSHIP', title: 'Unity Developer Intern',
      organization: 'Company (Confidential)', location: 'Remote',
      startDate: new Date('2026-03-01'), current: true,
      description: 'Developing VR applications and interactive experiences using Unity and C#.',
      highlights: [
        'Developing VR applications and interactive experiences using Unity and C#.',
        'Implementing gameplay mechanics, UI systems, and immersive interactions.',
        'Working with XR Interaction Toolkit and Meta Quest deployment workflows.',
        'Testing, debugging, and optimizing application performance.',
        'Collaborating on feature development and deployment.',
      ],
      order: 1,
    },
  })

  await prisma.experience.upsert({
    where: { id: 'exp-2' },
    update: {},
    create: {
      id: 'exp-2', type: 'EDUCATION', title: 'BTech. Computer Engineering Softwar Engineering',
      organization: 'Jain University', location: 'Bangalore. Karnataka',
      startDate: new Date('2022-09-01'), endDate: new Date('2026-05-20'), current: false,
      description: 'Pursuing a B.Tech in Software Engineering with focus on full-stack development, AI/ML, and emerging technologies.',
      highlights: [], order: 2,
    },
  })

  // Certifications
  const certs = [
    { id: 'c1', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', issueDate: new Date('2024-03-01'), order: 1 },
    { id: 'c2', title: 'Machine Learning Specialization', issuer: 'Coursera / DeepLearning.AI', issueDate: new Date('2023-11-01'), order: 2 },
    { id: 'c3', title: 'Full Stack Web Development', issuer: 'The Odin Project', issueDate: new Date('2023-06-01'), order: 3 },
    { id: 'c4', title: 'Google Data Analytics Certificate', issuer: 'Google / Coursera', issueDate: new Date('2023-08-01'), order: 4 },
  ]
  for (const c of certs) {
    await prisma.certification.upsert({ where: { id: c.id }, update: c, create: c })
  }

  // Learning
  const learning = [
    { id: 'l1', title: 'System Design & Architecture', description: 'Distributed systems, microservices, and scalability principles.', progress: 65, order: 1 },
    { id: 'l2', title: 'Generative AI & LLM Fine-tuning', description: 'Prompt engineering, RAG architectures, and LoRA fine-tuning.', progress: 50, order: 2 },
    { id: 'l3', title: 'Kubernetes & Cloud-Native', description: 'Container orchestration and Helm charts.', progress: 40, order: 3 },
    { id: 'l4', title: 'Competitive Programming', description: 'DSA on LeetCode and Codeforces.', progress: 70, order: 4 },
  ]
  for (const l of learning) {
    await prisma.learningItem.upsert({ where: { id: l.id }, update: l, create: l })
  }

  // Config
  const configs = [
    { key: 'name', value: 'Ruhi Chopda' },
    { key: 'email', value: 'chopdaruhi9@gmail.com' },
    { key: 'github', value: 'https://github.com/RuhiChopda' },
    { key: 'linkedin', value: 'https://www.linkedin.com/in/ruhi-b-chopda-b70a94308/' },
    { key: 'location', value: 'Bangalore, India' },
    { key: 'tagline', value: 'Building intelligent software, one commit at a time.' },
    { key: 'about', value: "I'm a B.Tech Computer Engineering (Software Engineering) graduate from Jain University, Bangalore, passionate about building software that solves real problems. I specialize in full-stack development and AI/ML, and have hands-on experience as a Unity Developer Intern working on VR applications." },
    { key: 'goals', value: 'Currently seeking full-time software engineering roles where I can contribute, build impactful products, and grow alongside great engineers.' },
  ]
  for (const c of configs) {
    await prisma.siteConfig.upsert({ where: { key: c.key }, update: { value: c.value }, create: c })
  }

  console.log('✅ Seeded!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())

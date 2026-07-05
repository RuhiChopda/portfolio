import { prisma } from '@/lib/db/prisma'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Experience } from '@/components/sections/experience'
import { Education } from '@/components/sections/education'
import { Learning } from '@/components/sections/learning'
import { Contact } from '@/components/sections/contact'

export const revalidate = 300

async function getData() {
  try {
    const [projects, skills, experiences, learning, configArr] = await Promise.all([
      prisma.project.findMany({ where: { status: 'ACTIVE' }, orderBy: [{ featured: 'desc' }, { order: 'asc' }] }),
      prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      prisma.experience.findMany({ orderBy: { order: 'asc' } }),
      prisma.learningItem.findMany({ orderBy: { order: 'asc' } }),
      prisma.siteConfig.findMany(),
    ])
    const config = Object.fromEntries(configArr.map(c => [c.key, c.value]))
    return { projects, skills, experiences, learning, config }
  } catch {
    return { projects: [], skills: [], experiences: [], learning: [], config: {} }
  }
}

export default async function Page() {
  const { projects, skills, experiences, learning, config } = await getData()
  return (
    <>
      <Navbar />
      <main>
        <Hero config={config} />
        <About config={config} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Education />
        <Learning items={learning} />
        <Contact />
      </main>
      <Footer config={config} />
    </>
  )
}
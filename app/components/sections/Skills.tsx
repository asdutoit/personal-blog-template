'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Cloud Platforms & Infrastructure',
    skills: [
      { name: 'AWS', level: 95 },
      { name: 'GCP', level: 80 },
      { name: 'Kubernetes', level: 90 },
      { name: 'Terraform', level: 92 },
      { name: 'Docker', level: 88 },
    ]
  },
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'Go', level: 80 },
      { name: 'Bash', level: 85 },
    ]
  },
  {
    title: 'Frameworks & Technologies',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 85 },
      { name: 'Express/Fastify', level: 87 },
      { name: 'SolidJS', level: 75 },
    ]
  },
  {
    title: 'DevOps & Databases',
    skills: [
      { name: 'Jenkins', level: 85 },
      { name: 'GitHub Actions', level: 88 },
      { name: 'MongoDB', level: 87 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'DynamoDB', level: 80 },
    ]
  },
  {
    title: 'Monitoring & AI/ML',
    skills: [
      { name: 'Grafana/Prometheus', level: 88 },
      { name: 'ELK Stack', level: 82 },
      { name: 'CloudWatch', level: 90 },
      { name: 'Claude/ChatGPT', level: 85 },
      { name: 'N8N/LLM Integration', level: 80 },
    ]
  },
  {
    title: 'Networking & Legacy',
    skills: [
      { name: 'MPLS/VLAN', level: 92 },
      { name: 'Routing/Switching', level: 90 },
      { name: 'LAN/WAN Design', level: 88 },
      { name: 'Network Security', level: 85 },
      { name: 'Linux Administration', level: 87 },
    ]
  }
]

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-900 dark:text-gray-50">{name}</span>
        <span className="text-gray-600 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="h-full bg-linear-to-r from-primary-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
              Skills & Technologies
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Technologies I work with to build scalable and performant applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-xs border border-gray-200 dark:border-gray-800"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-8 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mr-3" />
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      index={skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-linear-to-r from-primary-50 to-purple-50 dark:from-primary-950 dark:to-purple-950 rounded-2xl p-8 border border-primary-100 dark:border-primary-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
                Always Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Technology evolves rapidly, and I&apos;m committed to continuous learning and innovation. 
                Currently exploring advanced AI/ML integrations, serverless architectures, 
                and cutting-edge cloud-native patterns to deliver intelligent, scalable solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
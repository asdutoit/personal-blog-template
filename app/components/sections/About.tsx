'use client'

import { motion } from 'framer-motion'
import { Code, Cloud, Users, Award, Network, Cpu } from 'lucide-react'

const highlights = [
  {
    icon: Cloud,
    title: 'Cloud & DevOps Engineering',
    description: 'Expert in AWS, Kubernetes, Terraform, and CloudFormation with 8+ years of experience'
  },
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'JavaScript, TypeScript, Python, Go, React.js, Next.js, Node.js, and modern frameworks'
  },
  {
    icon: Network,
    title: 'Network Engineering Background',
    description: 'Former network engineer with expertise in MPLS, VLAN, Routing, LAN, WAN configurations'
  },
  {
    icon: Cpu,
    title: 'AI & Machine Learning Integration',
    description: 'Actively integrating AI capabilities with Claude, ChatGPT, N8N, and LLM technologies'
  }
]

export function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
              About Me
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Senior Cloud, DevOps, and Software Engineer with 8+ years of experience designing 
              scalable cloud-native systems, backend services, and full stack applications.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-gray-600 dark:text-gray-400">
                My journey began as a network engineer, giving me a deep understanding of infrastructure 
                from physical networks to cloud-native architectures. I specialize in AWS, Kubernetes, 
                and Infrastructure as Code tools like Terraform, with a proven track record of reducing 
                infrastructure costs and implementing observability standards.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                I&apos;m passionate about innovation and performance optimization, actively integrating 
                AI and machine learning capabilities into workflows, applications, and projects to 
                enhance automation and drive intelligent solutions. My technical expertise spans 
                multiple programming languages including JavaScript, TypeScript, Python, Bash, and Go.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                I believe in delivering secure, maintainable systems and leading cloud transformation 
                projects. Whether it&apos;s implementing CI/CD pipelines with Jenkins and GitHub Actions, 
                working with databases like MongoDB and PostgreSQL, or setting up monitoring with 
                Grafana and Prometheus, I&apos;m committed to building solutions that scale.
              </p>
            </motion.div>

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-linear-to-br from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-500 flex items-center justify-center">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Building the future, one line at a time
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-500 rounded-full opacity-30 animate-bounce" />
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
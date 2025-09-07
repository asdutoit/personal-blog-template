# Blog Images Directory

This directory stores images used in your blog posts. Images are automatically optimized by Next.js for performance.

## Directory Structure

```
public/images/blog/
├── README.md                    # This file
├── placeholder-architecture.svg # Sample architecture diagram
├── placeholder-monitoring.svg   # Sample monitoring stack diagram
└── your-custom-images.jpg/png   # Your actual images
```

## Using Images in Blog Posts

### Markdown Syntax

```markdown
![Alt text description](/images/blog/your-image.jpg)
*Optional caption text below image*
```

### Example

```markdown
![Kubernetes Architecture](/images/blog/k8s-architecture.png)
*Figure 1: Production Kubernetes cluster with autoscaling enabled*
```

## Image Guidelines

### File Formats
- **SVG**: Best for diagrams, architecture illustrations (scalable)
- **PNG**: Screenshots, images with transparency
- **JPG**: Photos, complex images (smaller file size)
- **WebP**: Modern format with excellent compression (Next.js auto-converts)

### Naming Convention
- Use descriptive, URL-friendly names
- Include post slug for organization: `k8s-optimization-before-after.png`
- Use lowercase with hyphens: `aws-serverless-architecture.svg`

### File Size Optimization
- Keep images under 1MB when possible
- Use appropriate dimensions (max width ~1200px for blog content)
- Next.js automatically optimizes images on delivery

### Alt Text Best Practices
- Describe the image content clearly
- Include key information visible in the image
- Keep descriptions concise but informative
- Important for accessibility and SEO

## Sample Images Included

### 1. Architecture Diagram (`placeholder-architecture.svg`)
- Shows AWS EKS cluster setup
- Includes ALB, VPC, subnets, and RDS
- Perfect template for cloud architecture posts

### 2. Monitoring Stack (`placeholder-monitoring.svg`)
- Demonstrates observability setup
- Shows Grafana, Prometheus, ELK integration
- Great for DevOps and monitoring articles

## Creating Custom Images

### Architecture Diagrams
- **Tools**: draw.io, Lucidchart, or code-based tools like Mermaid
- **Style**: Clean, professional, consistent colors
- **Format**: SVG for scalability

### Screenshots
- Use consistent browser/terminal themes
- Highlight important areas with arrows or boxes
- Ensure text is readable at different sizes

### Code Diagrams
- **Tools**: Carbon (carbon.now.sh) for beautiful code snippets
- **Mermaid**: For flowcharts and sequence diagrams
- **PlantUML**: For UML diagrams

## Image Processing Tips

1. **Batch Resize**: Use tools like ImageOptim or online compressors
2. **SVG Optimization**: Use SVGO to reduce SVG file sizes
3. **Responsive Images**: Next.js handles this automatically
4. **Loading Performance**: Images are lazy-loaded by default

## SEO Considerations

- Use descriptive filenames that match your content
- Include relevant keywords in alt text naturally
- Consider image sitemaps for important diagrams
- Use structured data for technical diagrams when appropriate

## Example Usage in Different Content Types

### Technical Tutorials
```markdown
![Terminal Output](/images/blog/kubectl-output.png)
*Command output showing successful deployment*
```

### Architecture Posts
```markdown
![System Architecture](/images/blog/microservices-architecture.svg)
*High-level view of the microservices communication pattern*
```

### Performance Articles
```markdown
![Performance Metrics](/images/blog/grafana-dashboard.png)
*Before and after optimization metrics from Grafana*
```
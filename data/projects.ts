import { Project } from "@/types";

/**
 * Strategic Project Portfolio Data
 * Comprehensive case studies demonstrating systematic architecture
 */

export const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Automation Suite",
    category: "automation",
    description:
      "Complete order processing, inventory management, and customer communication automation system that scales with business growth.",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "Redis",
      "Celery",
      "AWS",
      "Docker",
    ],
    featured: true,
    tags: [
      "E-commerce",
      "Automation",
      "Scalability",
      "Integration",
      "Analytics",
    ],
    timeline: {
      duration: "6 weeks",
      startDate: "10-3-24",
      endDate: "11-4-24",
    },
    liveUrl: "https://example.com/ecommerce-demo",
    githubUrl: "https://github.com/christopher/ecommerce-automation",
    details: {
      overview:
        "Built a comprehensive automation system that handles the entire e-commerce workflow from order processing to customer follow-up. The system integrates with multiple sales channels and provides real-time analytics for business intelligence.",
      challenges:
        "Managing complex inventory synchronization across multiple sales channels while maintaining real-time accuracy. Handling high-volume order processing during peak seasons without system degradation.",
      solution:
        "Implemented event-driven architecture with message queues to ensure reliable processing and automatic error recovery. Used Redis for caching and PostgreSQL for persistent data storage with optimized queries.",
      results:
        "Reduced manual processing time by 85%, increased order accuracy to 99.7%, and enabled 24/7 automated operations. System now processes 10,000+ orders daily during peak seasons.",
      features: [
        "Automated order processing and fulfillment workflows",
        "Real-time inventory synchronization across channels",
        "Intelligent customer communication sequences",
        "Advanced analytics and reporting dashboard",
        "Multi-channel integration (Shopify, Amazon, eBay)",
        "Automated fraud detection and prevention",
        "Dynamic pricing optimization",
        "Automated supplier communications",
      ],
      timeline: {
        duration: "6 weeks",
        startDate: "10-3-24",
        endDate: "11-4-24",
      },
      client: "Mid-size retail company (50M+ annual revenue)",
    },
  },
  {
    id: 2,
    title: "Smart Analytics Dashboard",
    category: "web-apps",
    description:
      "Real-time business intelligence platform with predictive analytics, automated reporting, and interactive data visualizations.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "D3.js",
      "AWS",
      "Python",
      "TensorFlow",
    ],
    featured: true,
    tags: [
      "Analytics",
      "Machine Learning",
      "Real-time",
      "Dashboards",
      "Business Intelligence",
    ],
    timeline: {
      duration: "8 weeks",
      startDate: "09-1-24",
      endDate: "10-26-24",
    },
    liveUrl: "https://example.com/analytics-demo",
    githubUrl: "https://github.com/christopher/smart-analytics",
    details: {
      overview:
        "Developed a comprehensive analytics platform that transforms raw business data into actionable insights with predictive capabilities. The system processes data from multiple sources and provides real-time dashboards for strategic decision-making.",
      challenges:
        "Processing large datasets in real-time while maintaining responsive user interface and accurate predictions. Integrating disparate data sources with different formats and update frequencies.",
      solution:
        "Implemented efficient data pipeline with streaming analytics and progressive web app architecture for optimal performance. Used machine learning models for predictive analytics and caching strategies for real-time responses.",
      results:
        "Improved decision-making speed by 60%, identified $2M in cost-saving opportunities, and reduced reporting time from days to minutes. Executives now have real-time visibility into key metrics.",
      features: [
        "Real-time data visualization with interactive charts",
        "Predictive analytics engine with ML models",
        "Automated report generation and distribution",
        "Custom KPI tracking and alerting system",
        "Mobile-responsive progressive web application",
        "Data source integration API",
        "Role-based access control and permissions",
        "Scheduled data exports and API access",
      ],
      timeline: {
        duration: "8 weeks",
        startDate: "09-1-24",
        endDate: "10-26-24",
      },
      client: "Fortune 500 company",
    },
  },
  {
    id: 3,
    title: "API Integration Platform",
    category: "integrations",
    description:
      "Unified API gateway connecting 15+ third-party services with intelligent routing, monitoring, and automated failover.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "Node.js",
      "Express",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "Redis",
      "MongoDB",
    ],
    featured: false,
    tags: [
      "API Gateway",
      "Microservices",
      "Integration",
      "GraphQL",
      "Monitoring",
    ],
    timeline: {
      duration: "10 weeks",
      startDate: "07-15-24",
      endDate: "09-23-24",
    },
    githubUrl: "https://github.com/christopher/api-integration-platform",
    details: {
      overview:
        "Created a centralized integration platform that seamlessly connects multiple business systems and external APIs. The platform provides unified access to diverse services while handling authentication, rate limiting, and error recovery.",
      challenges:
        "Managing different API formats, rate limits, and ensuring high availability across diverse service providers. Handling authentication schemes and maintaining data consistency across systems.",
      solution:
        "Built intelligent routing system with automatic failover, caching, and rate limit management. Implemented GraphQL schema stitching for unified data access and containerized architecture for scalability.",
      results:
        "Reduced integration development time by 70%, improved system reliability to 99.9% uptime, and enabled rapid deployment of new integrations. API response times improved by 40%.",
      features: [
        "Unified API gateway with intelligent routing",
        "Automatic rate limit management and throttling",
        "Real-time monitoring and performance analytics",
        "GraphQL schema stitching for unified queries",
        "Automated failover and circuit breaker patterns",
        "Comprehensive logging and audit trails",
        "Developer portal with API documentation",
        "Webhook management and event streaming",
      ],
      timeline: {
        duration: "10 weeks",
        startDate: "07-15-24",
        endDate: "09-23-24",
      },
      client: "Technology startup",
    },
  },
  {
    id: 4,
    title: "AI Customer Support System",
    category: "automation",
    description:
      "Intelligent support automation handling 80% of customer inquiries with natural language processing and seamless human handoff.",
    thumbnail:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "Python",
      "TensorFlow",
      "FastAPI",
      "PostgreSQL",
      "WebSocket",
      "React",
      "OpenAI",
    ],
    featured: true,
    tags: [
      "Artificial Intelligence",
      "NLP",
      "Customer Support",
      "Automation",
      "Machine Learning",
    ],
    timeline: {
      duration: "12 weeks",
      startDate: "05-1-24",
      endDate: "07-26-24",
    },
    liveUrl: "https://example.com/ai-support-demo",
    githubUrl: "https://github.com/christopher/ai-customer-support",
    details: {
      overview:
        "Developed intelligent customer support system that automates responses while seamlessly escalating complex issues to human agents. The system understands context and maintains conversation history across multiple channels.",
      challenges:
        "Understanding diverse customer queries accurately and maintaining conversational context across multiple channels. Determining when to escalate to human agents while maintaining customer satisfaction.",
      solution:
        "Implemented NLP pipeline with context management and intelligent escalation triggers based on confidence scores. Used machine learning to continuously improve response accuracy and customer satisfaction.",
      results:
        "Reduced support response time by 90%, customer satisfaction increased to 4.8/5 stars, and support costs decreased by 60%. Human agents now focus on complex issues requiring expertise.",
      features: [
        "Natural language processing with context awareness",
        "Multi-channel support (chat, email, SMS, social)",
        "Intelligent escalation based on confidence scores",
        "Real-time analytics and conversation insights",
        "Seamless human agent handoff with full context",
        "Sentiment analysis and priority routing",
        "Knowledge base integration and management",
        "Automated follow-up and satisfaction surveys",
      ],
      timeline: {
        duration: "12 weeks",
        startDate: "05-1-24",
        endDate: "07-26-24",
      },
      client: "SaaS company (10,000+ customers)",
    },
  },
  {
    id: 5,
    title: "Enterprise Data Pipeline",
    category: "data",
    description:
      "Scalable ETL system processing 10TB+ daily with automated quality checks, monitoring, and real-time analytics.",
    thumbnail:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "Apache Airflow",
      "Spark",
      "Kafka",
      "Elasticsearch",
      "Docker",
      "Python",
      "AWS",
    ],
    featured: true,
    tags: [
      "Big Data",
      "ETL",
      "Data Pipeline",
      "Real-time Processing",
      "Quality Assurance",
    ],
    timeline: {
      duration: "14 weeks",
      startDate: "02-1-24",
      endDate: "05-10-24",
    },
    githubUrl: "https://github.com/christopher/enterprise-data-pipeline",
    caseStudyUrl: "https://example.com/data-pipeline-case-study",
    details: {
      overview:
        "Built enterprise-grade data pipeline that processes massive datasets with automated quality assurance and real-time monitoring. The system handles diverse data sources and provides clean, validated data for analytics and machine learning.",
      challenges:
        "Handling diverse data sources with varying formats and quality while ensuring data integrity at scale. Processing 10TB+ daily while maintaining sub-hour latency for critical business processes.",
      solution:
        "Designed modular pipeline architecture with parallel processing and comprehensive data validation frameworks. Implemented automated error handling, data quality monitoring, and scalable infrastructure on AWS.",
      results:
        "Improved data processing efficiency by 400% while reducing error rates to less than 0.1%. Data availability improved from 6 hours to 30 minutes, enabling real-time business decisions.",
      features: [
        "Automated ETL workflows with Apache Airflow",
        "Real-time data quality monitoring and validation",
        "Scalable parallel processing with Apache Spark",
        "Advanced error handling and automatic recovery",
        "Comprehensive audit trails and lineage tracking",
        "Real-time streaming with Apache Kafka",
        "Elasticsearch integration for fast querying",
        "Automated data cataloging and documentation",
      ],
      timeline: {
        duration: "14 weeks",
        startDate: "02-1-24",
        endDate: "05-10-24",
      },
      client: "Financial services firm",
    },
  },
  {
    id: 6,
    title: "Cloud Infrastructure Manager",
    category: "web-apps",
    description:
      "Infrastructure-as-Code platform with automated deployment, scaling, cost optimization, and security compliance.",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "Terraform",
      "Kubernetes",
      "AWS",
      "Prometheus",
      "Grafana",
      "Go",
      "React",
    ],
    featured: false,
    tags: [
      "Infrastructure as Code",
      "DevOps",
      "Cloud Management",
      "Cost Optimization",
      "Security",
    ],
    timeline: {
      duration: "16 weeks",
      startDate: "10-1-23",
      endDate: "01-19-24",
    },
    githubUrl: "https://github.com/christopher/cloud-infrastructure-manager",
    details: {
      overview:
        "Created comprehensive cloud infrastructure management system that automates deployment, monitoring, and cost optimization. The platform provides self-service infrastructure provisioning with built-in security and compliance.",
      challenges:
        "Managing complex multi-environment deployments while optimizing costs and maintaining security standards. Providing self-service capabilities without compromising governance and control.",
      solution:
        "Implemented Infrastructure-as-Code with automated scaling policies and intelligent cost monitoring algorithms. Built web-based interface for self-service provisioning with approval workflows and cost controls.",
      results:
        "Reduced infrastructure costs by 45% while improving deployment reliability and reducing setup time by 80%. Development teams can now provision environments in minutes instead of days.",
      features: [
        "Infrastructure-as-Code automation with Terraform",
        "Auto-scaling and intelligent load balancing",
        "Cost optimization algorithms and budget alerts",
        "Security compliance monitoring and remediation",
        "Multi-cloud deployment support (AWS, Azure, GCP)",
        "Self-service infrastructure provisioning portal",
        "Comprehensive monitoring with Prometheus/Grafana",
        "Automated backup and disaster recovery",
      ],
      timeline: {
        duration: "16 weeks",
        startDate: "10-1-23",
        endDate: "01-19-24",
      },
      client: "Enterprise corporation (500+ developers)",
    },
  },
  {
    id: 7,
    title: "Financial Trading Algorithm",
    category: "automation",
    description:
      "High-frequency trading system with real-time market analysis, risk management, and automated execution strategies.",
    thumbnail:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "C++",
      "Python",
      "Redis",
      "PostgreSQL",
      "WebSocket",
      "Docker",
      "Kubernetes",
    ],
    featured: false,
    tags: [
      "High-Frequency Trading",
      "Financial Technology",
      "Low Latency",
      "Risk Management",
      "Algorithmic Trading",
    ],
    timeline: {
      duration: "20 weeks",
      startDate: "05-1-23",
      endDate: "09-22-23",
    },
    details: {
      overview:
        "Built sophisticated trading system that analyzes market conditions in real-time and executes trades based on algorithmic strategies. The system includes comprehensive risk management and performance tracking.",
      challenges:
        "Processing market data with microsecond latency while managing risk and ensuring regulatory compliance. Handling high-frequency data streams and making split-second trading decisions.",
      solution:
        "Implemented low-latency architecture with optimized C++ core and Python strategy layer. Used Redis for ultra-fast data access and implemented comprehensive risk management algorithms.",
      results:
        "Achieved consistent 15-20% annual returns with maximum drawdown under 5%. System processes 1M+ market data points per second with sub-microsecond latency.",
      features: [
        "Real-time market data processing and analysis",
        "Multiple algorithmic trading strategies",
        "Comprehensive risk management and position sizing",
        "Real-time performance monitoring and alerting",
        "Regulatory compliance and audit trails",
        "Backtesting framework with historical data",
        "Multi-asset class support (stocks, forex, crypto)",
        "Integration with multiple brokers and exchanges",
      ],
      timeline: {
        duration: "20 weeks",
        startDate: "05-1-23",
        endDate: "09-22-23",
      },
      client: "Hedge fund",
    },
  },
  {
    id: 8,
    title: "Healthcare Management Platform",
    category: "web-apps",
    description:
      "HIPAA-compliant patient management system with telemedicine, scheduling, billing, and analytics capabilities.",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop&crop=entropy&auto=format",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "WebRTC",
      "AWS",
      "Redis",
      "Docker",
    ],
    featured: false,
    tags: [
      "Healthcare",
      "HIPAA Compliance",
      "Telemedicine",
      "Patient Management",
      "Security",
    ],
    timeline: {
      duration: "18 weeks",
      startDate: "01-15-23",
      endDate: "05-19-23",
    },
    liveUrl: "https://example.com/healthcare-demo",
    githubUrl: "https://github.com/christopher/healthcare-platform",
    details: {
      overview:
        "Developed comprehensive healthcare management platform that streamlines patient care, scheduling, and billing processes. The system includes secure telemedicine capabilities and integrates with existing healthcare systems.",
      challenges:
        "Ensuring HIPAA compliance while providing seamless user experience and integrating with legacy healthcare systems. Implementing secure video conferencing and handling sensitive patient data.",
      solution:
        "Built HIPAA-compliant architecture with end-to-end encryption and comprehensive audit logging. Implemented secure WebRTC for telemedicine and created integration APIs for existing systems.",
      results:
        "Improved patient satisfaction scores by 35%, reduced administrative overhead by 50%, and enabled 24/7 patient access to healthcare services. Practice efficiency increased by 40%.",
      features: [
        "HIPAA-compliant patient records management",
        "Secure telemedicine with video conferencing",
        "Automated scheduling and appointment reminders",
        "Integrated billing and insurance processing",
        "Prescription management and e-prescribing",
        "Patient portal with secure messaging",
        "Analytics dashboard for practice insights",
        "EHR integration and data synchronization",
      ],
      timeline: {
        duration: "18 weeks",
        startDate: "01-15-23",
        endDate: "05-19-23",
      },
      client: "Healthcare practice group",
    },
  },
];

/**
 * Strategic project categories with display information
 */
export const projectCategories = [
  {
    id: "all",
    label: "All Systems",
    description: "Complete portfolio of strategic solutions",
  },
  {
    id: "automation",
    label: "Process Automation",
    description: "Intelligent systems that work while you sleep",
  },
  {
    id: "web-apps",
    label: "Web Applications",
    description: "Scalable platforms for business growth",
  },
  {
    id: "data",
    label: "Data Systems",
    description: "Analytics and intelligence platforms",
  },
  {
    id: "integrations",
    label: "API Integrations",
    description: "Unified connectivity solutions",
  },
] as const;

/**
 * Get projects by category with optional filtering
 */
export function getProjectsByCategory(category?: string, featured?: boolean) {
  let filtered = projectsData;

  if (category && category !== "all") {
    filtered = filtered.filter((project) => project.category === category);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((project) => project.featured === featured);
  }

  return filtered;
}

/**
 * Get featured projects for homepage display
 */
export function getFeaturedProjects(limit?: number) {
  const featured = projectsData.filter((project) => project.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get project by ID
 */
export function getProjectById(id: number) {
  return projectsData.find((project) => project.id === id);
}

/**
 * Get related projects based on category and technologies
 */
export function getRelatedProjects(projectId: number, limit: number = 3) {
  const project = getProjectById(projectId);
  if (!project) return [];

  const related = projectsData
    .filter((p) => p.id !== projectId)
    .sort((a, b) => {
      // Prioritize same category
      const aSameCategory = a.category === project.category ? 1 : 0;
      const bSameCategory = b.category === project.category ? 1 : 0;

      if (aSameCategory !== bSameCategory) {
        return bSameCategory - aSameCategory;
      }

      // Then by shared technologies (handle undefined technologies arrays)
      const projectTech = project.technologies || [];
      const aTech = a.technologies || [];
      const bTech = b.technologies || [];

      const aSharedTech = aTech.filter((tech) =>
        projectTech.includes(tech)
      ).length;
      const bSharedTech = bTech.filter((tech) =>
        projectTech.includes(tech)
      ).length;

      return bSharedTech - aSharedTech;
    });

  return related.slice(0, limit);
}

const Projects = () => {
  const projects = [
    {
      title: 'Project 1',
      description: 'A web application built with React and TypeScript',
      image: 'https://via.placeholder.com/300x200',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      link: '#'
    },
    {
      title: 'Project 2',
      description: 'A responsive website with modern design',
      image: 'https://via.placeholder.com/300x200',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: '#'
    },
    {
      title: 'Project 3',
      description: 'A full-stack application with Firebase',
      image: 'https://via.placeholder.com/300x200',
      technologies: ['React', 'Firebase', 'Node.js'],
      link: '#'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="text-blue-600 hover:text-blue-800 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects 
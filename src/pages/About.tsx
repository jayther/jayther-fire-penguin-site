const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="prose lg:prose-xl">
        <p className="mb-4">
          Hello! I'm a passionate web developer with a keen interest in creating
          beautiful and functional web applications. I specialize in modern web
          technologies including React, TypeScript, and responsive design.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Skills</h2>
        <ul className="list-disc list-inside mb-6">
          <li>React & TypeScript</li>
          <li>HTML5 & CSS3</li>
          <li>Node.js</li>
          <li>Firebase</li>
          <li>Responsive Design</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4">Experience</h2>
        <p className="mb-4">
          With several years of experience in web development, I've worked on
          various projects ranging from small business websites to complex web
          applications. I'm always eager to learn new technologies and improve
          my skills.
        </p>
      </div>
    </div>
  );
};

export default About;

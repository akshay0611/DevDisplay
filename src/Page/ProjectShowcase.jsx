import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebouncer';
import projectsData from '../DB/projects.json';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Footer } from '../components/Footer/Footer';
import styled from 'styled-components'; // Import styled-components
import Marquee from 'react-fast-marquee'; // Import Marquee

const ProjectsPage = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const projectsPerPage = 9;

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const flattenedProjects = projectsData.flatMap((user) =>
      user.Projects.map((project) => ({
        ...project,
        username: user.github_username,
      })),
    );

    const shuffledProjects = shuffleArray(flattenedProjects);
    setAllProjects(shuffledProjects);
    setFilteredProjects(shuffledProjects);
    setVisibleProjects(shuffledProjects.slice(0, projectsPerPage));
  }, []);

  useEffect(() => {
    const filtered = allProjects.filter((project) =>
      project.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
    );
    setFilteredProjects(filtered);
    setVisibleProjects(filtered.slice(0, projectsPerPage));
  }, [debouncedSearchQuery, allProjects]);

  const loadMoreProjects = () => {
    if (isLoading || visibleProjects.length >= filteredProjects.length) return;
    setIsLoading(true);

    setTimeout(() => {
      const nextProjects = filteredProjects.slice(visibleProjects.length, visibleProjects.length + projectsPerPage);
      setVisibleProjects((prev) => [...prev, ...nextProjects]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        loadMoreProjects();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleProjects, isLoading, filteredProjects]);

  const Tags = () => {
    const tags = [
      'Web Development',
      'Mobile App Development',
      'Full-Stack Development',
      'Frontend Development',
      'Backend Development',
      'AI & Machine Learning',
      'Data Science & Analytics',
      'Blockchain & Web3',
      'Cybersecurity',
      'Cloud Computing',
      'DevOps & CI/CD',
      'IoT & Embedded Systems',
      'Game Development',
      'AR/VR & Metaverse',
      'Automation & Scripting',
      'Open Source Contributions',
      'Software Development',
      'Networking & Security',
      'Database & SQL',
      'NoSQL & MongoDB',
      'System Design & Architecture',
      'API Development',
      'SaaS & No-Code',
      'Big Data & Analytics',
      'Computer Vision',
      'NLP (Natural Language Processing)',
      'Robotics & Hardware',
      'AI-Powered Chatbots',
      'Cloud-Native Applications',
      'Data Engineering',
      'Quantum Computing',
      'Hackathon Winning',
      'Freelance & Client-Based',
      'Academic & Research-Based',
      'Enterprise-Level Applications',
      'Startup MVPs & Prototypes',
      'Tech for Social Good',
      'Smart Home & Automation',
      'Finance & FinTech',
      'Healthcare & MedTech',
      'E-Commerce & Marketplace',
      'EdTech & Learning Platform',
      'SaaS Platform Development',
      'DevTools & Productivity',
      'Portfolio & Personal Branding',
      'Resume Builder & Career Tools',
      'Competitive Programming & Algorithmic',
      'Low-Code & No-Code AI',
    ];

    return (
      <section id="tags" className="mb-0 w-full pt-12 sm:py-16">
        <h1 className="text-md text-primary mb-8 text-center font-bold text-[#00a6fb] lg:text-2xl">
          Explore amazing projects contributed by developers.
        </h1>
        {/* <h2 className="text-md text-primary mb-8 text-center text-[#00a6fb] font-bold lg:text-2xl">One Platform, Endless Tech Opportunities</h2> */}

        {/* Right to Left Scrolling */}
        <Marquee gradient={false} speed={60} pauseOnHover={true} loop={0} className="w-full">
          <div className="flex w-full flex-nowrap items-center">
            {[...tags, ...tags, ...tags].map((text, index) => (
              <span key={index} className="tag-item mr-6">
                {text}
              </span>
            ))}
          </div>
        </Marquee>

        <div className="my-4"></div>

        {/* Left to Right Scrolling */}
        <Marquee gradient={false} speed={60} pauseOnHover={true} loop={0} direction="right" className="w-full">
          <div className="flex w-full flex-nowrap items-center">
            {[...tags, ...tags, ...tags].map((text, index) => (
              <span key={index} className="tag-item mr-6">
                {text}
              </span>
            ))}
          </div>
        </Marquee>

        <style jsx>{`
          .tag-item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            padding: 0.5rem 1.5rem;
            border-radius: 9999px;
            border: 1px solid #00a6fb;
            background-color: rgba(1, 11, 31, 0.58);
            color: #e2e8f0;
            font-size: 0.915rem;
            text-align: center;
            min-width: max-content;
          }
        `}</style>
      </section>
    );
  };

  return (
    <div>
      <div className="background-wrapper1 min-h-screen bg-gray-900 p-6 text-white">
        <div className="flex w-full flex-col items-center justify-center px-8 text-center">
          <div className="my-6"></div>
          {/* <h1 className="mb-2 text-6xl font-bold tracking-widest md:text-4xl"><span className="text-[#00a6fb]">Unlock All Tech Opportunities in One Place</span></h1> */}
          <StyledWrapper>
            <div className="modgp relative inline-block w-full py-3">
              <div className="relative">
                <div className="bg-primary enabled:hover:bg-primary-dark enabled:active:bg-primary-dark enabled:focus:bg-primary-dark px-18 relative inline-flex w-full items-center justify-center rounded-lg py-5 text-6xl font-bold text-white transition-all focus:outline-none enabled:hover:shadow-md disabled:opacity-50">
                  <div className="flex w-full items-center justify-center">Project Display</div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0">
                <div id="style-AQliM" className="animate-magic-sparkle style-AQliM pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={8}
                    width={8}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-WCb99" className="animate-magic-sparkle style-WCb99 pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={11}
                    width={11}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-dBNZV" className="animate-magic-sparkle style-dBNZV pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={9}
                    width={9}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-tiisO" className="animate-magic-sparkle style-tiisO pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={8}
                    width={8}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-re9B7" className="animate-magic-sparkle style-re9B7 pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={11}
                    width={11}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-BKG4G" className="animate-magic-sparkle style-BKG4G pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={7}
                    width={7}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-NaoVe" className="animate-magic-sparkle style-NaoVe pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={8}
                    width={8}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-pwIlv" className="animate-magic-sparkle style-pwIlv pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={11}
                    width={11}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-QmcAd" className="animate-magic-sparkle style-QmcAd pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={7}
                    width={7}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
                <div id="style-VG2eL" className="animate-magic-sparkle style-VG2eL pointer-events-none absolute z-10">
                  <svg
                    style={{ filter: 'drop-shadow(rgb(96, 165, 250) 0px 0px 2px)' }}
                    fill="none"
                    viewBox="0 0 68 68"
                    height={11}
                    width={11}
                    className="animate-spin-slow"
                  >
                    <path
                      fill="white"
                      d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </StyledWrapper>
        </div>
        <Tags />
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white transition focus:outline-none focus:ring focus:ring-[#00a6fb]"
          />
        </div>
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-[#00a6fb] px-4 py-2 text-white transition-colors hover:bg-[#0089d2]"
          >
            Add Your Portfolio
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 text-white">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Your Projects!</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                  X
                </button>
              </div>

              <iframe
                src="https://tally.so/embed/wdRJar?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height="500px"
                frameBorder="0"
                title="Tally Form"
                className="rounded-lg"
              ></iframe>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}

          {isLoading && Array.from({ length: projectsPerPage }).map((_, index) => <LoadingSkeleton key={index} />)}
        </div>

        {!isLoading && visibleProjects.length >= filteredProjects.length && (
          <p className="mt-6 text-center text-gray-400">🎉 You've reached the end!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const { title, description, tech, github_url, username, maker_image, live_url } = project;

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-lg transition-all duration-300 hover:scale-105">
      <div className="mb-4 flex items-center">
        <img src={maker_image} alt={username} className="mr-4 h-10 w-10 rounded-full" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <p className="mb-4 text-sm text-gray-400">{description}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {tech.map((item, index) => (
          <span key={index} className="rounded bg-[#00a6fb33] px-2 py-1 text-xs font-medium text-[#00a6fb]">
            {item}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <a
          href={github_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center text-sm text-[#00a6fb] hover:underline"
        >
          <FaGithub className="mr-1" /> View on GitHub
        </a>
        {live_url && (
          <a
            href={github_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-sm text-[#00a6fb] hover:underline"
          >
            <FaExternalLinkAlt className="mr-1" /> View Live Demo
          </a>
        )}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-gray-400 hover:underline"
        >
          @{username}
        </a>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-lg">
      <div className="mb-4 h-6 w-3/4 rounded bg-gray-700"></div>
      <div className="mb-2 h-4 w-full rounded bg-gray-700"></div>
      <div className="mb-4 h-4 w-5/6 rounded bg-gray-700"></div>
      <div className="flex flex-wrap gap-2">
        <div className="h-6 w-16 rounded bg-gray-700"></div>
        <div className="h-6 w-12 rounded bg-gray-700"></div>
        <div className="h-6 w-20 rounded bg-gray-700"></div>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .relative {
    position: relative;
  }

  .inline-block {
    display: inline-block;
  }

  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  :backdrop {
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
  }

  .pointer-events-none {
    pointer-events: none;
  }

  .absolute {
    position: absolute;
  }

  .inset-0 {
    inset: 0;
  }

  button {
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    width: 300px !important;
  }

  button {
    text-transform: none;
  }

  button {
    cursor: pointer;
  }

  .inline-flex {
    display: inline-flex;
  }

  .justify-center {
    justify-content: center;
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .bg-primary {
    --tw-bg-opacity: 1;
    background-color: rgba(15, 27, 53, 0);
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .py-2\.5 {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
  }

  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .font-medium {
    font-weight: 500;
  }

  .text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }

  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }

  #style-AQliM.style-AQliM {
    top: 1%;
    left: 99%;
  }
  #style-WCb99.style-WCb99 {
    top: 7%;
    left: 1%;
  }
  #style-dBNZV.style-dBNZV {
    top: 93%;
    left: 23%;
  }
  #style-tiisO.style-tiisO {
    top: 43%;
    left: 15%;
  }
  #style-re9B7.style-re9B7 {
    top: 93%;
    left: 9%;
  }
  #style-BKG4G.style-BKG4G {
    top: 21%;
    left: 88%;
  }
  #style-NaoVe.style-NaoVe {
    top: 99%;
    left: 95%;
  }
  #style-pwIlv.style-pwIlv {
    top: 64%;
    left: 99%;
  }
  #style-QmcAd.style-QmcAd {
    top: 14%;
    left: 45%;
  }
  #style-VG2eL.style-VG2eL {
    top: 2%;
    left: 48%;
  }

  /* Keyframes for sparkle animation */
  @keyframes sparkle {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  /* Add animation to sparkle elements */
  .animate-magic-sparkle {
    animation: sparkle 2s infinite;
  }

  .style-AQliM {
    animation-delay: 0.5s;
  }
  .style-WCb99 {
    animation-delay: 0.33s;
  }
  .style-dBNZV {
    animation-delay: 0.6s;
  }
  .style-tiisO {
    animation-delay: 0.9s;
  }
  .style-re9B7 {
    animation-delay: 1.2s;
  }
  .style-BKG4G {
    animation-delay: 1.5s;
  }
  .style-NaoVe {
    animation-delay: 1.8s;
  }
  .style-pwIlv {
    animation-delay: 1.9s;
  }
  .style-QmcAd {
    animation-delay: 1.4s;
  }
  .style-VG2eL {
    animation-delay: 1.7s;
  }
`;

export default ProjectsPage;

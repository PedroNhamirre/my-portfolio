import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

interface CodeSection {
  code: string;
  delay: number;
}

const Portfolio = () => {
  const [typedCode, setTypedCode] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const codeContainerRef = useRef<HTMLDivElement | null>(null);

  const codeSections: CodeSection[] = [
    {
      code: `<span class="text-[#fa477a]">class</span> <span class="text-white">AboutMe</span> {`,
      delay: 0
    },
    {
      code: `\n  <span class="text-[#6EACDA]">name</span> = <span class="text-[#E2E2B6]">"Pedro Nhamirre"</span>;`,
      delay: 0
    },
    {
      code: `\n  <span class="text-[#6EACDA]">focus</span> = <span class="text-[#E2E2B6]">"Web and Mobile Development"</span>;`,
      delay: 20
    },
    {
      code: `\n  <span class="text-[#6EACDA]">status</span> = <span class="text-[#E2E2B6]">"Learning and building my path in tech"</span>;`,
      delay: 20
    },
    {
      code: `\n  <span class="text-[#6EACDA]">location</span> = <span class="text-[#E2E2B6]">"Mozambique"</span>;`,
      delay: 20
    },
    {
      code: `\n  <span class="text-[#6EACDA]">contact</span> = {`,
      delay: 20
    },
    {
      code: `\n    <span class="text-[#6EACDA]">LinkedIn</span>: <span class="text-[#E2E2B6]"><a href="https://www.linkedin.com/in/pedronhamirre" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-[#8AB4F8] transition">"linkedin.com/in/pedronhamirre"</a></span>,`,
      delay: 20
    },
    {
      code: `\n    <span class="text-[#6EACDA]">GitHub</span>: <span class="text-[#E2E2B6]"><a href="https://github.com/PedroNhamirre" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-[#8AB4F8] transition">"github.com/PedroNhamirre"</a></span>,`,
      delay: 20
    },
    {
      code: `\n    <span class="text-[#6EACDA]">E-mail</span>: <span class="text-[#E2E2B6]"><a href="mailto:pedrooliv62@gmail.com" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-[#8AB4F8] transition">"pedrooliv62@gmail.com"</a></span>`,
      delay: 20
    },
    { code: `\n  };`, delay: 20 },
    { code: `\n}`, delay: 20 },

    // Skills
    {
      code: `\n\n<span class="text-[#fa477a]">class</span> <span class="text-white">Skills</span> {`,
      delay: 100
    },
    {
      code: `\n  <span class="text-[#6EACDA]">languages</span> = <span class="text-[#E2E2B6]">["JavaScript", "Java", "Python", "PHP", "Kotlin", "HTML", "CSS"]</span>;`,
      delay: 20
    },
    {
      code: `\n  <span class="text-[#6EACDA]">libraries</span> = <span class="text-[#E2E2B6]">["React"]</span>;`,
      delay: 20
    },
    {
      code: `\n  <span class="text-[#6EACDA]">frameworks</span> = <span class="text-[#E2E2B6]">["Spring Boot", "Django", "Android", "Node.js", "Bootstrap", "Tailwind CSS"]</span>;`,
      delay: 20
    },
    {
      code: `\n  <span class="text-[#6EACDA]">databases</span> = <span class="text-[#E2E2B6]">["PostgreSQL", "MySQL"]</span>;`,
      delay: 20
    },
    {
      code: `\n  <span class="text-[#6EACDA]">tools</span> = <span class="text-[#E2E2B6]">["Docker", "Maven", "Git", "REST APIs", "Swagger"]</span>;`,
      delay: 20
    },
    { code: `\n}`, delay: 20 },

    // Projects
    {
      code: `\n\n<span class="text-[#fa477a]">class</span> <span class="text-white">Projects</span> {`,
      delay: 100
    },
    {
      code: `\n  <span class="text-[#6EACDA]">licenseInsight</span> = {`,
      delay: 20
    },
    {
      code: `\n    <span class="text-[#6EACDA]">name</span>: <span class="text-[#E2E2B6]">"License Insight"</span>,`,
      delay: 20
    },
    {
      code: `\n    <span class="text-[#6EACDA]">description</span>: <span class="text-[#E2E2B6]">"A web scraping tool to fetch driver's license data."</span>,`,
      delay: 20
    },
    {
      code: `\n    <span class="text-[#6EACDA]">tech</span>: <span class="text-[#E2E2B6]">["Python", "BeautifulSoup"]</span>,`,
      delay: 20
    },
    {
      code: `\n    <span class="text-[#6EACDA]">link</span>: <span class="text-[#E2E2B6]"><a href="https://github.com/PedroNhamirre/License-Insight-Scraper-API" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-[#8AB4F8] transition">"github.com/PedroNhamirre/License-Insight-Scraper-API"</a></span>`,
      delay: 20
    },
    { code: `\n  };`, delay: 20 },
    { code: `\n}`, delay: 20 }
  ];

  useEffect(() => {
    const lastTypedDate = localStorage.getItem("lastTypedDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastTypedDate === today) {
      // Já foi digitado hoje, mostra tudo de uma vez
      setTypedCode(codeSections.map(section => section.code).join(""));
      setShowCursor(false);
      return;
    }

    let currentText = "";
    const timeoutIds: NodeJS.Timeout[] = [];
    let sectionIndex = 0;

    const typeNextSection = () => {
      if (sectionIndex >= codeSections.length) {
        setShowCursor(false);
        localStorage.setItem("lastTypedDate", today);
        return;
      }

      const section = codeSections[sectionIndex];
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < section.code.length) {
          currentText += section.code[charIndex];
          setTypedCode(currentText);
          charIndex++;

          if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
          }

          timeoutIds.push(setTimeout(typeChar, 10));
        } else {
          sectionIndex++;
          timeoutIds.push(setTimeout(typeNextSection, section.delay));
        }
      };

      typeChar();
    };

    // Iniciar o typing diretamente (sem depender da aba estar visível)
    timeoutIds.push(setTimeout(typeNextSection, 800));

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);



  return (
    <div className="min-h-screen bg-[#0F111A] text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl border border-[#2A2F45] rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-[#1F2233] rounded-t-xl border-b border-[#2A2F45]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
            <h1 className="ml-3 text-sm font-medium text-white">PedroNhamirre.ts</h1>
          </div>
        </div>

        <div
          ref={codeContainerRef}
          className="p-4 font-jetbrains whitespace-pre-wrap bg-[#151824] text-white rounded-b-xl"
          style={{ minHeight: "calc(100vh - 210px)" }}
        >
          <code dangerouslySetInnerHTML={{ __html: typedCode }} />
          {showCursor && <span className="animate-blink">▌</span>}

        </div>
      </div>

      <div className="flex items-center gap-4 py-6 text-[#6EACDA] text-sm mt-4">
        <p className="font-bold">&copy;2025 Pedro Nhamirre. Todos os direitos reservados.</p>
        <a href="https://www.linkedin.com/in/pedronhamirre" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={20} className="hover:text-[#0a66c2] transition" />
        </a>
        <a href="https://github.com/PedroNhamirre" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} className="hover:text-white transition" />
        </a>
        <a href="mailto:pedrooliv62@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope size={20} className="hover:text-[#8AB4F8] transition" />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;

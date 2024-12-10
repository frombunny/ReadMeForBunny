import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { techStacks, toolStacks, infraStacks } from "../data/stackCategroy";

function ForIndividual() {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [techStack, setTechStack] = useState([]);
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectLink, setNewProjectLink] = useState("");
    const [newProjectPeriod, setNewProjectPeriod] = useState("");
    const [newProjectNotes, setNewProjectNotes] = useState("");
    const [solvedAcId, setSolvedAcId] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [readmeText, setReadmeText] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const updatedReadme = `
<div align="center">
<img src="https://capsule-render.vercel.app/api?type=wave&color=gradient&height=150&section=header&text=${encodeURIComponent(name || "Welcome!")}&fontSize=50" />
    
# 🌟 ${name || "Your Name"}
${bio ? `> ${bio}` : ""}
    
---
    
<br><br><br>
## 🔧 **Tech Stack**
### 🛠 **Skills**
${techStack
        .filter((stack) => techStacks.find((item) => item.name === stack && item.type === "Skill"))
        .map((stack) => `<img src="https://img.shields.io/badge/${encodeURIComponent(stack)}-blue?style=for-the-badge" alt="${stack}" />`)
        .join(" ")}
    
### 🛠 **Infra**
${techStack
        .filter((stack) => infraStacks.find((item) => item.name === stack))
        .map((stack) => `<img src="https://img.shields.io/badge/${encodeURIComponent(stack)}-blue?style=for-the-badge" alt="${stack}" />`)
        .join(" ")}
    
### 🛠 **Tools**
${techStack
        .filter((stack) => toolStacks.find((item) => item.name === stack))
        .map((stack) => `<img src="https://img.shields.io/badge/${encodeURIComponent(stack)}-blue?style=for-the-badge" alt="${stack}" />`)
        .join(" ")}
    
---
<br><br><br> 
## 💼 **Projects**
| **기간**      | **프로젝트명** | **링크**                       | **비고**     |
|--------------|--------------|--------------------------------------|------------|
${projects
        .map((project) => `| ${project.period} | ${project.name} | [GitHub Link](${project.link}) | ${project.notes || "-"} |`)
        .join("\n")}
    
---
   
<br><br><br>
## 📈 **Stats**

${githubUsername ? `
<img src="https://github-readme-stats.vercel.app/api?username=${githubUsername}&hide=contribs,prs&show_icons=true&theme=radical" alt="GitHub Stats" style="margin-bottom: 10px;" />
` : ""}
<br><br>
${githubUsername ? `
<a href="https://github.com/${githubUsername}">
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=radical" alt="Top Languages" />
</a>
    ` : ""}
<br><br>
${solvedAcId ? `
<img src="http://mazassumnida.wtf/api/v2/generate_badge?boj=${solvedAcId}" alt="Solved.ac Profile" style="margin-bottom: 10px;" />
` : ""}
<br><br><br>
## 📧 **Contact**
${email ? `- **Email**: ${email}` : ""}
${githubUsername ? `- **GitHub**: [${githubUsername}](https://github.com/${githubUsername})` : ""}

<br><br><br>
<img src="https://capsule-render.vercel.app/api?type=wave&color=gradient&height=150&section=footer"/>
<div align="center">
    `;
        setReadmeText(updatedReadme);
    }, [name, bio, techStack, projects, solvedAcId, githubUsername, email]);
    
    

    const addProject = () => {
        if (newProjectName && newProjectLink && newProjectPeriod) {
            setProjects([
                ...projects,
                {
                    name: newProjectName,
                    link: newProjectLink,
                    period: newProjectPeriod,
                    notes: newProjectNotes,
                },
            ]);
            setNewProjectName("");
            setNewProjectLink("");
            setNewProjectPeriod("");
            setNewProjectNotes("");
        }
    };

    const toggleTechStack = (stackName) => {
        if (techStack.includes(stackName)) {
            setTechStack(techStack.filter((stack) => stack !== stackName));
        } else {
            setTechStack([...techStack, stackName]);
        }
    };

    const copyReadme = () => {
        navigator.clipboard.writeText(readmeText);
        alert("리드미가 복사되었습니다! 이제 저에게 돈을 입금해쥬세용 ㅎㅎ");
    };

    return (
        <MainLayout>
            <Section>
                <h2>👤 개인 정보</h2>
                <Input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                    placeholder="자기 소개"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="GitHub 아이디"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="이메일 주소"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Section>
            <Section>
{/* Skills */}
<h2>❤️ Skills</h2>
<StackContainer>
    {techStacks
        .filter((stack) => stack.type === "Skill")
        .map((stackOption) => (
            <BadgeButton
                key={stackOption.name}
                selected={techStack.includes(stackOption.name)}
                onClick={() => toggleTechStack(stackOption.name)}
            >
                <img src={stackOption.badge} alt={stackOption.name} />
            </BadgeButton>
        ))}
</StackContainer>

{/* Tools */}
<h2>❤️ Tools</h2>
<StackContainer>
    {toolStacks.map((tool) => (
        <BadgeButton
            key={tool.name}
            selected={techStack.includes(tool.name)}
            onClick={() => toggleTechStack(tool.name)}
        >
            <img src={tool.badge} alt={tool.name} />
        </BadgeButton>
    ))}
</StackContainer>

{/* Infrastructure */}
<h2>❤️ Infra</h2>
<StackContainer>
    {infraStacks.map((infra) => (
        <BadgeButton
            key={infra.name}
            selected={techStack.includes(infra.name)}
            onClick={() => toggleTechStack(infra.name)}
        >
            <img src={infra.badge} alt={infra.name} />
        </BadgeButton>
    ))}
</StackContainer>
</Section>




            <Section>
                <h2>💼 프로젝트</h2>
                <Input
                    type="text"
                    placeholder="프로젝트 이름"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="프로젝트 링크"
                    value={newProjectLink}
                    onChange={(e) => setNewProjectLink(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="기간 (예: 2023.01 ~ 2023.06)"
                    value={newProjectPeriod}
                    onChange={(e) => setNewProjectPeriod(e.target.value)}
                />
                <Textarea
                    placeholder="비고 (선택 사항)"
                    value={newProjectNotes}
                    onChange={(e) => setNewProjectNotes(e.target.value)}
                />
                <Button onClick={addProject}>프로젝트 추가</Button>
            </Section>

            <Section>
                <h2>🎖 Solved.ac 연동</h2>
                <Input
                    type="text"
                    placeholder="Solved.ac 아이디"
                    value={solvedAcId}
                    onChange={(e) => setSolvedAcId(e.target.value)}
                />
            </Section>

            <Section>
                <h2>📋 README 생성</h2>
                <Textarea value={readmeText} readOnly rows="20"/>
                <Button onClick={copyReadme}>README 복사</Button>
            </Section>

            <Section>
                <h2>🔎 미리보기</h2>
                <ReadmePreview>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeText}</ReactMarkdown>
                </ReadmePreview>
            </Section>
        </MainLayout>
    );
}

export default ForIndividual;
const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  max-width: 900px;
  margin: auto;
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
`;

const Section = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  & h2 {
    font-size: 1.4rem;
    margin-bottom: 16px;
    color: #333333;
    border-bottom: 2px solid #fcb69f;
    display: inline-block;
    padding-bottom: 4px;
  }
`;

const Input = styled.input`
  width: 95%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 95%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #ff7f50; /* 코럴색으로 변경 */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #ff6347; /* 좀 더 어두운 코럴색으로 호버 효과 */
  }
`;

const BadgeButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 100px;
    border-radius: 8px;
  }

  ${(props) =>
    props.selected &&
    `
    outline: 2px solid #ff6347; /* 선택된 상태일 때 색상 강조 */
  `}
`;

const ReadmePreview = styled.div`
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
    overflow-x: auto; /* 가로 스크롤 허용 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  max-height: 400px; /* 최대 높이 설정 */
  white-space: pre-wrap; /* 줄 바꿈 허용 */
  word-wrap: break-word; /* 단어 단위로 줄 바꿈 */
`;

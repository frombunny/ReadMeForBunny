import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { techStacks, toolStacks } from "../data/stack";

function ForOrganization() {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);
    const [newMemberName, setNewMemberName] = useState("");
    const [newMemberGithub, setNewMemberGithub] = useState("");
    const [newMemberRole, setNewMemberRole] = useState("");
    const [features, setFeatures] = useState([]);
    const [newFeatureTitle, setNewFeatureTitle] = useState("");
    const [newFeatureDescription, setNewFeatureDescription] = useState("");
    const [frontendStack, setFrontendStack] = useState([]);
    const [backendStack, setBackendStack] = useState([]);
    const [frontendGuide, setFrontendGuide] = useState("");
    const [backendGuide, setBackendGuide] = useState("");
    const [tools, setTools] = useState([]);
    const [readmeText, setReadmeText] = useState("");
    const [startDate, setStartDate] = useState(""); // 개발 시작 날짜
    const [endDate, setEndDate] = useState(""); // 개발 종료 날짜
    const [includeFrontend, setIncludeFrontend] = useState(true);
    const [includeBackend, setIncludeBackend] = useState(true);

    const formatDate = (date) => {
        if (!date) return "미정";
        const [year, month, day] = date.split("-");
        return `${year}.${month}.${day}`;
    };

    useEffect(() => {
        const updatedReadme = `
# 🚀 ${projectName}
> 개발 기간 : ${startDate && endDate ? `${formatDate(startDate)} ~ ${formatDate(endDate)}` : "미정"} <br>
${projectDescription}
<br><br>
        
        
## 📝 주요 기능
${features.map(feature => `### ✨ ${feature.title}\n\n- ${feature.description.replace(/\n/g, "\n- ")}`).join('\n')}
<br><br>
    
        
## 👥 팀원 소개
    <table style="width: 100%; text-align: center; border-collapse: collapse;">
      <thead>
        <tr>
          ${teamMembers.map(member => `<th style="padding: 10px; border: 1px solid #ddd;">${member.name}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${teamMembers.map(member => `<td style="padding: 10px; border: 1px solid #ddd;"><img src="https://github.com/${member.github}.png" width="100"></td>`).join('')}
        </tr>
        <tr>
          ${teamMembers.map(member => `<td style="padding: 10px; border: 1px solid #ddd;"><a href="https://github.com/${member.github}" target="_blank">@${member.github}</a></td>`).join('')}
        </tr>
        <tr>
          ${teamMembers.map(member => `<td style="padding: 10px; border: 1px solid #ddd;">${member.role}</td>`).join('')}
        </tr>
      </tbody>
    </table>
    <br><br>
    
    
${includeFrontend && frontendStack.length > 0 ? `
## 🎨 프론트엔드 기술 스택
${frontendStack.map(stack => `<img src="https://img.shields.io/badge/${encodeURIComponent(stack)}-blue?style=for-the-badge" alt="${stack}" />`).join(" ")}
<br><br>
` : ""}
        
${includeBackend && backendStack.length > 0 ? `
## 🛠️ 백엔드 기술 스택
${backendStack.map(stack => `<img src="https://img.shields.io/badge/${encodeURIComponent(stack)}-blue?style=for-the-badge" alt="${stack}" />`).join(" ")}
<br><br>
` : ""}

        
## 💬 협업 툴
${tools.map(tool => `<img src="https://img.shields.io/badge/${encodeURIComponent(tool)}-blue?style=for-the-badge" alt="${tool}" />`).join(' ')}
<br><br>
    
        
## 🚀 시작 가이드
${includeFrontend ? `### 🖥️ 프론트엔드\n\`\`\`bash\n${frontendGuide || "작성되지 않았습니다."}\n\`\`\`` : ""}
${includeBackend ? `### 🖥️ 백엔드\n\`\`\`bash\n${backendGuide || "작성되지 않았습니다."}\n\`\`\`` : ""}
        `;
        setReadmeText(updatedReadme);
    }, [
        projectName,
        projectDescription,
        startDate,
        endDate,
        teamMembers,
        frontendStack,
        backendStack,
        tools,
        features,
        frontendGuide,
        backendGuide,
        includeFrontend, 
        includeBackend]
    );
    

    const addMember = () => {
        if (newMemberName && newMemberGithub && newMemberRole) {
            setTeamMembers([...teamMembers, { name: newMemberName, github: newMemberGithub, role: newMemberRole }]);
            setNewMemberName("");
            setNewMemberGithub("");
            setNewMemberRole("");
        }
    };

    const addFeature = () => {
        if (newFeatureTitle && newFeatureDescription) {
            setFeatures([...features, { title: newFeatureTitle, description: newFeatureDescription }]);
            setNewFeatureTitle("");
            setNewFeatureDescription("");
        }
    };

    const toggleStack = (stackList, setStackList, stackName) => {
        if (stackList.includes(stackName)) {
            setStackList(stackList.filter((s) => s !== stackName));
        } else {
            setStackList([...stackList, stackName]);
        }
    };

    const copyReadme = () => {
        navigator.clipboard.writeText(readmeText);
        alert("복사되었습니다. 이용하셨으니 저에게 100원 입금해쥬세요 ㅋ");
    };

    return (
        <MainLayout>
             <Section>
                <h2>🌟 프로젝트 정보</h2>
                <input
                    type="text"
                    placeholder="프로젝트 이름"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    style={{ width: "90%", marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                <textarea
                    placeholder="프로젝트 간단한 소개"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows="3"
                    style={{ width: "90%", marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="date"
                        placeholder="시작 날짜"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                    />
                    <input
                        type="date"
                        placeholder="종료 날짜"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                    />
                </div>
            </Section>

            <Section>
                <h2>👤 팀원 추가</h2>
                <StackContainer>
                <input
                    type="text"
                    placeholder="이름"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    style={{ width: "25%", marginRight: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                <input
                    type="text"
                    placeholder="GitHub 아이디"
                    value={newMemberGithub}
                    onChange={(e) => setNewMemberGithub(e.target.value)}
                    style={{ width: "25%", marginRight: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                <input
                    type="text"
                    placeholder="역할"
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    style={{ width: "25%", marginRight: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                
                <Button onClick={addMember}>추가</Button>
                </StackContainer>
                <TeamList>
                    {teamMembers.map((member, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <strong>{member.name}</strong> - <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer">@{member.github}</a> - {member.role}
                        </li>
                    ))}
                </TeamList>
            </Section>

            <Section>
                <h2>📌 주요 기능</h2>
                <StackContainer>
                <input
                    type="text"
                    placeholder="기능 제목 입력"
                    value={newFeatureTitle}
                    onChange={(e) => setNewFeatureTitle(e.target.value)}
                    style={{ width: "90%", marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                <textarea
                    placeholder="기능 설명 입력"
                    value={newFeatureDescription}
                    onChange={(e) => setNewFeatureDescription(e.target.value)}
                    rows="3"
                    style={{ width: "90%", marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
                <Button onClick={addFeature}>추가</Button>
                <FeatureList>
                    {features.map((feature, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <strong>{feature.title}</strong>: {feature.description}
                        </li>
                    ))}
                </FeatureList>
                </StackContainer>
            </Section>

            <Section>
                <h2>🖥️ 포함할 섹션</h2>
                <StackContainer>
                <label>
                    <input
                        type="checkbox"
                        checked={includeFrontend}
                        onChange={(e) => setIncludeFrontend(e.target.checked)}
                    />
                    프론트엔드 포함
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={includeBackend}
                        onChange={(e) => setIncludeBackend(e.target.checked)}
                    />
                    백엔드 포함
                </label>
                </StackContainer>
            </Section>

            {includeFrontend && (        
            <Section>
                <h2>🎨 프론트엔드 기술 스택</h2>
                <StackContainer>
                {techStacks.map((stackOption) => (
                    <BadgeButton
                        key={stackOption.name}
                        selected={frontendStack.includes(stackOption.name)}
                        onClick={() => toggleStack(frontendStack, setFrontendStack, stackOption.name)}
                    >
                        <img src={stackOption.badge} alt={stackOption.name} />
                    </BadgeButton>
                ))}
                </StackContainer>
                <h2>🚀 프론트엔드 시작 가이드</h2>
                <textarea
                    value={frontendGuide}
                    onChange={(e) => setFrontendGuide(e.target.value)}
                    rows="5"
                    style={{ width: "100%", border: "1px solid #ccc", borderRadius: "8px" }}
                    placeholder="프론트엔드 시작 가이드를 작성하세요..."
                />
            </Section>
            )}
            {includeBackend && (
            <Section>
                <h2>🛠️ 백엔드 기술 스택</h2>
                <StackContainer>
                {techStacks.map((stackOption) => (
                    <BadgeButton
                        key={stackOption.name}
                        selected={backendStack.includes(stackOption.name)}
                        onClick={() => toggleStack(backendStack, setBackendStack, stackOption.name)}
                    >
                        <img src={stackOption.badge} alt={stackOption.name} />
                    </BadgeButton>
                ))}
                </StackContainer>
                <h2>🚀 백엔드 시작 가이드</h2>
                <textarea
                    value={backendGuide}
                    onChange={(e) => setBackendGuide(e.target.value)}
                    rows="5"
                    style={{ width: "100%", border: "1px solid #ccc", borderRadius: "8px" }}
                    placeholder="백엔드 시작 가이드를 작성하세요..."
                />
            </Section>
            )}

            <Section>
                <h2>💬 협업 툴</h2>
                <StackContainer>
                {toolStacks.map((toolOption) => (
                    <BadgeButton
                        key={toolOption.name}
                        selected={tools.includes(toolOption.name)}
                        onClick={() => toggleStack(tools, setTools, toolOption.name)}
                    >
                        <img src={toolOption.badge} alt={toolOption.name} />
                    </BadgeButton>
                ))}
                </StackContainer>
            </Section>

            <Section>
                <h2>📋 README 작성 및 복사</h2>
                <textarea
                    value={readmeText}
                    onChange={(e) => setReadmeText(e.target.value)}
                    rows="15"
                    style={{ width: "100%", border: "1px solid #ccc", borderRadius: "8px" }}
                    placeholder="README 내용을 작성하거나 수정하세요..."
                />
                <Button onClick={copyReadme}>README 복사</Button>
            </Section>
            <Section>
                <h2>🔎 README 미리보기</h2>
                <ReadmePreview>
                    <MarkdownPreview>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeText}</ReactMarkdown>
                </MarkdownPreview>
                </ReadmePreview>
            </Section>
        </MainLayout>
    );
}

export default ForOrganization;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  max-width: 900px;
  margin: auto;
  background: linear-gradient(135deg, #ffd1dc, #fbc2eb); /* 더 핑크빛 */
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
`;

const Section = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  & h2 {
    font-size: 1.4rem;
    margin-bottom: 16px;
    color: #333333;
    border-bottom: 2px solid #ff69b4;
    display: inline-block;
    padding-bottom: 4px;
  }
`;

const ReadmePreview = styled.pre`
  background: linear-gradient(135deg, #ffd1dc, #fbc2eb); /* 더 핑크빛 */
  padding: 20px;
  border-radius: 12px;
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid #d0e3fa;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #ff69b4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #ff85c0;
    transform: translateY(-2px);
  }

  &:active {
    background: #ff4d94;
    transform: translateY(0);
  }
`;

const BadgeButton = styled.button`
  border: none;
  background: none;
  padding: 8px;
  cursor: pointer;
  margin: 4px;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;

  img {
    width: 100px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:hover img {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    props.selected &&
    `
    outline: 2px solid #ff69b4;
  `}
`;

const TeamList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & li {
    background: linear-gradient(135deg, #ffd1dc, #fbc2eb); /* 더 핑크빛 */
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  & li a {
    color: #ff69b4;
    text-decoration: none;
    font-weight: bold;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;

  & li {
    background: linear-gradient(135deg, #ffd1dc, #fbc2eb); /* 더 핑크빛 */
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const MarkdownPreview = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  line-height: 1.6;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
    text-align: center;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f4f4f4;
  }
`;

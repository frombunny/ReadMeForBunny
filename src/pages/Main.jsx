import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Main() {
    return (
        <MainLayout>
            <h1>README FOR BUNNY</h1>
            <CardWrapper>
            <OrganizationCard to="/ForOrganization">
                <CardText>Organization README 만들기</CardText>
            </OrganizationCard>
            <RepositoryCard to="/RepositoryReadme">
                <CardText>Repository README 만들기</CardText>
            </RepositoryCard>
            <IndividualCard to="/IndividualReadme">
                <CardText>개인용 README 만들기</CardText>
            </IndividualCard>
            </CardWrapper>
        </MainLayout>
    );
}

export default Main;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw; 
  height: 100vh; 
  gap: 30px; 
`;

const CardWrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px; 
`;

const Card = styled(Link)`
  flex: 1;
  width: 300px;
  height: 200px; 
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px; 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); 
  transition: transform 0.3s, box-shadow 0.3s;
  color: #ffffff;
  text-decoration: none; 
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    transform: translateY(-10px); 
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3); 
  }
`;

const OrganizationCard = styled(Card)`
  background: linear-gradient(to bottom, #a1c4fd, #c2e9fb);
`;

const RepositoryCard = styled(Card)`
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
`;

const IndividualCard = styled(Card)`
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
`;

const CardText = styled.div`
  text-align: center;
`;

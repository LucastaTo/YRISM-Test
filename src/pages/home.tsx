import React from "react";
import Content from "../layouts/content";
import SEO from "../components/seo";
import Home from "../containers/home";
import { Container } from "../components/grid";

const ListEmployees: React.FC = () => {
    return (
        <Content>
            <SEO />
            <Container>
                <Home />
            </Container>
        </Content>
    );
};

export default ListEmployees;

import React from "react";
import Content from "../../../layouts/content";
import SEO from "../../../components/seo";
import MainListEmployees from "../../../containers/apps/list";
import { Container } from "../../../components/grid";

const ListEmployees: React.FC = () =>  (
        <Content>
            <SEO />
            <Container>
                <MainListEmployees />
            </Container>
        </Content>
    );

export default ListEmployees;

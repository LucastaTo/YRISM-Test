import React from "react";
import Content from "../../../layouts/content";
import SEO from "../../../components/seo";
import MainCreateEmployee from "../../../containers/apps/create";
import { Container } from "../../../components/grid";

const CreateEmployee: React.FC = () =>  (
        <Content>
            <SEO />
            <Container>
                <MainCreateEmployee />
            </Container>
        </Content>
    );

export default CreateEmployee;

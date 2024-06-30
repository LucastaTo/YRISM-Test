import React from 'react';
import { Container } from 'styled-bootstrap-grid';

export type StyledContainerProps = {
    p?: string;
    pl?: string;
    pr?: string;
    pt?: string;
    pb?: string;
    m?: string;
    ml?: string;
    mr?: string;
    mt?: string;
    mb?: string;
};

const StyledContainer: React.FC<React.PropsWithChildren<StyledContainerProps>> = ({
    p,
    pl,
    pr,
    pt,
    pb,
    m,
    ml,
    mr,
    mt,
    mb,
    children,
    ...props
}) => {
    // Tailwind CSS classes based on props
    const containerClasses = `
        ${p && `p-${p}`}
        ${pl && `pl-${pl}`}
        ${pr && `pr-${pr}`}
        ${pt && `pt-${pt}`}
        ${pb && `pb-${pb}`}
        ${m && `m-${m}`}
        ${ml && `ml-${ml}`}
        ${mr && `mr-${mr}`}
        ${mt && `mt-${mt}`}
        ${mb && `mb-${mb}`}
    `;

    return (
        <Container className={containerClasses} {...props}>
            {children}
        </Container>
    );
};

export default StyledContainer;

import React from 'react';
import { Row } from 'styled-bootstrap-grid'; // Assuming Row is imported correctly
import { StyledContainerProps } from './container';

type StyledRowProps = {
    gutters?: number;
    noGutter?: boolean;
}  & StyledContainerProps;

const StyledRow: React.FC<React.PropsWithChildren<StyledRowProps>> = ({
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
    gutters,
    noGutter,
    children,
    ...props
}) => {
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

    const gutterStyles = gutters
        ? `
            ml-${-gutters / 2} mr-${-gutters / 2}
            ${noGutter ? 'pl-0 pr-0' : ''}
          `
        : '';

    return (
        <Row className={`${containerClasses} ${gutterStyles}`} {...props}>
            {children}
        </Row>
    );
};

export default StyledRow;

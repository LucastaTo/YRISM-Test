import React from 'react';
import { Col } from 'styled-bootstrap-grid'; // Assuming Col is imported correctly
import { StyledContainerProps } from './container';

type StyledColProps = {
    textAlign?: string;
} & StyledContainerProps;

const StyledCol: React.FC<React.PropsWithChildren<StyledColProps>> = ({
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
    textAlign,
    children,
    ...props
}) => {
    const colClasses = `
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
        ${textAlign ? `text-${textAlign}` : ''}
    `;

    return (
        <Col className={`${colClasses}`} {...props}>
            {children}
        </Col>
    );
};

export default StyledCol;

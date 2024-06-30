import React, { FC } from "react";

interface Props {
  }

const Content: FC<React.PropsWithChildren<Props>> = ({children}) => {

    return (
        <div className="container mx-auto px-4">
            {children}
        </div>
    )
}

export default Content
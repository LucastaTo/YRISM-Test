import { FC } from "react";
import SkeletonComponent, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading: FC<SkeletonProps> = (props) => {
    return <SkeletonComponent {...props} />;
};

export default SkeletonLoading;

import {ReactNode} from "react";

interface AboutLayoutProps {
    children?: ReactNode;
}

const AboutLayout = ({children} : AboutLayoutProps) => {
    return <section>{children}</section>
}

export default AboutLayout;
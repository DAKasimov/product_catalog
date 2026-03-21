import {ReactNode} from "react";

interface IngredientsLayoutProps {
    children?: ReactNode;
}

const IngredientsLayout = ({children} : IngredientsLayoutProps) => {
    return <section>{children}</section>
}

export default IngredientsLayout;
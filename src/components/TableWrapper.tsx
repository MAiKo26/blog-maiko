// fix this children type :

import { ReactNode } from "react";

type ChildrenType = ReactNode | ReactNode[];
const TableWrapper = ({ children }: { children: ChildrenType }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  );
};

export default TableWrapper;

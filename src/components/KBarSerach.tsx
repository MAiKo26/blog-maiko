// components/KBarSearch.tsx
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
} from "kbar";

const KBarSearchUI = () => {
  const { results } = useMatches();

  return (
    <KBarPortal>
      <KBarPositioner className="z-50 bg-black/70">
        <KBarAnimator className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
          <KBarSearch className="w-full rounded-md border border-gray-300 p-2 text-sm" />
          <ul>
            {results.map((item, index) =>
              typeof item === "string" ? (
                <li key={index} className="p-2 text-xs font-semibold uppercase">
                  {item}
                </li>
              ) : (
                <li
                  key={item.id}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {item.name}
                </li>
              ),
            )}
          </ul>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default KBarSearchUI;

import { FrontMatter, Series } from "@/interfaces/posts-interface";
import { PostSeriesBox } from "./SeriesCard";
import { getAllFrontMatters } from "@/lib/actions";

interface SeriesCardWrapperProps {
  currentSerie: Series;
}

async function SeriesCardWrapper({ currentSerie }: SeriesCardWrapperProps) {
  const allFrontMatters: FrontMatter[] = await getAllFrontMatters();
  return (
    <PostSeriesBox
      currentSerie={currentSerie}
      allFrontMatters={allFrontMatters}
    />
  );
}
export default SeriesCardWrapper;

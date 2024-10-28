import { Animanga, Tech , Tvshows} from "contentlayer/generated";
import { CoreContent } from "pliny/utils/contentlayer.js";

export function DateFilteringHelper(post:CoreContent<Animanga | Tech | Tvshows>[]){
    return post.filter((post)=>{
        const {date} = post;
        const BlogDate = new Date(date);
        const Today =  new Date();            
        return BlogDate <= Today 
      })
}
import { posts } from "../../../content/index";

export function onBeforePrerenderStart() {
  return posts.map((post) => `/blog/${post.slug}`);
}

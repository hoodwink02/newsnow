import { defineSource } from '~/server/utils/source';

interface RedditPost {
  data: {
    title: string;
    url: string;
    id: string;
    subreddit: string;
    author: string;
    score: number;
    num_comments: number;
  };
}

export default defineSource(async () => {
  const response = await fetch('https://www.reddit.com/r/popular.json');
  const json: { data: { children: RedditPost[] } } = await response.json();
  return json.data.children.map((post) => {
    return {
      id: post.data.id,
      title: post.data.title,
      url: `https://www.reddit.com${post.data.url}`,
      mobileUrl: `https://www.reddit.com${post.data.url}`,
      extra: {
        subreddit: post.data.subreddit,
        author: post.data.author,
        score: post.data.score,
        num_comments: post.data.num_comments,
      },
    };
  });
});

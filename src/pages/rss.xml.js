import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  const writingPosts = await pagesGlobToRssItems(
    import.meta.glob('./writing/**/*.{md,mdx}')
  );
  const archivePosts = await pagesGlobToRssItems(
    import.meta.glob('./archive/**/*.{md,mdx}')
  );

  const items = [...writingPosts, ...archivePosts].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return rss({
    title: 'Cal Seagram',
    description: 'Writing and archive from Cal Seagram',
    site: context.site,
    items,
  });
}

import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
  const writingImports = import.meta.glob('./writing/**/*.{md,mdx}', { eager: true });
  const archiveImports = import.meta.glob('./archive/**/*.{md,mdx}', { eager: true });

  const allPosts = [
    ...Object.values(writingImports),
    ...Object.values(archiveImports),
  ];

  const items = await Promise.all(
    allPosts.map(async (post) => {
      // compiledContent() is only available for .md files, not .mdx
      const content = post.compiledContent
        ? sanitizeHtml(await post.compiledContent())
        : undefined;

      return {
        title: post.frontmatter.title,
        pubDate: post.frontmatter.pubDate,
        link: post.url,
        content,
      };
    })
  );

  items.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return rss({
    title: 'Cal Seagram',
    description: 'Writing and archive from Cal Seagram',
    site: context.site,
    items,
  });
}

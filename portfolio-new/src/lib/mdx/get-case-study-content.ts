/**
 * Dynamically import case study MDX content
 *
 * Returns the MDX component for a given case study slug
 * Returns null if no content exists for the slug
 */
export async function getCaseStudyContent(slug: string) {
  try {
    // Dynamically import the MDX file for this case study
    const mdxModule = await import(
      `@/content/case-studies/${slug}.mdx`
    )
    return mdxModule.default
  } catch (error) {
    // Return null if no MDX file exists for this case study
    return null
  }
}

/**
 * Check if a case study has MDX content
 */
export async function hasCaseStudyContent(slug: string): Promise<boolean> {
  try {
    await import(`@/content/case-studies/${slug}.mdx`)
    return true
  } catch {
    return false
  }
}

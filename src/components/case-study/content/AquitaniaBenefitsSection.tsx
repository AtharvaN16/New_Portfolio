'use client'

const CUNARD_GOLD = '#A39458'

const BUSINESS_BENEFITS = [
  'Faster handoffs between designers and developers',
  'Makes onboarding and team training easier',
  'Improved coordination, clearer communication, and greater consistency across teams',
  'Helps ensure accessibility standards are met across teams',
]

const USER_BENEFITS = [
  'Builds trust through a cohesive and polished brand experience',
  'Improves usability through standardized interactions and patterns',
  'Enables faster access to information and key tasks',
  'Enhances accessibility and inclusivity for all users',
]

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4 mt-6">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base md:text-lg text-text-body leading-normal">
          <svg className="mt-[0.45em] h-2 w-2 shrink-0" viewBox="0 0 8 8" aria-hidden="true">
            <circle cx="4" cy="4" r="4" fill={CUNARD_GOLD} />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function AquitaniaBenefitsSection() {
  return (
    <div
      data-section="aquitania-benefits"
      className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_1fr] gap-x-16 gap-y-6"
    >
      <h3 className="text-lg md:text-2xl font-bold text-text-primary leading-snug">
        How does Aquitania benefit the business?
      </h3>
      <h3 className="text-lg md:text-2xl font-bold text-text-primary leading-snug">
        How does Aquitania benefit the users?
      </h3>
      <BenefitList items={BUSINESS_BENEFITS} />
      <BenefitList items={USER_BENEFITS} />
    </div>
  )
}

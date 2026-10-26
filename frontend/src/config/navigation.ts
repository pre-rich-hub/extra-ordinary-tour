type NavLink = {
  label: string
  href: string
  // Sub-pages shown in a compact dropdown and nested in the mobile menu.
  children?: readonly { label: string; href: string }[]
}

export const navLinks: readonly NavLink[] = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Tours', href: '/tours' },
  { label: 'Layover Tours', href: '/layover' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'About Ethiopia', href: '/about-ethiopia' },
    ],
  },
  { label: 'Travel Journal', href: '/blog' },
]

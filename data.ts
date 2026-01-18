import { TimelineEntry, Employee, Value } from './types';

export const VALUES: Value[] = [
  {
    id: '1',
    title: 'Radical Truth',
    description: 'We share the hard news first. Transparency is our default state, even when it is uncomfortable.',
    lastReferencedDate: '2023-11-15',
    icon: 'Eye',
  },
  {
    id: '2',
    title: 'Craftsmanship',
    description: 'We sign our work. Every pixel, every line of code, every email is a reflection of our care.',
    lastReferencedDate: '2024-03-10', // Recent
    icon: 'PenTool',
  },
  {
    id: '3',
    title: 'Customer Obsession',
    description: 'We don’t just listen to customers; we invent on their behalf.',
    lastReferencedDate: '2024-02-01',
    icon: 'Heart',
  },
  {
    id: '4',
    title: 'Move with Urgency',
    description: 'Speed matters in business. Many decisions and actions are reversible and do not need extensive study.',
    lastReferencedDate: '2023-08-20', // Drifting
    icon: 'Zap',
  }
];

export const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Eleanor Rigby',
    role: 'Co-Founder & CEO',
    photoUrl: 'https://picsum.photos/id/64/400/400',
    joinedDate: '2021-01-15',
    quote: "I wanted to build the company I wish I worked for.",
    bio: "Former design director at Studio 54. Believes in the power of written word and slow thinking.",
    tags: ['Founder', 'Design', 'Strategy'],
  },
  {
    id: '2',
    name: 'Jude Lawton',
    role: 'Head of Engineering',
    photoUrl: 'https://picsum.photos/id/91/400/400',
    joinedDate: '2021-02-01',
    quote: "Code is poetry that executes.",
    bio: "Spent 10 years in fintech before realizing money isn't everything. Now building systems that last.",
    tags: ['Engineering', 'Founding Team'],
  },
  {
    id: '3',
    name: 'Sarah Chen',
    role: 'Product Designer',
    photoUrl: 'https://picsum.photos/id/129/400/400',
    joinedDate: '2022-06-15',
    quote: "Simplicity is the ultimate sophistication.",
    bio: "Obsessed with typography and grid systems. Keeps the pixel police active.",
    tags: ['Design', 'Product'],
  },
  {
    id: '4',
    name: 'Marcus Aurelius',
    role: 'Customer Success',
    photoUrl: 'https://picsum.photos/id/203/400/400',
    joinedDate: '2023-01-10',
    quote: "Service is a noble path.",
    bio: "Ensures every user feels heard and supported. The voice of the customer inside the room.",
    tags: ['CX', 'Operations'],
  }
];

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: '10',
    date: '2024-03-15',
    title: 'Series A Funding Secured',
    body: "We are thrilled to announce our Series A led by Benchmark. This capital allows us to double down on our mission to preserve company memory. It wasn't an easy road—60 rejections before the 'Yes'. We stayed true to our vision of 'slow software'.",
    type: 'Funding',
    tags: ['Milestone', 'Finance'],
    author: 'Eleanor Rigby',
    visibility: 'Public',
    attachments: [
      { type: 'image', url: 'https://picsum.photos/id/20/800/400', title: 'Team Celebration' }
    ]
  },
  {
    id: '9',
    date: '2024-02-28',
    title: 'The "Papercut" Design System',
    body: "We launched our new design system today. We call it 'Papercut' because it emphasizes sharp edges, tactile layering, and a return to physical metaphors in UI. A huge effort by Sarah and the design team to move us away from generic SaaS aesthetics.",
    type: 'Milestone',
    tags: ['Design', 'Craftsmanship'],
    author: 'Sarah Chen',
    visibility: 'Public',
  },
  {
    id: '8',
    date: '2024-01-10',
    title: 'First Customer Churn',
    body: "Today we lost our first major account. It hurts. We optimized for features over stability, and they paid the price. We need to own this failure. We are instituting a 'Quality Week' every month starting now.",
    type: 'Culture',
    tags: ['Learning', 'Radical Truth'],
    author: 'Jude Lawton',
    visibility: 'Internal',
  },
  {
    id: '7',
    date: '2023-11-05',
    title: 'Office Move: The Library',
    body: "We've moved into our new HQ. We decided not to have an open floor plan. Instead, we built 'The Library'—a silent zone for deep work. Culture is space, and space dictates behavior.",
    type: 'Culture',
    tags: ['Office', 'Deep Work'],
    author: 'Eleanor Rigby',
    visibility: 'Public',
    attachments: [
      { type: 'image', url: 'https://picsum.photos/id/24/800/600', title: 'The Silent Room' }
    ]
  },
  {
    id: '6',
    date: '2023-06-20',
    title: 'Pivot to "Memory as a Service"',
    body: "We started as a simple employee handbook tool. We realized nobody reads handbooks. They read stories. We are pivoting the entire product to focus on the Timeline view as the primary interface.",
    type: 'Pivot',
    tags: ['Strategy', 'Product'],
    author: 'Eleanor Rigby',
    visibility: 'Public',
  },
  {
    id: '5',
    date: '2022-09-01',
    title: 'Hiring Marcus',
    body: "Marcus joins us to lead CX. We hired him not for his resume, but because he sent us a handwritten letter analyzing our onboarding flow. That's the level of care we want.",
    type: 'Hire',
    tags: ['Team', 'Growth'],
    author: 'Jude Lawton',
    visibility: 'Internal',
  },
  {
    id: '1',
    date: '2021-01-15',
    title: 'Inception',
    body: "Day 1. Two laptops, one coffee shop, and a belief that companies lose their soul as they scale because they forget who they were. We are building the antidote to corporate amnesia.",
    type: 'Founding',
    tags: ['Vision', 'Origin'],
    author: 'Eleanor Rigby',
    visibility: 'Public',
  }
];

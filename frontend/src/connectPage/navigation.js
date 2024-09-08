export const navigation = [
  { name: 'Explore connections', href: '/connect', current: false },
  { name: 'My connections', href: '/myconnection', current: false },
  {
    name: 'Connection requests',
    href: '/connectionreq',
    current: false,
    options: [
      { name: 'Received', href: '/reqr', current: false },
      { name: 'Sent', href: '/reqs', current: false }
    ]
  },
  { name: 'My Groups', href: '/groups', current: false },
  { name: 'Alumines', href: '/alm', current: false },
  { name: 'Students', href: '/std', current: false },
];

// Making sure we use icons that are available in Feather icon set
interface PlatformStyle {
  color: string;
  iconName: string;
}

export function platformColor(platform: string): PlatformStyle {
  switch (platform) {
    case 'CodePen':
      return { color: '#333333', iconName: 'code' }; // Using 'code' as Feather doesn't have codepen
    case 'CodeWars':
      return { color: '#8A1A50', iconName: 'code' };
    case 'Dev.to':
      return { color: '#333333', iconName: 'terminal' }; // Using 'terminal' as alternative
    case 'Github':
      return { color: '#1A1A1A', iconName: 'github' };
    case 'GitLab':
      return { color: '#EB4925', iconName: 'git-branch' }; // Using 'git-branch' as alternative
    case 'Hashnode':
      return { color: '#0330D1', iconName: 'hash' };
    case 'StackOverflow':
      return { color: '#EC7100', iconName: 'layers' }; // Using 'layers' as alternative
    case 'Twitch':
      return { color: '#EE3FC8', iconName: 'tv' }; // Using 'tv' as alternative
    case 'YouTube':
      return { color: '#EE3939', iconName: 'youtube' };
    case 'LinkedIn':
      return { color: '#2D68FF', iconName: 'linkedin' };
    case 'freeCodeCamp':
      return { color: '#302267', iconName: 'code' };
    case 'FrontendMentor':
      return { color: '#FFFFFF', iconName: 'layout' }; // Using 'layout' as alternative
    case 'Twitter':
      return { color: '#43B7E9', iconName: 'twitter' };
    case 'Facebook':
      return { color: '#2442AC', iconName: 'facebook' };
    default:
      return { color: 'transparent', iconName: 'link' };
  }
}

// A utility to handle platform options for the dropdown
export const platformOptions = [
  { value: 'Github', label: 'GitHub', icon: 'github' },
  { value: 'GitLab', label: 'GitLab', icon: 'git-branch' },
  { value: 'Hashnode', label: 'Hashnode', icon: 'hash' },
  { value: 'CodePen', label: 'CodePen', icon: 'code' },
  { value: 'CodeWars', label: 'CodeWars', icon: 'code' },
  { value: 'StackOverflow', label: 'Stack Overflow', icon: 'layers' },
  { value: 'Twitch', label: 'Twitch', icon: 'tv' },
  { value: 'YouTube', label: 'YouTube', icon: 'youtube' },
  { value: 'LinkedIn', label: 'LinkedIn', icon: 'linkedin' },
  { value: 'Dev.to', label: 'Dev.to', icon: 'terminal' },
  { value: 'freeCodeCamp', label: 'freeCodeCamp', icon: 'code' },
  { value: 'FrontendMentor', label: 'Frontend Mentor', icon: 'layout' },
  { value: 'Twitter', label: 'Twitter', icon: 'twitter' },
  { value: 'Facebook', label: 'Facebook', icon: 'facebook' }
];
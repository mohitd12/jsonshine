import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { faker } from '@faker-js/faker';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomJson() {
  return {
    astronaut: {
      id: faker.number.int({ min: 1000, max: 9999 }),
      name: faker.person.fullName(),
      codename: `${faker.word.adjective()}-${faker.word.noun()}`.toUpperCase(),
      mood: faker.helpers.arrayElement([
        'Excited',
        'Terrified',
        'Floating peacefully',
        'Currently regretting all life choices',
      ]),
      favouriteSnack: faker.helpers.arrayElement([
        'Cosmic Kulfi',
        'Zero-G Golgappa',
        'Anti-gravity Aloo Chips',
        'Interstellar Idli',
      ]),
    },

    mission: {
      objective: faker.helpers.arrayElement([
        'Scan mysterious cosmic anomaly',
        'Deliver WiFi to Pluto',
        'Teach aliens how to debug JavaScript',
        "Retrieve missing satellite named 'Chintu-1'",
      ]),
      launchDate: faker.date.future().toISOString(),
      backupPlan: faker.helpers.arrayElement([
        'Blame the DevOps team',
        'Pretend it was intentional',
        "Say it's a feature",
      ]),
    },

    tech: {
      toolsOnBoard: [
        'React 21 (unstable zero-gravity build)',
        'Node.js Nebula Edition',
        `Quantum CPU with ${faker.number.int({
          min: 4,
          max: 128,
        })} hyper-dimensional cores`,
        'AI assistant that judges your code silently',
      ],
      favouriteLanguage: faker.helpers.arrayElement([
        'JavaScript (because even the universe runs on it)',
        'TypeScript (for strict alien types)',
        'Rust (for fearless space explorers)',
      ]),
      randomCommitMessage: faker.git.commitMessage(),
    },
  };
}

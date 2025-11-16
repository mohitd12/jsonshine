import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AppState = {};

const makeStore = () =>
  create<AppState>()(
    devtools(
      persist(
        (set) => ({
          // ...write here
        }),
        {
          name: 'app-storage',
          partialize: (s) => ({
            // ...add props only to persist here
          }),
        }
      )
    )
  );

// export the store instance
export const useAppStore = makeStore();
